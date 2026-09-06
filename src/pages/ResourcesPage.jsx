import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';

export default function ResourcesPage() {
  const { resources, addResource, deleteResource, subjects } = useStudy();

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: 'Website',
    url: '',
    difficulty: 'All Levels',
    description: '',
    free: true
  });

  const openModal = () => {
    setFormData({
      title: '',
      subject: subjects[0] || 'Computer Science',
      type: 'Documentation',
      url: 'https://',
      difficulty: 'Intermediate',
      description: '',
      free: true
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;

    addResource(formData);
    closeModal();
  };

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchSubject = selectedSubject === 'All' || res.subject === selectedSubject;
      const matchDifficulty = selectedDifficulty === 'All' || res.difficulty === selectedDifficulty;
      const matchSearch = !searchQuery ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (res.description && res.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSubject && matchDifficulty && matchSearch;
    });
  }, [resources, selectedSubject, selectedDifficulty, searchQuery]);

  return (
    <div className="resources-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Curated Learning Resources</h2>
          <p className="text-muted">High-quality handpicked documentation, roadmaps, interactive tutorials, and toolkits</p>
        </div>
        <button className="btn btn-primary" onClick={openModal}>
          <i className="fas fa-bookmark"></i> Bookmark Resource
        </button>
      </div>

      {/* Category Pills and Search */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="input-with-icon" style={{ flex: '1 1 300px' }}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search resource name or topic..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="form-control"
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Subject Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <button
            className={`btn btn-sm ${selectedSubject === 'All' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedSubject('All')}
          >
            All Subjects ({resources.length})
          </button>
          {subjects.map(s => {
            const count = resources.filter(r => r.subject === s).length;
            return (
              <button
                key={s}
                className={`btn btn-sm ${selectedSubject === s ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedSubject(s)}
              >
                {s} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Cards */}
      {filteredResources.length === 0 ? (
        <div className="card">
          <div className="card-body">
            <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
              <i className="fas fa-compass empty-state-icon"></i>
              <h3>No resources found</h3>
              <p>Bookmark high quality courses, cheat sheets, or API docs for easy reference.</p>
              <button className="btn btn-primary" onClick={openModal} style={{ marginTop: '1rem' }}>
                <i className="fas fa-plus"></i> Add New Bookmark
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredResources.map(res => (
            <div key={res.id} className="card resource-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-primary">{res.subject}</span>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{res.difficulty || 'All Levels'}</span>
                    <button
                      className="btn btn-sm btn-outline text-danger"
                      style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                      onClick={() => deleteResource(res.id)}
                      title="Remove bookmark"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {res.title}
                    <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}></i>
                  </a>
                </h4>

                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1 }}>
                  {res.description || 'Curated reference guide and interactive playground.'}
                </p>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    {res.free !== false ? 'Free Access' : 'Subscription'}
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Open Resource <i className="fas fa-arrow-right" style={{ marginLeft: '4px' }}></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookmark Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3>Bookmark New Learning Resource</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Resource Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Visualgo Data Structure Visualizer"
                    className="form-control"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Website / Tutorial URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    className="form-control"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-control"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    >
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select
                      className="form-control"
                      value={formData.difficulty}
                      onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Summary</label>
                  <textarea
                    rows="3"
                    placeholder="What makes this resource helpful? Key topics covered..."
                    className="form-control"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Bookmark</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
