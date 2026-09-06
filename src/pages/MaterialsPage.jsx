import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';

export default function MaterialsPage() {
  const { materials, addMaterial, deleteMaterial, subjects } = useStudy();

  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: 'PDF',
    size: '1.5 MB',
    url: '#'
  });

  const openModal = () => {
    setFormData({
      title: '',
      subject: subjects[0] || 'Computer Science',
      type: 'PDF',
      size: '2.0 MB',
      url: '#'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addMaterial({
      ...formData,
      uploadDate: new Date().toISOString().split('T')[0]
    });
    closeModal();
  };

  const handleDownload = (material) => {
    // Generate a dummy download file simulation
    const element = document.createElement('a');
    const file = new Blob([`Study Material: ${material.title}\nSubject: ${material.subject}\nType: ${material.type}\nDownloaded from StudyMate`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${material.title.replace(/\s+/g, '_')}.${material.type.toLowerCase() === 'presentation' ? 'pptx' : material.type.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchSubject = filterSubject === 'all' || m.subject === filterSubject;
      const matchType = filterType === 'all' || m.type.toLowerCase() === filterType.toLowerCase();
      const matchSearch = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchType && matchSearch;
    });
  }, [materials, filterSubject, filterType, searchQuery]);

  const getTypeIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('pdf')) return 'fa-file-pdf text-danger';
    if (t.includes('doc') || t.includes('word')) return 'fa-file-word text-primary';
    if (t.includes('slide') || t.includes('presentation') || t.includes('ppt')) return 'fa-file-powerpoint text-warning';
    if (t.includes('zip') || t.includes('code')) return 'fa-file-archive text-info';
    return 'fa-file-alt text-secondary';
  };

  return (
    <div className="materials-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Study Materials & Documents</h2>
          <p className="text-muted">Central repository for lecture slides, past exams, reference PDFs, and cheat sheets</p>
        </div>
        <button className="btn btn-primary" onClick={openModal}>
          <i className="fas fa-upload"></i> Upload Material
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="input-with-icon" style={{ flex: '1 1 300px' }}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search documents by title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="form-control"
              value={filterSubject}
              onChange={e => setFilterSubject(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              className="form-control"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All File Formats</option>
              <option value="pdf">PDF Documents</option>
              <option value="doc">Word / Docs</option>
              <option value="presentation">Presentations</option>
              <option value="zip">Archive / Code</option>
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="card">
          <div className="card-body">
            <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
              <i className="fas fa-folder-open empty-state-icon"></i>
              <h3>No study materials found</h3>
              <p>Upload lecture notes, past exam papers, and PDFs to have them accessible anywhere.</p>
              <button className="btn btn-primary" onClick={openModal} style={{ marginTop: '1rem' }}>
                <i className="fas fa-upload"></i> Upload First Document
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredMaterials.map(item => (
            <div key={item.id} className="card material-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '2rem', minWidth: '40px', textAlign: 'center' }}>
                    <i className={`fas ${getTypeIcon(item.type)}`}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', wordBreak: 'break-word' }}>
                      {item.title}
                    </h4>
                    <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{item.subject}</span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div>
                    <span>{item.type}</span> • <span>{item.size || '1.2 MB'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDownload(item)}
                      title="Download document"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline text-danger"
                      onClick={() => deleteMaterial(item.id)}
                      title="Delete document"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Upload Study Document</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS201 Midterm Prep Slides"
                    className="form-control"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Format</label>
                    <select
                      className="form-control"
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX</option>
                      <option value="Presentation">Presentation (PPT)</option>
                      <option value="ZIP">ZIP / Source</option>
                      <option value="Cheat Sheet">Cheat Sheet</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Simulated Size</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.size}
                      onChange={e => setFormData({ ...formData, size: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select File (Simulated)</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setFormData({
                          ...formData,
                          title: formData.title || file.name.replace(/\.[^/.]+$/, ""),
                          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Document</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
