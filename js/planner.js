/**
 * StudyMate - Study Planner & Timetable Controller
 * Daily & Weekly study schedule, add/edit sessions, priority tags, completion tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPlannerModule();
});

let currentPlannerView = 'weekly'; // 'weekly' or 'daily'
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let selectedDay = 'Monday';

function initPlannerModule() {
  // Set selectedDay to current actual day
  const jsDay = new Date().getDay(); // 0 is Sunday
  selectedDay = jsDay === 0 ? 'Sunday' : DAYS_OF_WEEK[jsDay - 1];

  setupPlannerControls();
  setupPlannerModal();
  renderTimetable();

  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'new') {
    openPlannerModal();
  }
}

function setupPlannerControls() {
  const viewWeeklyBtn = document.getElementById('view-weekly-btn');
  const viewDailyBtn = document.getElementById('view-daily-btn');

  if (viewWeeklyBtn && viewDailyBtn) {
    viewWeeklyBtn.addEventListener('click', () => {
      viewWeeklyBtn.classList.add('active');
      viewDailyBtn.classList.remove('active');
      currentPlannerView = 'weekly';
      renderTimetable();
    });

    viewDailyBtn.addEventListener('click', () => {
      viewDailyBtn.classList.add('active');
      viewWeeklyBtn.classList.remove('active');
      currentPlannerView = 'daily';
      renderTimetable();
    });
  }

  const addBtn = document.getElementById('add-session-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openPlannerModal());
  }
}

function renderTimetable() {
  const container = document.getElementById('planner-timetable-container');
  if (!container) return;

  const allSessions = PlannerService.getAll();

  if (currentPlannerView === 'weekly') {
    renderWeeklyView(container, allSessions);
  } else {
    renderDailyView(container, allSessions);
  }
}

function renderWeeklyView(container, allSessions) {
  let html = '<div class="timetable-grid">';

  DAYS_OF_WEEK.forEach(day => {
    const daySessions = allSessions
      .filter(s => s.day === day)
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

    const isToday = selectedDay === day;

    html += `
      <div class="timetable-col ${isToday ? 'today' : ''}">
        <div class="timetable-col-header">
          <div class="col-day-name">${day} ${isToday ? '<span class="badge badge-primary" style="font-size:0.65rem;">Today</span>' : ''}</div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${daySessions.length} session${daySessions.length === 1 ? '' : 's'}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; flex: 1;">
    `;

    if (daySessions.length === 0) {
      html += `
        <div style="padding: 1.5rem 0.5rem; text-align: center; color: var(--text-subtle); font-size: 0.8rem;">
          No sessions
          <button class="btn btn-sm btn-outline" style="margin-top: 0.5rem; width: 100%; font-size: 0.75rem;" onclick="openPlannerModal(null, '${day}')">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      `;
    } else {
      daySessions.forEach(s => {
        const priorityColor = s.priority === 'high' ? 'var(--danger)' : (s.priority === 'medium' ? 'var(--warning)' : 'var(--success)');
        
        html += `
          <div class="timetable-session-card ${s.isDone ? 'done' : ''}" style="border-left-color: ${s.isDone ? 'var(--success)' : priorityColor};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary);">${s.startTime} - ${s.endTime}</span>
              <div style="display: flex; gap: 0.25rem;">
                <button class="note-action-icon ${s.isDone ? 'text-success' : ''}" onclick="toggleSessionDone('${s.id}')" title="${s.isDone ? 'Mark Undone' : 'Complete Session'}">
                  <i class="fas ${s.isDone ? 'fa-check-circle' : 'fa-circle'}"></i>
                </button>
                <button class="note-action-icon" onclick="openPlannerModal('${s.id}')" title="Edit Session">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="note-action-icon text-danger" onclick="deleteSession('${s.id}')" title="Delete Session">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-main);">${escapeHtml(s.subject)}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.3;">${escapeHtml(s.activity)}</div>
            <div style="margin-top: 0.25rem;">
              <span class="priority-pill ${s.priority || 'medium'}" style="font-size: 0.68rem; padding: 0.1rem 0.45rem;">${(s.priority || 'medium').toUpperCase()}</span>
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
        <button class="btn btn-sm btn-secondary btn-block" style="margin-top: 0.5rem; font-size: 0.78rem;" onclick="openPlannerModal(null, '${day}')">
          <i class="fas fa-plus"></i> Add
        </button>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

function renderDailyView(container, allSessions) {
  let navPills = '<div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.25rem;">';
  DAYS_OF_WEEK.forEach(day => {
    navPills += `
      <button class="btn ${selectedDay === day ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="selectPlannerDay('${day}')">
        ${day}
      </button>
    `;
  });
  navPills += '</div>';

  const daySessions = allSessions
    .filter(s => s.day === selectedDay)
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  let listHtml = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
  if (daySessions.length === 0) {
    listHtml += `
      <div class="empty-state">
        <div class="empty-state-icon"><i class="fas fa-calendar-plus"></i></div>
        <h4 class="empty-state-title">No sessions for ${selectedDay}</h4>
        <p class="empty-state-desc">Schedule your study topics, revision blocks, and practice sessions to stay on track.</p>
        <button class="btn btn-primary" onclick="openPlannerModal(null, '${selectedDay}')"><i class="fas fa-plus"></i> Add Session for ${selectedDay}</button>
      </div>
    `;
  } else {
    daySessions.forEach(s => {
      listHtml += `
        <div class="card" style="padding: 1.25rem; border-left: 5px solid ${s.isDone ? 'var(--success)' : 'var(--primary)'}; opacity: ${s.isDone ? '0.7' : '1'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div>
              <span class="badge badge-primary">${s.startTime} - ${s.endTime}</span>
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 0.4rem;">${escapeHtml(s.subject)}</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">${escapeHtml(s.activity)}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="priority-pill ${s.priority || 'medium'}">${(s.priority || 'medium').toUpperCase()}</span>
              <button class="btn btn-sm ${s.isDone ? 'btn-success' : 'btn-outline'}" onclick="toggleSessionDone('${s.id}')">
                <i class="fas ${s.isDone ? 'fa-check' : 'fa-circle'}"></i> ${s.isDone ? 'Completed' : 'Mark Done'}
              </button>
              <button class="icon-btn" onclick="openPlannerModal('${s.id}')" title="Edit"><i class="fas fa-edit"></i></button>
              <button class="icon-btn text-danger" onclick="deleteSession('${s.id}')" title="Delete"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      `;
    });
  }
  listHtml += '</div>';

  container.innerHTML = navPills + listHtml;
}

window.selectPlannerDay = function(day) {
  selectedDay = day;
  renderTimetable();
};

window.toggleSessionDone = function(id) {
  const session = PlannerService.toggleDone(id);
  StudyMate.toast(session.isDone ? 'Study session completed! Logged 1 hour.' : 'Session marked as pending', 'success');
  renderTimetable();
};

window.deleteSession = function(id) {
  StudyMate.confirm({
    title: "Delete Study Session",
    message: "Are you sure you want to remove this scheduled session from your timetable?",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: () => {
      PlannerService.delete(id);
      renderTimetable();
      StudyMate.toast("Session deleted", "success");
    }
  });
};

function setupPlannerModal() {
  let modal = document.getElementById('planner-edit-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'planner-edit-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title" id="planner-modal-title"><i class="fas fa-calendar-alt text-primary"></i> Schedule Study Session</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="planner-form">
          <input type="hidden" id="planner-edit-id">
          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Day of the Week *</label>
                <select class="form-select" id="form-plan-day" required>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select class="form-select" id="form-plan-priority">
                  <option value="high">High</option>
                  <option value="medium" selected>Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Subject *</label>
              <input type="text" class="form-control" id="form-plan-subject" placeholder="e.g. Operating Systems" required>
            </div>
            <div class="form-group">
              <label class="form-label">Topic / Planned Activity *</label>
              <input type="text" class="form-control" id="form-plan-activity" placeholder="e.g. Deadlocks & Banker's Algorithm" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Start Time *</label>
                <input type="time" class="form-control" id="form-plan-start" value="10:00" required>
              </div>
              <div class="form-group">
                <label class="form-label">End Time *</label>
                <input type="time" class="form-control" id="form-plan-end" value="11:30" required>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Session</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('planner-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('planner-edit-id').value;
      const day = document.getElementById('form-plan-day').value;
      const priority = document.getElementById('form-plan-priority').value;
      const subject = document.getElementById('form-plan-subject').value.trim();
      const activity = document.getElementById('form-plan-activity').value.trim();
      const startTime = document.getElementById('form-plan-start').value;
      const endTime = document.getElementById('form-plan-end').value;

      if (id) {
        PlannerService.update(id, { day, priority, subject, activity, startTime, endTime });
        StudyMate.toast('Schedule session updated!', 'success');
      } else {
        PlannerService.create({ day, priority, subject, activity, startTime, endTime });
        StudyMate.toast('New study session scheduled!', 'success');
      }

      modal.classList.remove('active');
      renderTimetable();
    });
  }
}

window.openPlannerModal = function(id = null, defaultDay = null) {
  setupPlannerModal();
  const modal = document.getElementById('planner-edit-modal');
  const form = document.getElementById('planner-form');
  const titleEl = document.getElementById('planner-modal-title');
  const idInput = document.getElementById('planner-edit-id');

  form.reset();

  if (id) {
    const session = PlannerService.getAll().find(s => s.id === id);
    if (!session) return;
    titleEl.innerHTML = '<i class="fas fa-edit text-primary"></i> Edit Study Session';
    idInput.value = session.id;
    document.getElementById('form-plan-day').value = session.day;
    document.getElementById('form-plan-priority').value = session.priority || 'medium';
    document.getElementById('form-plan-subject').value = session.subject;
    document.getElementById('form-plan-activity').value = session.activity;
    document.getElementById('form-plan-start').value = session.startTime;
    document.getElementById('form-plan-end').value = session.endTime;
  } else {
    titleEl.innerHTML = '<i class="fas fa-calendar-plus text-primary"></i> Schedule Study Session';
    idInput.value = '';
    if (defaultDay) {
      document.getElementById('form-plan-day').value = defaultDay;
    } else {
      document.getElementById('form-plan-day').value = selectedDay;
    }
  }

  modal.classList.add('active');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
