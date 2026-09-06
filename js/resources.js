/**
 * StudyMate - Learning Resources Directory Controller
 * Curated academic & CS tech guides, interactive filters, custom resource bookmarking.
 */

document.addEventListener('DOMContentLoaded', () => {
  initResourcesModule();
});

let currentResSubject = 'all';
let currentResDifficulty = 'all';
let currentResSearch = '';

function initResourcesModule() {
  setupResourceFilters();
  setupAddResourceModal();
  renderResources();

  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'new') {
    openResourceModal();
  }
}

function setupResourceFilters() {
  const searchInput = document.getElementById('res-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentResSearch = e.target.value.toLowerCase().trim();
      renderResources();
    });
  }

  const subjectPills = document.querySelectorAll('.res-subject-pill');
  subjectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      subjectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentResSubject = pill.dataset.subject;
      renderResources();
    });
  });

  const diffSelect = document.getElementById('res-diff-filter');
  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      currentResDifficulty = e.target.value;
      renderResources();
    });
  }

  const addBtn = document.getElementById('add-resource-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openResourceModal());
  }
}

function getFilteredResources() {
  let list = ResourcesService.getAll();

  if (currentResSubject !== 'all') {
    list = list.filter(r => r.subject.toLowerCase().includes(currentResSubject.toLowerCase()));
  }

  if (currentResDifficulty !== 'all') {
    list = list.filter(r => r.difficulty.toLowerCase().includes(currentResDifficulty.toLowerCase()));
  }

  if (currentResSearch) {
    list = list.filter(r => 
      r.title.toLowerCase().includes(currentResSearch) ||
      r.subject.toLowerCase().includes(currentResSearch) ||
      r.platform.toLowerCase().includes(currentResSearch) ||
      (r.description && r.description.toLowerCase().includes(currentResSearch))
    );
  }

  return list;
}

function renderResources() {
  const container = document.getElementById('resources-grid');
  if (!container) return;

  const resources = getFilteredResources();
  const countBadge = document.getElementById('res-count-badge');
  if (countBadge) countBadge.textContent = `${resources.length} resources`;

  if (resources.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fas fa-search"></i></div>
        <h4 class="empty-state-title">No learning resources found</h4>
        <p class="empty-state-desc">Try clearing your filters or add a new bookmark to your resource collection.</p>
        <button class="btn btn-primary" onclick="openResourceModal()"><i class="fas fa-plus"></i> Add Resource</button>
      </div>
    `;
    return;
  }

  let html = '';
  resources.forEach(r => {
    html += `
      <div class="resource-card">
        <div class="resource-top">
          <span class="badge badge-primary">${r.subject}</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="badge badge-info">${r.difficulty || 'All Levels'}</span>
            <button class="icon-btn" style="width: 28px; height: 28px; color: var(--danger);" onclick="deleteResource('${r.id}')" title="Delete">
              <i class="fas fa-trash-alt" style="font-size: 0.75rem;"></i>
            </button>
          </div>
        </div>
        <h3 class="resource-title" style="margin-top: 0.5rem;">${escapeHtml(r.title)}</h3>
        <p class="resource-desc">${escapeHtml(r.description)}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border);">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);"><i class="fas fa-globe"></i> ${r.platform}</span>
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            Open Resource <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.deleteResource = function(id) {
  StudyMate.confirm({
    title: "Delete Resource",
    message: "Are you sure you want to remove this learning resource bookmark?",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: () => {
      ResourcesService.delete(id);
      renderResources();
      StudyMate.toast("Resource bookmark removed", "success");
    }
  });
};

function setupAddResourceModal() {
  let modal = document.getElementById('resource-add-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'resource-add-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-bookmark text-primary"></i> Add Learning Resource</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="resource-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Resource Name *</label>
              <input type="text" class="form-control" id="form-res-title" placeholder="e.g. FreeCodeCamp Web Development Roadmap" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <select class="form-select" id="form-res-subject" required>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="Data Structures">Data Structures & Algorithms</option>
                  <option value="DBMS">DBMS</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="Machine Learning">Machine Learning & AI</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Academics">General Academic</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Platform / Provider</label>
                <input type="text" class="form-control" id="form-res-platform" placeholder="e.g. YouTube, Coursera, GitHub" required>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Difficulty</label>
                <select class="form-select" id="form-res-diff">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate" selected>Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">URL / Website Link *</label>
                <input type="url" class="form-control" id="form-res-url" placeholder="https://..." required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-control" id="form-res-desc" placeholder="What will students learn from this resource?"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Resource</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('resource-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('form-res-title').value.trim();
      const subject = document.getElementById('form-res-subject').value;
      const platform = document.getElementById('form-res-platform').value.trim();
      const difficulty = document.getElementById('form-res-diff').value;
      const url = document.getElementById('form-res-url').value.trim();
      const description = document.getElementById('form-res-desc').value.trim();

      ResourcesService.create({ title, subject, platform, difficulty, url, description });
      StudyMate.toast('Learning resource saved!', 'success');

      modal.classList.remove('active');
      form.reset();
      renderResources();
    });
  }
}

window.openResourceModal = function() {
  setupAddResourceModal();
  const modal = document.getElementById('resource-add-modal');
  modal.classList.add('active');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
