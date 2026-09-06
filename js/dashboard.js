/**
 * StudyMate - Dashboard Controller
 * Handles KPI stats, Chart.js visualizations, deadlines, timetable, and quick action modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

let studyHoursChart = null;
let subjectDistributionChart = null;

function initDashboard() {
  renderGreetingAndDate();
  renderKpiCards();
  renderDeadlinesWidget();
  renderTodayScheduleWidget();
  renderRecentNotesWidget();
  renderBadgesPreview();
  initDashboardCharts();
  setupQuickActionModals();
}

function renderGreetingAndDate() {
  const profile = ProfileService.getProfile();
  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  const greetingEl = document.getElementById('dash-greeting');
  if (greetingEl) {
    greetingEl.textContent = `${greeting}, ${profile.name ? profile.name.split(' ')[0] : 'Student'}! 👋`;
  }

  const dateEl = document.getElementById('dash-date');
  if (dateEl) {
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
  }

  const streakEl = document.getElementById('dash-streak-count');
  if (streakEl) {
    streakEl.textContent = `${profile.studyStreak || 1} Days`;
  }

  const hoursTodayEl = document.getElementById('dash-hours-today');
  if (hoursTodayEl) {
    hoursTodayEl.textContent = `${profile.todayStudyHours || 0} hrs`;
  }
}

function renderKpiCards() {
  const tasks = TasksService.getAll();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const profile = ProfileService.getProfile();
  const goals = GoalsService.getAll();
  const activeGoals = goals.filter(g => !g.completed).length;

  const gpaData = GpaService.getGpaRecords();
  const currentGpa = gpaData.semesters && gpaData.semesters.length > 0 ? gpaData.semesters[0].sgpa : 3.82;

  // Set card values
  const elTotalTasks = document.getElementById('kpi-total-tasks');
  const elCompleted = document.getElementById('kpi-completed-tasks');
  const elHours = document.getElementById('kpi-study-hours');
  const elGpa = document.getElementById('kpi-gpa');
  const elGoals = document.getElementById('kpi-goals');
  const elRate = document.getElementById('kpi-completion-rate');

  if (elTotalTasks) elTotalTasks.textContent = totalTasks;
  if (elCompleted) elCompleted.textContent = completedTasks;
  if (elHours) elHours.textContent = `${profile.totalStudyHours || 0}h`;
  if (elGpa) elGpa.textContent = currentGpa.toFixed(2);
  if (elGoals) elGoals.textContent = activeGoals;
  if (elRate) elRate.textContent = `${completionRate}% Done`;
}

function renderDeadlinesWidget() {
  const container = document.getElementById('dash-deadlines-container');
  if (!container) return;

  const tasks = TasksService.getAll();
  // Filter pending tasks, sorted by due date
  const pending = tasks.filter(t => !t.completed).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  if (pending.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        <i class="fas fa-calendar-check" style="font-size: 2rem; color: var(--success); margin-bottom: 0.5rem; display: block;"></i>
        <p style="font-weight: 600;">All caught up!</p>
        <span style="font-size: 0.8rem;">No pending assignments or tasks due soon.</span>
      </div>
    `;
    return;
  }

  let html = '<div class="deadline-list">';
  pending.slice(0, 4).forEach(t => {
    const overdue = TasksService.isOverdue(t);
    const priorityClass = t.priority === 'high' ? 'high' : (t.priority === 'medium' ? 'medium' : 'low');
    
    html += `
      <div class="deadline-item">
        <div class="deadline-check" onclick="toggleTaskFromDash('${t.id}')">
          <i class="far fa-circle"></i>
        </div>
        <div class="deadline-main">
          <div class="deadline-title">${t.title}</div>
          <div class="deadline-meta">
            <span><i class="fas fa-book-open"></i> ${t.subject}</span>
            <span><i class="far fa-clock"></i> ${t.dueDate} ${t.dueTime || ''}</span>
            ${overdue ? '<span class="overdue-badge"><i class="fas fa-exclamation-triangle"></i> Overdue</span>' : ''}
          </div>
        </div>
        <span class="priority-pill ${priorityClass}">${t.priority.toUpperCase()}</span>
      </div>
    `;
  });
  html += '</div>';

  container.innerHTML = html;
}

window.toggleTaskFromDash = function(id) {
  TasksService.toggleComplete(id);
  StudyMate.toast('Task marked as completed!', 'success');
  renderKpiCards();
  renderDeadlinesWidget();
  StudyMate.updateBadgesCount();
};

function renderTodayScheduleWidget() {
  const container = document.getElementById('dash-schedule-container');
  if (!container) return;

  const schedule = PlannerService.getAll();
  // Get today's day of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[new Date().getDay()];

  // Show sessions for current day, or upcoming sessions if today has none
  let sessions = schedule.filter(s => s.day === currentDay);
  if (sessions.length === 0) {
    sessions = schedule.slice(0, 3);
  }

  if (sessions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        <i class="fas fa-mug-hot" style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem; display: block;"></i>
        <p style="font-weight: 600;">No sessions scheduled for today</p>
        <a href="planner.html" class="btn btn-sm btn-outline" style="margin-top: 0.75rem;">Plan A Session</a>
      </div>
    `;
    return;
  }

  let html = '<div class="timeline-list">';
  sessions.forEach(s => {
    html += `
      <div class="timeline-item" style="border-left-color: ${s.isDone ? 'var(--success)' : 'var(--primary)'}; opacity: ${s.isDone ? '0.6' : '1'};">
        <div class="timeline-time">${s.startTime} - ${s.endTime}</div>
        <div class="timeline-details">
          <div class="timeline-subject">${s.subject}</div>
          <div class="timeline-activity">${s.activity}</div>
        </div>
        <button class="btn btn-sm ${s.isDone ? 'btn-success' : 'btn-secondary'}" onclick="toggleScheduleFromDash('${s.id}')" title="${s.isDone ? 'Mark Undone' : 'Mark Completed'}">
          <i class="fas ${s.isDone ? 'fa-check' : 'fa-circle'}"></i>
        </button>
      </div>
    `;
  });
  html += '</div>';

  container.innerHTML = html;
}

window.toggleScheduleFromDash = function(id) {
  PlannerService.toggleDone(id);
  StudyMate.toast('Schedule status updated!', 'info');
  renderTodayScheduleWidget();
  renderGreetingAndDate();
};

function renderRecentNotesWidget() {
  const container = document.getElementById('dash-recent-notes');
  if (!container) return;

  const notes = NotesService.getAll();
  if (notes.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.88rem; text-align: center; padding: 1rem;">No notes yet. Create your first note!</p>`;
    return;
  }

  let html = '';
  notes.slice(0, 2).forEach(n => {
    html += `
      <div class="recent-note-card" onclick="window.location.href='notes.html'">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-primary" style="font-size: 0.7rem;">${n.subject}</span>
          ${n.isPinned ? '<i class="fas fa-thumbtack text-primary" style="font-size: 0.75rem;"></i>' : ''}
        </div>
        <div class="recent-note-title">${n.title}</div>
        <div class="recent-note-snippet">${n.content.replace(/#|\*|`/g, '')}</div>
        <div class="recent-note-footer">
          <span><i class="far fa-calendar"></i> ${new Date(n.createdAt).toLocaleDateString()}</span>
          <span>View <i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderBadgesPreview() {
  const container = document.getElementById('dash-badges-container');
  if (!container) return;

  const badges = ProfileService.getBadges();
  let html = '';
  badges.slice(0, 5).forEach(b => {
    html += `
      <div class="badge-card ${b.unlocked ? '' : 'locked'}" title="${b.title}: ${b.desc}">
        <div class="badge-icon" style="color: ${b.color};">
          <i class="fas ${b.icon}"></i>
        </div>
        <div class="badge-title">${b.title}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function initDashboardCharts() {
  const chartCanvas = document.getElementById('studyHoursWeeklyChart');
  if (!chartCanvas || typeof Chart === 'undefined') return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

  const ctx = chartCanvas.getContext('2d');
  if (studyHoursChart) studyHoursChart.destroy();

  studyHoursChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Study Hours',
          data: [3.5, 4.2, 2.8, 5.0, 4.5, 6.0, 3.5],
          backgroundColor: '#4f46e5',
          borderRadius: 6,
          barThickness: 24
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b',
          titleFont: { size: 13, weight: 'bold' },
          bodyFont: { size: 12 },
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { weight: 600 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            stepSize: 2,
            callback: value => value + 'h'
          },
          beginAtZero: true
        }
      }
    }
  });

  // Doughnut Chart for Subject Breakdown
  const subjectCanvas = document.getElementById('subjectTimeChart');
  if (subjectCanvas) {
    const subCtx = subjectCanvas.getContext('2d');
    if (subjectDistributionChart) subjectDistributionChart.destroy();

    subjectDistributionChart = new Chart(subCtx, {
      type: 'doughnut',
      data: {
        labels: ['Operating Systems', 'DBMS', 'Algorithms', 'Networks', 'Machine Learning'],
        datasets: [{
          data: [32, 26, 22, 12, 8],
          backgroundColor: ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, boxWidth: 12, font: { size: 11, weight: 600 } }
          }
        }
      }
    });
  }
}

// Quick Actions Modal Form Handlers
function setupQuickActionModals() {
  // Add Task Modal
  const addTaskBtn = document.getElementById('qa-add-task');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => openDashAddTaskModal());
  }

  // Create Note Modal
  const addNoteBtn = document.getElementById('qa-add-note');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => openDashAddNoteModal());
  }

  // Add Session Modal
  const addSessionBtn = document.getElementById('qa-add-session');
  if (addSessionBtn) {
    addSessionBtn.addEventListener('click', () => openDashAddSessionModal());
  }
}

function openDashAddTaskModal() {
  let modal = document.getElementById('dash-add-task-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'dash-add-task-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-plus-circle text-primary"></i> Quick Add Task</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="dash-task-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Task Title *</label>
              <input type="text" class="form-control" id="dash-task-title" placeholder="e.g. Complete chapter 5 exercise" required>
            </div>
            <div class="form-group">
              <label class="form-label">Subject *</label>
              <input type="text" class="form-control" id="dash-task-subject" placeholder="e.g. Operating Systems" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select class="form-select" id="dash-task-priority">
                  <option value="high">High</option>
                  <option value="medium" selected>Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Due Date *</label>
                <input type="date" class="form-control" id="dash-task-date" required>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('dash-task-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('dash-task-title').value.trim();
      const subject = document.getElementById('dash-task-subject').value.trim();
      const priority = document.getElementById('dash-task-priority').value;
      const dueDate = document.getElementById('dash-task-date').value;

      if (!title || !subject || !dueDate) return;

      TasksService.create({
        title,
        subject,
        priority,
        dueDate,
        dueTime: "23:59",
        category: "Assignment"
      });

      modal.classList.remove('active');
      form.reset();
      StudyMate.toast('Task added successfully!', 'success');
      renderKpiCards();
      renderDeadlinesWidget();
      StudyMate.updateBadgesCount();
    });
  }

  // Set default tomorrow date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('dash-task-date');
  if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];

  modal.classList.add('active');
}

function openDashAddNoteModal() {
  window.location.href = "notes.html?action=new";
}

function openDashAddSessionModal() {
  window.location.href = "planner.html?action=new";
}
