/**
 * StudyMate - Notes Module Controller
 * Create, edit, delete, search, filter, categorize, pin, favorite, and tag notes.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNotesModule();
});

let currentFilterSubject = 'all';
let currentFilterTab = 'all'; // all, pinned, favorites
let currentSearchQuery = '';
let currentSort = 'newest';

function initNotesModule() {
  setupFilterControls();
  setupCreateModal();
  renderSubjectFilterOptions();
  renderNotes();

  // Check URL params for quick actions
  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'new') {
    openNoteModal();
  }
}

function renderSubjectFilterOptions() {
  const select = document.getElementById('notes-subject-filter');
  if (!select) return;

  const notes = NotesService.getAll();
  const subjects = Array.from(new Set(notes.map(n => n.subject))).filter(Boolean);

  let html = '<option value="all">All Subjects</option>';
  subjects.forEach(s => {
    html += `<option value="${s}">${s}</option>`;
  });
  select.innerHTML = html;
}

function setupFilterControls() {
  const searchInput = document.getElementById('notes-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderNotes();
    });
  }

  const subjectFilter = document.getElementById('notes-subject-filter');
  if (subjectFilter) {
    subjectFilter.addEventListener('change', (e) => {
      currentFilterSubject = e.target.value;
      renderNotes();
    });
  }

  const sortSelect = document.getElementById('notes-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderNotes();
    });
  }

  const tabBtns = document.querySelectorAll('.notes-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilterTab = btn.dataset.tab;
      renderNotes();
    });
  });

  const createBtn = document.getElementById('create-note-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => openNoteModal());
  }
}

function getFilteredNotes() {
  let list = NotesService.getAll();

  // Filter by subject
  if (currentFilterSubject !== 'all') {
    list = list.filter(n => n.subject === currentFilterSubject);
  }

  // Filter by tab
  if (currentFilterTab === 'pinned') {
    list = list.filter(n => n.isPinned);
  } else if (currentFilterTab === 'favorites') {
    list = list.filter(n => n.isFavorite);
  }

  // Filter by search query
  if (currentSearchQuery) {
    list = list.filter(n => 
      n.title.toLowerCase().includes(currentSearchQuery) ||
      n.subject.toLowerCase().includes(currentSearchQuery) ||
      n.content.toLowerCase().includes(currentSearchQuery) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(currentSearchQuery)))
    );
  }

  // Sort
  if (currentSort === 'newest') {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (currentSort === 'oldest') {
    list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (currentSort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  return list;
}

function renderNotes() {
  const container = document.getElementById('notes-grid');
  if (!container) return;

  const notes = getFilteredNotes();
  const countEl = document.getElementById('notes-count-badge');
  if (countEl) countEl.textContent = `${notes.length} notes`;

  if (notes.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fas fa-book-open"></i></div>
        <h4 class="empty-state-title">No notes found</h4>
        <p class="empty-state-desc">Try changing your search query or subject filters, or click "Create Note" to add one.</p>
        <button class="btn btn-primary" onclick="openNoteModal()"><i class="fas fa-plus"></i> Create Note</button>
      </div>
    `;
    return;
  }

  let html = '';
  notes.forEach(n => {
    const formattedDate = new Date(n.createdAt).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    const tagsHtml = (n.tags || []).map(t => `<span class="note-tag">#${t}</span>`).join('');

    html += `
      <div class="note-card ${n.isPinned ? 'pinned' : ''}" style="border-top-color: ${n.color || 'var(--primary)'};" onclick="viewNote('${n.id}')">
        <div class="note-header">
          <span class="badge badge-primary" style="font-size: 0.72rem;">${n.subject}</span>
          <div class="note-actions-hover" onclick="event.stopPropagation();">
            <button class="note-action-icon ${n.isPinned ? 'pinned' : ''}" onclick="togglePin('${n.id}')" title="${n.isPinned ? 'Unpin' : 'Pin Note'}">
              <i class="fas fa-thumbtack"></i>
            </button>
            <button class="note-action-icon ${n.isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('${n.id}')" title="${n.isFavorite ? 'Remove Favorite' : 'Mark Favorite'}">
              <i class="fas fa-star"></i>
            </button>
            <button class="note-action-icon" onclick="openNoteModal('${n.id}')" title="Edit Note">
              <i class="fas fa-edit"></i>
            </button>
            <button class="note-action-icon text-danger" onclick="deleteNote('${n.id}')" title="Delete Note">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <h3 class="note-title">${n.title}</h3>
        <div class="note-snippet">${escapeHtml(n.content)}</div>
        <div class="note-tags">${tagsHtml}</div>
        <div class="note-footer">
          <span><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
          <span>Click to read</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.togglePin = function(id) {
  NotesService.togglePin(id);
  renderNotes();
  StudyMate.toast('Note pinned status updated', 'info', 2000);
};

window.toggleFavorite = function(id) {
  NotesService.toggleFavorite(id);
  renderNotes();
  StudyMate.toast('Favorite status updated', 'info', 2000);
};

window.deleteNote = function(id) {
  StudyMate.confirm({
    title: "Delete Note",
    message: "Are you sure you want to delete this study note? This action cannot be undone.",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: () => {
      NotesService.delete(id);
      renderNotes();
      renderSubjectFilterOptions();
      StudyMate.updateBadgesCount();
      StudyMate.toast("Note deleted successfully", "success");
    }
  });
};

window.viewNote = function(id) {
  const note = NotesService.getById(id);
  if (!note) return;

  let modal = document.getElementById('note-view-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'note-view-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const tagsHtml = (note.tags || []).map(t => `<span class="badge badge-info">#${t}</span>`).join(' ');

  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-header" style="border-top: 4px solid ${note.color || 'var(--primary)'};">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.35rem;">${note.subject}</span>
          <h2 class="modal-title" style="font-size: 1.35rem;">${note.title}</h2>
        </div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem; display: flex; gap: 1rem;">
          <span><i class="far fa-calendar"></i> ${new Date(note.createdAt).toLocaleString()}</span>
          ${note.isPinned ? '<span><i class="fas fa-thumbtack text-primary"></i> Pinned</span>' : ''}
          ${note.isFavorite ? '<span><i class="fas fa-star text-warning"></i> Favorite</span>' : ''}
        </div>
        <div style="font-size: 0.98rem; line-height: 1.7; color: var(--text-main); white-space: pre-wrap; font-family: inherit;">${escapeHtml(note.content)}</div>
        <div style="margin-top: 2rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">${tagsHtml}</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Close</button>
        <button class="btn btn-outline" onclick="openNoteModal('${note.id}'); document.getElementById('note-view-modal').classList.remove('active');"><i class="fas fa-edit"></i> Edit</button>
      </div>
    </div>
  `;

  modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
  modal.classList.add('active');
};

function setupCreateModal() {
  let modal = document.getElementById('note-edit-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'note-edit-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-header">
          <h3 class="modal-title" id="note-modal-title"><i class="fas fa-sticky-note text-primary"></i> Create Note</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="note-form">
          <input type="hidden" id="note-edit-id">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Note Title *</label>
              <input type="text" class="form-control" id="form-note-title" placeholder="e.g. Process Scheduling Algorithms" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" class="form-control" id="form-note-subject" placeholder="e.g. Operating Systems" required>
              </div>
              <div class="form-group">
                <label class="form-label">Color Accent</label>
                <select class="form-select" id="form-note-color">
                  <option value="#4f46e5">Indigo (Default)</option>
                  <option value="#06b6d4">Cyan</option>
                  <option value="#8b5cf6">Purple</option>
                  <option value="#10b981">Emerald Green</option>
                  <option value="#f59e0b">Amber Orange</option>
                  <option value="#ef4444">Rose Red</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Content *</label>
              <textarea class="form-control" id="form-note-content" style="min-height: 200px;" placeholder="Write your summary, formulas, key points, concepts..." required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma-separated)</label>
              <input type="text" class="form-control" id="form-note-tags" placeholder="e.g. CPU, Scheduling, RoundRobin, Finals">
            </div>
            <div style="display: flex; gap: 1.5rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; cursor: pointer;">
                <input type="checkbox" id="form-note-pinned"> Pin to top
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; cursor: pointer;">
                <input type="checkbox" id="form-note-favorite"> Add to favorites
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary" id="note-save-btn">Save Note</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('note-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('note-edit-id').value;
      const title = document.getElementById('form-note-title').value.trim();
      const subject = document.getElementById('form-note-subject').value.trim();
      const content = document.getElementById('form-note-content').value.trim();
      const color = document.getElementById('form-note-color').value;
      const tagsStr = document.getElementById('form-note-tags').value;
      const isPinned = document.getElementById('form-note-pinned').checked;
      const isFavorite = document.getElementById('form-note-favorite').checked;

      const tags = tagsStr.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

      if (id) {
        NotesService.update(id, { title, subject, content, color, tags, isPinned, isFavorite });
        StudyMate.toast('Note updated successfully!', 'success');
      } else {
        NotesService.create({ title, subject, content, color, tags, isPinned, isFavorite });
        StudyMate.toast('Note created successfully!', 'success');
      }

      modal.classList.remove('active');
      renderSubjectFilterOptions();
      renderNotes();
      StudyMate.updateBadgesCount();
    });
  }
}

window.openNoteModal = function(id = null) {
  setupCreateModal();
  const modal = document.getElementById('note-edit-modal');
  const form = document.getElementById('note-form');
  const titleEl = document.getElementById('note-modal-title');
  const idInput = document.getElementById('note-edit-id');

  form.reset();

  if (id) {
    const note = NotesService.getById(id);
    if (!note) return;
    titleEl.innerHTML = '<i class="fas fa-edit text-primary"></i> Edit Note';
    idInput.value = note.id;
    document.getElementById('form-note-title').value = note.title;
    document.getElementById('form-note-subject').value = note.subject;
    document.getElementById('form-note-content').value = note.content;
    document.getElementById('form-note-color').value = note.color || '#4f46e5';
    document.getElementById('form-note-tags').value = (note.tags || []).join(', ');
    document.getElementById('form-note-pinned').checked = !!note.isPinned;
    document.getElementById('form-note-favorite').checked = !!note.isFavorite;
  } else {
    titleEl.innerHTML = '<i class="fas fa-plus-circle text-primary"></i> Create New Note';
    idInput.value = '';
  }

  modal.classList.add('active');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
