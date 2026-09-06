/**
 * StudyMate - Study Materials Module Controller
 * Manages academic documents, PDFs, lecture slides, books, and lab manuals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMaterialsModule();
});

let currentMatSubject = 'all';
let currentMatType = 'all';
let currentMatCategory = 'all';
let currentMatSearch = '';

function initMaterialsModule() {
  setupMaterialFilters();
  setupAddMaterialModal();
  renderSubjectFilter();
  renderMaterials();

  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'new') {
    openMaterialModal();
  }
}

function renderSubjectFilter() {
  const select = document.getElementById('mat-subject-filter');
  if (!select) return;

  const materials = MaterialsService.getAll();
  const subjects = Array.from(new Set(materials.map(m => m.subject))).filter(Boolean);

  let html = '<option value="all">All Subjects</option>';
  subjects.forEach(s => {
    html += `<option value="${s}">${s}</option>`;
  });
  select.innerHTML = html;
}

function setupMaterialFilters() {
  const searchInput = document.getElementById('mat-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentMatSearch = e.target.value.toLowerCase().trim();
      renderMaterials();
    });
  }

  const subjectSelect = document.getElementById('mat-subject-filter');
  if (subjectSelect) {
    subjectSelect.addEventListener('change', (e) => {
      currentMatSubject = e.target.value;
      renderMaterials();
    });
  }

  const typeSelect = document.getElementById('mat-type-filter');
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      currentMatType = e.target.value;
      renderMaterials();
    });
  }

  const addBtn = document.getElementById('add-material-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openMaterialModal());
  }
}

function getFilteredMaterials() {
  let list = MaterialsService.getAll();

  if (currentMatSubject !== 'all') {
    list = list.filter(m => m.subject === currentMatSubject);
  }

  if (currentMatType !== 'all') {
    list = list.filter(m => m.type === currentMatType);
  }

  if (currentMatSearch) {
    list = list.filter(m => 
      m.title.toLowerCase().includes(currentMatSearch) ||
      m.subject.toLowerCase().includes(currentMatSearch) ||
      (m.description && m.description.toLowerCase().includes(currentMatSearch)) ||
      (m.tags && m.tags.some(t => t.toLowerCase().includes(currentMatSearch)))
    );
  }

  return list;
}

function renderMaterials() {
  const container = document.getElementById('materials-grid');
  if (!container) return;

  const materials = getFilteredMaterials();
  const countBadge = document.getElementById('mat-count-badge');
  if (countBadge) countBadge.textContent = `${materials.length} items`;

  if (materials.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fas fa-folder-open"></i></div>
        <h4 class="empty-state-title">No materials found</h4>
        <p class="empty-state-desc">Try clearing your filters or add textbooks, lecture slides, and notes for this subject.</p>
        <button class="btn btn-primary" onclick="openMaterialModal()"><i class="fas fa-plus"></i> Add Material</button>
      </div>
    `;
    return;
  }

  const typeIcons = {
    pdf: { icon: 'fa-file-pdf', color: '#ef4444', bg: '#fee2e2' },
    doc: { icon: 'fa-file-word', color: '#3b82f6', bg: '#dbeafe' },
    book: { icon: 'fa-book', color: '#10b981', bg: '#d1fae5' },
    video: { icon: 'fa-play-circle', color: '#8b5cf6', bg: '#ede9fe' },
    link: { icon: 'fa-link', color: '#06b6d4', bg: '#cffafe' }
  };

  let html = '';
  materials.forEach(m => {
    const tConfig = typeIcons[m.type] || typeIcons.doc;
    const tagsHtml = (m.tags || []).map(t => `<span class="note-tag">#${t}</span>`).join(' ');

    html += `
      <div class="resource-card">
        <div class="resource-top">
          <div class="resource-icon" style="background-color: ${tConfig.bg}; color: ${tConfig.color};">
            <i class="fas ${tConfig.icon}"></i>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="badge badge-secondary">${m.category || 'Reference'}</span>
            <button class="icon-btn" style="width: 28px; height: 28px; color: var(--danger);" onclick="deleteMaterial('${m.id}')" title="Delete">
              <i class="fas fa-trash-alt" style="font-size: 0.75rem;"></i>
            </button>
          </div>
        </div>
        <div>
          <span class="badge badge-primary" style="font-size: 0.7rem; margin-bottom: 0.4rem;">${m.subject}</span>
          <h3 class="resource-title">${escapeHtml(m.title)}</h3>
        </div>
        <p class="resource-desc">${escapeHtml(m.description)}</p>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">${tagsHtml}</div>
        <div style="display: flex; gap: 0.75rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border);">
          <a href="${m.url || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm btn-block" style="flex: 1;">
            <i class="fas fa-external-link-alt"></i> View Resource
          </a>
          <button class="btn btn-secondary btn-sm" onclick="downloadMaterial('${m.title}')" title="Download">
            <i class="fas fa-download"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.downloadMaterial = function(title) {
  StudyMate.toast(`Downloading simulated file: "${title}"...`, 'info', 2500);
};

window.deleteMaterial = function(id) {
  StudyMate.confirm({
    title: "Delete Material",
    message: "Are you sure you want to remove this study material from your library?",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: () => {
      MaterialsService.delete(id);
      renderMaterials();
      renderSubjectFilter();
      StudyMate.toast("Material deleted", "success");
    }
  });
};

function setupAddMaterialModal() {
  let modal = document.getElementById('material-add-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'material-add-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-folder-plus text-primary"></i> Add Study Material</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="material-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Material Title *</label>
              <input type="text" class="form-control" id="form-mat-title" placeholder="e.g. Operating Systems Lecture Slides Chapter 4" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" class="form-control" id="form-mat-subject" placeholder="e.g. Operating Systems" required>
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-select" id="form-mat-category">
                  <option value="Textbook">Textbook</option>
                  <option value="Lecture Notes" selected>Lecture Notes</option>
                  <option value="Lab Manual">Lab Manual</option>
                  <option value="Cheatsheet">Cheatsheet</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Video Course">Video Course</option>
                </select>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Format / Type</label>
                <select class="form-select" id="form-mat-type">
                  <option value="pdf">PDF Document</option>
                  <option value="doc">Word / Text Document</option>
                  <option value="book">Book / Reference</option>
                  <option value="video">Video Recording</option>
                  <option value="link">Web Resource Link</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Resource URL / Link</label>
                <input type="url" class="form-control" id="form-mat-url" placeholder="https://..." value="https://example.com/materials/doc.pdf">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-control" id="form-mat-desc" placeholder="Brief notes on what this document covers..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma separated)</label>
              <input type="text" class="form-control" id="form-mat-tags" placeholder="e.g. OS, Slides, Finals">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Add to Library</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('material-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('form-mat-title').value.trim();
      const subject = document.getElementById('form-mat-subject').value.trim();
      const category = document.getElementById('form-mat-category').value;
      const type = document.getElementById('form-mat-type').value;
      const url = document.getElementById('form-mat-url').value.trim();
      const description = document.getElementById('form-mat-desc').value.trim();
      const tagsStr = document.getElementById('form-mat-tags').value;
      const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

      MaterialsService.create({ title, subject, category, type, url, description, tags });
      StudyMate.toast('Study material added to library!', 'success');

      modal.classList.remove('active');
      form.reset();
      renderSubjectFilter();
      renderMaterials();
    });
  }
}

window.openMaterialModal = function() {
  setupAddMaterialModal();
  const modal = document.getElementById('material-add-modal');
  modal.classList.add('active');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
