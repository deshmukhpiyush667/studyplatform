/**
 * StudyMate - Study Goals Module Controller
 * Short-term and long-term goal tracking, milestones checklist, progress calculation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGoalsModule();
});

let currentGoalTab = 'all'; // all, short-term, long-term, completed

function initGoalsModule() {
  setupGoalControls();
  setupAddGoalModal();
  renderGoalsSummary();
  renderGoals();

  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'new') {
    openGoalModal();
  }
}

function setupGoalControls() {
  const tabs = document.querySelectorAll('.goal-tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      currentGoalTab = btn.dataset.tab;
      renderGoals();
    });
  });

  const addBtn = document.getElementById('create-goal-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openGoalModal());
  }
}

function renderGoalsSummary() {
  const goals = GoalsService.getAll();
  const total = goals.length;
  const completed = goals.filter(g => g.completed).length;
  const active = total - completed;

  let totalProg = 0;
  goals.forEach(g => totalProg += (g.progress || 0));
  const avgProgress = total > 0 ? Math.round(totalProg / total) : 0;

  const totalEl = document.getElementById('goal-stat-total');
  const activeEl = document.getElementById('goal-stat-active');
  const completedEl = document.getElementById('goal-stat-completed');
  const avgEl = document.getElementById('goal-stat-avg');

  if (totalEl) totalEl.textContent = total;
  if (activeEl) activeEl.textContent = active;
  if (completedEl) completedEl.textContent = completed;
  if (avgEl) avgEl.textContent = `${avgProgress}%`;
}

function getFilteredGoals() {
  let list = GoalsService.getAll();

  if (currentGoalTab === 'short-term') {
    list = list.filter(g => g.type === 'short-term');
  } else if (currentGoalTab === 'long-term') {
    list = list.filter(g => g.type === 'long-term' || g.type === 'medium-term');
  } else if (currentGoalTab === 'completed') {
    list = list.filter(g => g.completed);
  }

  return list;
}

function renderGoals() {
  const container = document.getElementById('goals-grid');
  if (!container) return;

  const goals = getFilteredGoals();
  renderGoalsSummary();

  if (goals.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fas fa-bullseye"></i></div>
        <h4 class="empty-state-title">No goals found</h4>
        <p class="empty-state-desc">Set ambitious academic targets, break them into milestones, and track your progress.</p>
        <button class="btn btn-primary" onclick="openGoalModal()"><i class="fas fa-plus"></i> Create New Goal</button>
      </div>
    `;
    return;
  }

  let html = '';
  goals.forEach(g => {
    const isOver = new Date(g.targetDate) < new Date() && !g.completed;
    const milestones = g.milestones || [];
    const doneCount = milestones.filter(m => m.done).length;

    let milestonesHtml = '<div class="goal-milestones">';
    milestones.forEach((m, idx) => {
      milestonesHtml += `
        <label class="goal-milestone-item ${m.done ? 'done' : ''}" onclick="toggleGoalMilestone('${g.id}', ${idx});">
          <input type="checkbox" ${m.done ? 'checked' : ''} style="cursor: pointer;">
          <span>${escapeHtml(m.text)}</span>
        </label>
      `;
    });
    milestonesHtml += '</div>';

    html += `
      <div class="goal-card" style="${g.completed ? 'border-color: var(--success);' : ''}">
        <div class="goal-header">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
              <span class="badge badge-primary">${g.subject}</span>
              <span class="badge badge-secondary">${g.type.toUpperCase()}</span>
              ${g.completed ? '<span class="badge badge-success"><i class="fas fa-check"></i> Completed</span>' : ''}
            </div>
            <h3 class="goal-title">${escapeHtml(g.title)}</h3>
          </div>
          <div style="display: flex; gap: 0.35rem;">
            <button class="icon-btn" style="width: 32px; height: 32px; color: var(--danger);" onclick="deleteGoal('${g.id}')" title="Delete Goal">
              <i class="fas fa-trash-alt" style="font-size: 0.8rem;"></i>
            </button>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem;">
            <span>Progress (${doneCount}/${milestones.length} milestones)</span>
            <span style="color: ${g.completed ? 'var(--success)' : 'var(--primary)'}; font-size: 0.95rem;">${g.progress}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${g.completed ? 'success' : ''}" style="width: ${g.progress}%;"></div>
          </div>
        </div>

        ${milestones.length > 0 ? milestonesHtml : ''}

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.8rem;">
          <span style="color: ${isOver ? 'var(--danger)' : 'var(--text-muted)'}; font-weight: 600;">
            <i class="far fa-calendar-alt"></i> Target: ${g.targetDate}
          </span>
          <button class="btn btn-sm ${g.completed ? 'btn-secondary' : 'btn-success'}" onclick="quickCompleteGoal('${g.id}')">
            <i class="fas ${g.completed ? 'fa-undo' : 'fa-check'}"></i> ${g.completed ? 'Reopen' : 'Mark 100%'}
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.toggleGoalMilestone = function(goalId, index) {
  GoalsService.toggleMilestone(goalId, index);
  renderGoals();
};

window.quickCompleteGoal = function(goalId) {
  const goal = GoalsService.getAll().find(g => g.id === goalId);
  if (!goal) return;

  const nextState = !goal.completed;
  const milestones = (goal.milestones || []).map(m => ({ ...m, done: nextState }));
  GoalsService.update(goalId, {
    completed: nextState,
    progress: nextState ? 100 : 0,
    milestones
  });

  ProfileService.evaluateBadges();
  StudyMate.toast(nextState ? 'Goal marked as 100% Completed! 🏆' : 'Goal reopened', 'success');
  renderGoals();
};

window.deleteGoal = function(id) {
  StudyMate.confirm({
    title: "Delete Goal",
    message: "Are you sure you want to remove this study goal and its milestones?",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: () => {
      GoalsService.delete(id);
      renderGoals();
      StudyMate.toast("Goal deleted", "success");
    }
  });
};

function setupAddGoalModal() {
  let modal = document.getElementById('goal-add-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'goal-add-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-bullseye text-primary"></i> Create Study Goal</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="goal-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Goal Title *</label>
              <input type="text" class="form-control" id="form-goal-title" placeholder="e.g. Master Dynamic Programming & Trees" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Subject / Area *</label>
                <input type="text" class="form-control" id="form-goal-subject" placeholder="e.g. Algorithms" required>
              </div>
              <div class="form-group">
                <label class="form-label">Goal Duration</label>
                <select class="form-select" id="form-goal-type">
                  <option value="short-term">Short-term (1-4 Weeks)</option>
                  <option value="medium-term">Medium-term (1-3 Months)</option>
                  <option value="long-term">Long-term (Semester / Year)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Target Completion Date *</label>
              <input type="date" class="form-control" id="form-goal-date" required>
            </div>
            <div class="form-group">
              <label class="form-label">Key Milestones (Enter one milestone per line)</label>
              <textarea class="form-control" id="form-goal-milestones" placeholder="1. Read lecture notes&#10;2. Solve 10 practice problems&#10;3. Take revision quiz" rows="4"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Goal</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('goal-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('form-goal-title').value.trim();
      const subject = document.getElementById('form-goal-subject').value.trim();
      const type = document.getElementById('form-goal-type').value;
      const targetDate = document.getElementById('form-goal-date').value;
      const rawMilestones = document.getElementById('form-goal-milestones').value;

      const milestones = rawMilestones
        .split('\n')
        .map(line => line.replace(/^[0-9]+[.)]\s*/, '').trim())
        .filter(Boolean)
        .map(text => ({ text, done: false }));

      GoalsService.create({
        title,
        subject,
        type,
        targetDate,
        milestones,
        progress: 0,
        completed: false
      });

      StudyMate.toast('New study goal created!', 'success');
      modal.classList.remove('active');
      form.reset();
      renderGoals();
    });
  }
}

window.openGoalModal = function() {
  setupAddGoalModal();
  const modal = document.getElementById('goal-add-modal');
  const targetDateInput = document.getElementById('form-goal-date');
  if (targetDateInput) {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    targetDateInput.value = d.toISOString().split('T')[0];
  }
  modal.classList.add('active');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
