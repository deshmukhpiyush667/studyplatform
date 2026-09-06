/**
 * StudyMate - Tasks & Assignments Module Controller
 * Full task management: Add, edit, delete, complete, search, filter, sort, overdue detection.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTasksModule();
});

let currentTaskStatusTab = 'all'; // all, pending, completed, overdue
let currentTaskPriority = 'all';
let currentTaskSubject = 'all';
let currentTaskCategory = 'all';
let currentTaskSearch = '';
let currentTaskSort = 'dueDateAsc';

function initTasksModule() {
  setupTaskFilters();
  setupTaskModal();
  renderSubjectFilter();
  renderCategoryFilter();
  renderTaskStats();
  renderTasks();

  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'new') {
    openTaskModal();
  }
}

function renderSubjectFilter() {
  const select = document.getElementById('task-subject-filter');
  if (!select) return;

  const tasks = TasksService.getAll();
  const subjects = Array.from(new Set(tasks.map(t => t.subject))).filter(Boolean);

  let html = '<option value="all">All Subjects</option>';
  subjects.forEach(s => {
    html += `<option value="${s}">${s}</option>`;
  });
  select.innerHTML = html;
}

function renderCategoryFilter() {
  const select = document.getElementById('task-category-filter');
  if (!select) return;

  const categories = ["Assignment", "Lab Report", "Project", "Practice", "Reading", "Study", "Exam Prep"];
  let html = '<option value="all">All Categories</option>';
  categories.forEach(c => {
    html += `<option value="${c}">${c}</option>`;
  });
  select.innerHTML = html;
}

function setupTaskFilters() {
  const searchInput = document.getElementById('task-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentTaskSearch = e.target.value.toLowerCase().trim();
      renderTasks();
    });
  }

  const statusTabs = document.querySelectorAll('.task-tab-btn');
  statusTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      statusTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTaskStatusTab = btn.dataset.status;
      renderTasks();
    });
  });

  const prioritySelect = document.getElementById('task-priority-filter');
  if (prioritySelect) {
    prioritySelect.addEventListener('change', (e) => {
      currentTaskPriority = e.target.value;
      renderTasks();
    });
  }

  const subjectSelect = document.getElementById('task-subject-filter');
  if (subjectSelect) {
    subjectSelect.addEventListener('change', (e) => {
      currentTaskSubject = e.target.value;
      renderTasks();
    });
  }

  const catSelect = document.getElementById('task-category-filter');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      currentTaskCategory = e.target.value;
      renderTasks();
    });
  }

  const sortSelect = document.getElementById('task-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentTaskSort = e.target.value;
      renderTasks();
    });
  }

  const createBtn = document.getElementById('create-task-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => openTaskModal());
  }
}

function renderTaskStats() {
  const tasks = TasksService.getAll();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(t => TasksService.isOverdue(t)).length;

  const totalEl = document.getElementById('task-metric-total');
  const pendingEl = document.getElementById('task-metric-pending');
  const completedEl = document.getElementById('task-metric-completed');
  const overdueEl = document.getElementById('task-metric-overdue');

  if (totalEl) totalEl.textContent = total;
  if (pendingEl) pendingEl.textContent = pending;
  if (completedEl) completedEl.textContent = completed;
  if (overdueEl) overdueEl.textContent = overdue;
}

function getFilteredTasks() {
  let list = TasksService.getAll();

  // Status Filter
  if (currentTaskStatusTab === 'pending') {
    list = list.filter(t => !t.completed);
  } else if (currentTaskStatusTab === 'completed') {
    list = list.filter(t => t.completed);
  } else if (currentTaskStatusTab === 'overdue') {
    list = list.filter(t => TasksService.isOverdue(t));
  }

  // Priority Filter
  if (currentTaskPriority !== 'all') {
    list = list.filter(t => t.priority === currentTaskPriority);
  }

  // Subject Filter
  if (currentTaskSubject !== 'all') {
    list = list.filter(t => t.subject === currentTaskSubject);
  }

  // Category Filter
  if (currentTaskCategory !== 'all') {
    list = list.filter(t => t.category === currentTaskCategory);
  }

  // Search Query
  if (currentTaskSearch) {
    list = list.filter(t => 
      t.title.toLowerCase().includes(currentTaskSearch) ||
      t.subject.toLowerCase().includes(currentTaskSearch) ||
      (t.description && t.description.toLowerCase().includes(currentTaskSearch))
    );
  }

  // Sorting
  const priorityWeight = { high: 3, medium: 2, low: 1 };
  if (currentTaskSort === 'dueDateAsc') {
    list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (currentTaskSort === 'dueDateDesc') {
    list.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  } else if (currentTaskSort === 'priorityDesc') {
    list.sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));
  } else if (currentTaskSort === 'titleAsc') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  return list;
}

function renderTasks() {
  const container = document.getElementById('tasks-list');
  if (!container) return;

  const tasks = getFilteredTasks();
  renderTaskStats();

  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" style="background-color: var(--primary-light); color: var(--primary);">
          <i class="fas fa-clipboard-check"></i>
        </div>
        <h4 class="empty-state-title">No tasks found</h4>
        <p class="empty-state-desc">Try clearing your filters or create a new task to stay ahead of your deadlines.</p>
        <button class="btn btn-primary" onclick="openTaskModal()"><i class="fas fa-plus"></i> Add New Task</button>
      </div>
    `;
    return;
  }

  let html = '';
  tasks.forEach(t => {
    const overdue = TasksService.isOverdue(t);
    const priorityClass = t.priority === 'high' ? 'high' : (t.priority === 'medium' ? 'medium' : 'low');

    html += `
      <div class="task-item-card ${t.completed ? 'completed' : ''}">
        <div class="task-checkbox ${t.completed ? 'checked' : ''}" onclick="toggleTaskStatus('${t.id}')">
          ${t.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <div class="task-content-main">
          <div class="task-text">${escapeHtml(t.title)}</div>
          <div class="task-meta-row">
            <span class="badge badge-primary" style="font-size: 0.72rem;">${t.subject}</span>
            <span class="badge badge-secondary" style="font-size: 0.72rem;">${t.category || 'Assignment'}</span>
            <span><i class="far fa-calendar"></i> ${t.dueDate || 'No Date'} ${t.dueTime ? 'at ' + t.dueTime : ''}</span>
            ${overdue ? '<span class="overdue-badge"><i class="fas fa-exclamation-circle"></i> Overdue</span>' : ''}
          </div>
          ${t.description ? `<p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">${escapeHtml(t.description)}</p>` : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="priority-pill ${priorityClass}">${t.priority.toUpperCase()}</span>
          <button class="icon-btn" style="width: 32px; height: 32px;" onclick="openTaskModal('${t.id}')" title="Edit Task">
            <i class="fas fa-edit" style="font-size: 0.82rem;"></i>
          </button>
          <button class="icon-btn" style="width: 32px; height: 32px; color: var(--danger);" onclick="deleteTask('${t.id}')" title="Delete Task">
            <i class="fas fa-trash-alt" style="font-size: 0.82rem;"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.toggleTaskStatus = function(id) {
  const updated = TasksService.toggleComplete(id);
  StudyMate.toast(updated.completed ? 'Task completed! Great job 🎉' : 'Task marked as pending', 'success');
  renderTasks();
  StudyMate.updateBadgesCount();
};

window.deleteTask = function(id) {
  StudyMate.confirm({
    title: "Delete Task",
    message: "Are you sure you want to delete this task? This action cannot be undone.",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: () => {
      TasksService.delete(id);
      renderTasks();
      renderSubjectFilter();
      StudyMate.updateBadgesCount();
      StudyMate.toast("Task deleted successfully", "success");
    }
  });
};

function setupTaskModal() {
  let modal = document.getElementById('task-edit-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'task-edit-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title" id="task-modal-title"><i class="fas fa-tasks text-primary"></i> Add Task</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="task-form">
          <input type="hidden" id="task-edit-id">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Task Title *</label>
              <input type="text" class="form-control" id="form-task-title" placeholder="e.g. Implement Binary Search Tree in Java" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" class="form-control" id="form-task-subject" placeholder="e.g. Data Structures" required>
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-select" id="form-task-category">
                  <option value="Assignment">Assignment</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Project">Project</option>
                  <option value="Practice">Practice</option>
                  <option value="Reading">Reading</option>
                  <option value="Study">Study</option>
                  <option value="Exam Prep">Exam Prep</option>
                </select>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select class="form-select" id="form-task-priority">
                  <option value="high">High</option>
                  <option value="medium" selected>Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Due Date *</label>
                <input type="date" class="form-control" id="form-task-date" required>
              </div>
              <div class="form-group">
                <label class="form-label">Due Time</label>
                <input type="time" class="form-control" id="form-task-time" value="23:59">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description / Instructions</label>
              <textarea class="form-control" id="form-task-desc" placeholder="Add assignment details, submission link, chapter references..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary" id="task-save-btn">Save Task</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('task-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('task-edit-id').value;
      const title = document.getElementById('form-task-title').value.trim();
      const subject = document.getElementById('form-task-subject').value.trim();
      const category = document.getElementById('form-task-category').value;
      const priority = document.getElementById('form-task-priority').value;
      const dueDate = document.getElementById('form-task-date').value;
      const dueTime = document.getElementById('form-task-time').value;
      const description = document.getElementById('form-task-desc').value.trim();

      if (id) {
        TasksService.update(id, { title, subject, category, priority, dueDate, dueTime, description });
        StudyMate.toast('Task updated successfully!', 'success');
      } else {
        TasksService.create({ title, subject, category, priority, dueDate, dueTime, description });
        StudyMate.toast('Task created successfully!', 'success');
      }

      modal.classList.remove('active');
      renderSubjectFilter();
      renderTasks();
      StudyMate.updateBadgesCount();
    });
  }
}

window.openTaskModal = function(id = null) {
  setupTaskModal();
  const modal = document.getElementById('task-edit-modal');
  const form = document.getElementById('task-form');
  const titleEl = document.getElementById('task-modal-title');
  const idInput = document.getElementById('task-edit-id');

  form.reset();

  if (id) {
    const task = TasksService.getById(id);
    if (!task) return;
    titleEl.innerHTML = '<i class="fas fa-edit text-primary"></i> Edit Task';
    idInput.value = task.id;
    document.getElementById('form-task-title').value = task.title;
    document.getElementById('form-task-subject').value = task.subject;
    document.getElementById('form-task-category').value = task.category || 'Assignment';
    document.getElementById('form-task-priority').value = task.priority || 'medium';
    document.getElementById('form-task-date').value = task.dueDate || '';
    document.getElementById('form-task-time').value = task.dueTime || '23:59';
    document.getElementById('form-task-desc').value = task.description || '';
  } else {
    titleEl.innerHTML = '<i class="fas fa-plus-circle text-primary"></i> Add New Task';
    idInput.value = '';
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('form-task-date').value = tomorrow.toISOString().split('T')[0];
  }

  modal.classList.add('active');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
