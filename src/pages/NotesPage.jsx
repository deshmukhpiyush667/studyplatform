import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import ConfirmModal from '../components/common/ConfirmModal';

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, togglePinNote, toggleFavoriteNote } = useStudy();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [activeTab, setActiveTab] = useState('all'); // all, pinned, favorites

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  // Form Fields
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formColor, setFormColor] = useState('#4f46e5');
  const [formTags, setFormTags] = useState('');
  const [formPinned, setFormPinned] = useState(false);
  const [formFavorite, setFormFavorite] = useState(false);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      openCreateModal();
    }
  }, [searchParams]);

  const subjects = Array.from(new Set(notes.map(n => n.subject))).filter(Boolean);

  const openCreateModal = () => {
    setFormId('');
    setFormTitle('');
    setFormSubject('');
    setFormContent('');
    setFormColor('#4f46e5');
    setFormTags('');
    setFormPinned(false);
    setFormFavorite(false);
    setIsEditModalOpen(true);
  };

  const openEditModal = (note, e) => {
    if (e) e.stopPropagation();
    setFormId(note.id);
    setFormTitle(note.title);
    setFormSubject(note.subject);
    setFormContent(note.content);
    setFormColor(note.color || '#4f46e5');
    setFormTags((note.tags || []).join(', '));
    setFormPinned(!!note.isPinned);
    setFormFavorite(!!note.isFavorite);
    setIsEditModalOpen(true);
  };

  const openViewModal = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const tags = formTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    if (formId) {
      updateNote(formId, {
        title: formTitle,
        subject: formSubject,
        content: formContent,
        color: formColor,
        tags,
        isPinned: formPinned,
        isFavorite: formFavorite
      });
    } else {
      addNote({
        title: formTitle,
        subject: formSubject,
        content: formContent,
        color: formColor,
        tags,
        isPinned: formPinned,
        isFavorite: formFavorite
      });
    }

    setIsEditModalOpen(false);
  };

  // Filter & Sort
  let filtered = [...notes];

  if (selectedSubject !== 'all') {
    filtered = filtered.filter(n => n.subject === selectedSubject);
  }

  if (activeTab === 'pinned') {
    filtered = filtered.filter(n => n.isPinned);
  } else if (activeTab === 'favorites') {
    filtered = filtered.filter(n => n.isFavorite);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.subject.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (selectedSort === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (selectedSort === 'oldest') {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (selectedSort === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <main className="content-body">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notes & Summaries</h1>
          <p className="page-subtitle">Organize lecture takeaways, formulas, code snippets, and review materials.</p>
        </div>
        <div className="header-actions">
          <span className="badge badge-primary">{filtered.length} notes</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <div className="input-with-icon" style={{ width: '260px' }}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search notes content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ width: '170px' }}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            className="form-select"
            style={{ width: '150px' }}
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        <div className="filter-group">
          <button
            className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('all')}
          >
            All Notes
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'pinned' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('pinned')}
          >
            <i className="fas fa-thumbtack"></i> Pinned
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'favorites' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('favorites')}
          >
            <i className="fas fa-star text-warning"></i> Favorites
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon"><i className="fas fa-book-open"></i></div>
            <h4 className="empty-state-title">No notes found</h4>
            <p className="empty-state-desc">Try changing your search query or subject filters, or click "Create Note" to add one.</p>
            <button className="btn btn-primary" onClick={openCreateModal}>
              <i className="fas fa-plus"></i> Create Note
            </button>
          </div>
        ) : (
          filtered.map(n => {
            const formattedDate = new Date(n.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });

            return (
              <div
                key={n.id}
                className={`note-card ${n.isPinned ? 'pinned' : ''}`}
                style={{ borderTopColor: n.color || 'var(--primary)' }}
                onClick={() => openViewModal(n)}
              >
                <div className="note-header">
                  <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{n.subject}</span>
                  <div className="note-actions-hover" onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`note-action-icon ${n.isPinned ? 'pinned' : ''}`}
                      onClick={() => togglePinNote(n.id)}
                      title={n.isPinned ? 'Unpin' : 'Pin Note'}
                    >
                      <i className="fas fa-thumbtack"></i>
                    </button>
                    <button
                      className={`note-action-icon ${n.isFavorite ? 'favorited' : ''}`}
                      onClick={() => toggleFavoriteNote(n.id)}
                      title={n.isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
                    >
                      <i className="fas fa-star"></i>
                    </button>
                    <button
                      className="note-action-icon"
                      onClick={(e) => openEditModal(n, e)}
                      title="Edit Note"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="note-action-icon text-danger"
                      onClick={() => setDeleteNoteId(n.id)}
                      title="Delete Note"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>

                <h3 className="note-title">{n.title}</h3>
                <div className="note-snippet">{n.content}</div>

                <div className="note-tags">
                  {(n.tags || []).map(t => (
                    <span key={t} className="note-tag">#{t}</span>
                  ))}
                </div>

                <div className="note-footer">
                  <span><i className="far fa-calendar-alt"></i> {formattedDate}</span>
                  <span>Click to read</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Note View Modal */}
      {isViewModalOpen && selectedNote && (
        <div className="modal-overlay active" onClick={() => setIsViewModalOpen(false)}>
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderTop: `4px solid ${selectedNote.color || 'var(--primary)'}` }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>{selectedNote.subject}</span>
                <h2 className="modal-title" style={{ fontSize: '1.35rem' }}>{selectedNote.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setIsViewModalOpen(false)}><i className="fas fa-times"></i></button>
            </div>
            <div className="modal-body">
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', gap: '1rem' }}>
                <span><i className="far fa-calendar"></i> {new Date(selectedNote.createdAt).toLocaleString()}</span>
                {selectedNote.isPinned && <span><i className="fas fa-thumbtack text-primary"></i> Pinned</span>}
                {selectedNote.isFavorite && <span><i className="fas fa-star text-warning"></i> Favorite</span>}
              </div>
              <div style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                {selectedNote.content}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(selectedNote.tags || []).map(t => (
                  <span key={t} className="badge badge-info">#{t}</span>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsViewModalOpen(false)}>Close</button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setIsViewModalOpen(false);
                  openEditModal(selectedNote);
                }}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Create / Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <i className="fas fa-sticky-note text-primary"></i> {formId ? 'Edit Note' : 'Create New Note'}
              </h3>
              <button className="modal-close" onClick={() => setIsEditModalOpen(false)}><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Note Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Process Scheduling Algorithms"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Operating Systems"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Color Accent</label>
                    <select
                      className="form-select"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                    >
                      <option value="#4f46e5">Indigo (Default)</option>
                      <option value="#06b6d4">Cyan</option>
                      <option value="#8b5cf6">Purple</option>
                      <option value="#10b981">Emerald Green</option>
                      <option value="#f59e0b">Amber Orange</option>
                      <option value="#ef4444">Rose Red</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Content *</label>
                  <textarea
                    className="form-control"
                    style={{ minHeight: '200px' }}
                    placeholder="Write your summary, formulas, key points, concepts..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. CPU, Scheduling, RoundRobin, Finals"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formPinned}
                      onChange={(e) => setFormPinned(e.target.checked)}
                    /> Pin to top
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formFavorite}
                      onChange={(e) => setFormFavorite(e.target.checked)}
                    /> Add to favorites
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{formId ? 'Update Note' : 'Save Note'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteNoteId}
        title="Delete Note"
        message="Are you sure you want to delete this study note? This action cannot be undone."
        confirmText="Delete"
        isDanger={true}
        onConfirm={() => {
          deleteNote(deleteNoteId);
          setDeleteNoteId(null);
        }}
        onCancel={() => setDeleteNoteId(null)}
      />
    </main>
  );
}
