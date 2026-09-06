/**
 * StudyMate - Core Application Shell Controller
 * Global UI initialization, navigation, themes, toasts, modals, global search.
 */

const StudyMate = {
  // Toast Notification System
  toast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error' || type === 'danger') iconClass = 'fa-exclamation-circle';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fas ${iconClass} toast-icon"></i>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  },

  // Modal Confirmation Helper
  confirm(options = {}) {
    const {
      title = "Confirm Action",
      message = "Are you sure you want to proceed?",
      confirmText = "Confirm",
      cancelText = "Cancel",
      isDanger = false,
      onConfirm = () => {}
    } = options;

    let overlay = document.getElementById('global-confirm-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'global-confirm-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title" id="confirm-modal-title"><i class="fas fa-question-circle text-primary"></i> Confirm</h3>
            <button class="modal-close" id="confirm-modal-close"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body" id="confirm-modal-body"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="confirm-modal-cancel">Cancel</button>
            <button class="btn" id="confirm-modal-action">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    const titleEl = document.getElementById('confirm-modal-title');
    const bodyEl = document.getElementById('confirm-modal-body');
    const actionBtn = document.getElementById('confirm-modal-action');
    const cancelBtn = document.getElementById('confirm-modal-cancel');
    const closeBtn = document.getElementById('confirm-modal-close');

    titleEl.innerHTML = `<i class="fas ${isDanger ? 'fa-triangle-exclamation text-danger' : 'fa-question-circle text-primary'}"></i> ${title}`;
    bodyEl.innerHTML = `<p style="font-size: 0.95rem; color: var(--text-muted);">${message}</p>`;
    
    actionBtn.textContent = confirmText;
    actionBtn.className = isDanger ? "btn btn-danger" : "btn btn-primary";

    const hide = () => overlay.classList.remove('active');

    actionBtn.onclick = () => {
      hide();
      onConfirm();
    };
    cancelBtn.onclick = hide;
    closeBtn.onclick = hide;
    overlay.onclick = (e) => { if (e.target === overlay) hide(); };

    overlay.classList.add('active');
  },

  // Initialize Global UI Components
  init() {
    this.initTheme();
    this.initSidebar();
    this.initGlobalSearch();
    this.initNotificationsDropdown();
    this.updateUserUI();
    this.updateBadgesCount();
  },

  // Theme Management
  initTheme() {
    const savedTheme = ThemeService.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      this.updateThemeIcon(btn, savedTheme);
      btn.addEventListener('click', () => {
        const current = ThemeService.getTheme();
        const nextTheme = current === 'dark' ? 'light' : 'dark';
        ThemeService.setTheme(nextTheme);
        this.updateThemeIcon(btn, nextTheme);
        StudyMate.toast(`Switched to ${nextTheme} mode`, 'info', 2000);
      });
    });
  },

  updateThemeIcon(btn, theme) {
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    btn.title = `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
  },

  // Sidebar & Mobile Navigation
  initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (sidebar && mobileBtn) {
      let backdrop = document.querySelector('.sidebar-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);
      }

      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        backdrop.classList.toggle('active');
      });

      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      });
    }

    // Highlight active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // Update Dynamic User Avatar and Name
  updateUserUI() {
    const profile = ProfileService.getProfile();
    const nameEls = document.querySelectorAll('.user-name-display');
    const avatarEls = document.querySelectorAll('.user-avatar-display');
    const courseEls = document.querySelectorAll('.user-course-display');

    nameEls.forEach(el => el.textContent = profile.name || 'Alex Johnson');
    avatarEls.forEach(el => el.textContent = profile.avatar || 'AJ');
    courseEls.forEach(el => el.textContent = profile.course || 'B.Tech CSE');
  },

  // Nav badges count update
  updateBadgesCount() {
    const tasks = TasksService.getAll();
    const pendingTasks = tasks.filter(t => !t.completed).length;
    const taskBadge = document.getElementById('nav-task-badge');
    if (taskBadge) {
      taskBadge.textContent = pendingTasks;
      taskBadge.style.display = pendingTasks > 0 ? 'inline-block' : 'none';
    }

    const notes = NotesService.getAll();
    const noteBadge = document.getElementById('nav-note-badge');
    if (noteBadge) {
      noteBadge.textContent = notes.length;
    }
  },

  // Notification Bell Popover
  initNotificationsDropdown() {
    const notifBtn = document.getElementById('notifications-btn');
    const dropdown = document.getElementById('notifications-dropdown');
    if (!notifBtn || !dropdown) return;

    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
      this.renderNotificationsList();
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== notifBtn) {
        dropdown.classList.remove('active');
      }
    });

    this.renderNotificationsList();
  },

  renderNotificationsList() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;

    const notifs = NotificationService.getAll();
    const unreadCount = notifs.filter(n => !n.read).length;

    const dot = document.querySelector('#notifications-btn .badge-dot');
    if (dot) {
      dot.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    let html = `
      <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; font-size: 0.92rem;">Notifications (${unreadCount} unread)</span>
        <button class="btn btn-sm btn-outline" id="mark-all-read-btn" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">Mark Read</button>
      </div>
      <div style="max-height: 280px; overflow-y: auto; padding: 0.5rem;">
    `;

    if (notifs.length === 0) {
      html += `<div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">No notifications</div>`;
    } else {
      notifs.forEach(n => {
        html += `
          <div class="dropdown-item" style="display: flex; gap: 0.75rem; padding: 0.65rem; border-radius: var(--radius-md); ${n.read ? 'opacity: 0.6;' : 'background-color: var(--bg-surface-subtle); margin-bottom: 0.25rem;'}">
            <i class="fas fa-bell text-primary" style="margin-top: 2px;"></i>
            <div style="flex: 1; min-width: 0;">
              <div style="font-weight: 700; font-size: 0.84rem;">${n.title}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.3;">${n.message}</div>
              <div style="font-size: 0.7rem; color: var(--text-subtle); margin-top: 0.2rem;">${n.time}</div>
            </div>
          </div>
        `;
      });
    }

    html += `</div>`;
    dropdown.innerHTML = html;

    const markBtn = document.getElementById('mark-all-read-btn');
    if (markBtn) {
      markBtn.addEventListener('click', () => {
        NotificationService.markAllAsRead();
        this.renderNotificationsList();
        StudyMate.toast('All notifications marked as read', 'success', 2000);
      });
    }
  },

  // Global Search Modal (Notes, Tasks, Materials, Resources, Planner)
  initGlobalSearch() {
    let modal = document.getElementById('global-search-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-search-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-dialog search-modal-dialog">
          <div class="search-input-wrapper">
            <i class="fas fa-search"></i>
            <input type="text" id="global-search-input" placeholder="Search notes, tasks, materials, resources... (Esc to close)" autocomplete="off">
            <button class="modal-close" id="search-modal-close"><i class="fas fa-times"></i></button>
          </div>
          <div class="search-results-list" id="global-search-results">
            <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              Type to search across all your study materials and tasks...
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const openModal = () => {
      modal.classList.add('active');
      const input = document.getElementById('global-search-input');
      if (input) {
        input.value = '';
        input.focus();
        this.performGlobalSearch('');
      }
    };

    const closeModal = () => modal.classList.remove('active');

    // Attach to search trigger buttons
    const triggers = document.querySelectorAll('.search-trigger');
    triggers.forEach(t => t.addEventListener('click', openModal));

    // Keyboard shortcut: Ctrl + K or Cmd + K
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('active')) closeModal();
        else openModal();
      }
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    const closeBtn = document.getElementById('search-modal-close');
    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.performGlobalSearch(e.target.value);
      });
    }
  },

  performGlobalSearch(query) {
    const resultsContainer = document.getElementById('global-search-results');
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          Type to search across all notes, tasks, planner sessions, materials, and resources.
        </div>
      `;
      return;
    }

    const notes = NotesService.getAll().filter(n => n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    const tasks = TasksService.getAll().filter(t => t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q));
    const materials = MaterialsService.getAll().filter(m => m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q));
    const resources = ResourcesService.getAll().filter(r => r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q));
    const schedule = PlannerService.getAll().filter(s => s.subject.toLowerCase().includes(q) || s.activity.toLowerCase().includes(q));

    const totalMatches = notes.length + tasks.length + materials.length + resources.length + schedule.length;

    if (totalMatches === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 1.8rem; margin-bottom: 0.75rem; opacity: 0.5;"></i>
          <p>No results found matching "<strong>${query}</strong>"</p>
        </div>
      `;
      return;
    }

    let html = '';

    // Notes matches
    notes.forEach(n => {
      html += `
        <a href="notes.html" class="search-result-item">
          <div class="search-result-icon"><i class="fas fa-sticky-note"></i></div>
          <div class="search-result-details">
            <div class="search-result-title">${n.title}</div>
            <div class="search-result-sub">${n.subject} • Note</div>
          </div>
          <span class="search-result-type">Notes</span>
        </a>
      `;
    });

    // Tasks matches
    tasks.forEach(t => {
      html += `
        <a href="tasks.html" class="search-result-item">
          <div class="search-result-icon" style="background-color: var(--warning-light); color: var(--warning);"><i class="fas fa-tasks"></i></div>
          <div class="search-result-details">
            <div class="search-result-title">${t.title}</div>
            <div class="search-result-sub">${t.subject} • Due ${t.dueDate || 'No date'}</div>
          </div>
          <span class="search-result-type">Task</span>
        </a>
      `;
    });

    // Materials matches
    materials.forEach(m => {
      html += `
        <a href="materials.html" class="search-result-item">
          <div class="search-result-icon" style="background-color: var(--secondary-light); color: var(--secondary);"><i class="fas fa-folder-open"></i></div>
          <div class="search-result-details">
            <div class="search-result-title">${m.title}</div>
            <div class="search-result-sub">${m.subject} • ${m.category}</div>
          </div>
          <span class="search-result-type">Material</span>
        </a>
      `;
    });

    // Resources matches
    resources.forEach(r => {
      html += `
        <a href="resources.html" class="search-result-item">
          <div class="search-result-icon" style="background-color: var(--accent-light); color: var(--accent);"><i class="fas fa-graduation-cap"></i></div>
          <div class="search-result-details">
            <div class="search-result-title">${r.title}</div>
            <div class="search-result-sub">${r.subject} • ${r.platform}</div>
          </div>
          <span class="search-result-type">Resource</span>
        </a>
      `;
    });

    // Timetable matches
    schedule.forEach(s => {
      html += `
        <a href="planner.html" class="search-result-item">
          <div class="search-result-icon" style="background-color: var(--success-light); color: var(--success);"><i class="fas fa-calendar-alt"></i></div>
          <div class="search-result-details">
            <div class="search-result-title">${s.activity}</div>
            <div class="search-result-sub">${s.day} ${s.startTime}-${s.endTime} • ${s.subject}</div>
          </div>
          <span class="search-result-type">Schedule</span>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
  }
};

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  StudyMate.init();
});
