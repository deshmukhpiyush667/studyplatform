import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { openPrintablePDF, downloadOfflineHandbookHTML } from '../utils/materialPdfExporter';

export default function MaterialsPage() {
  const { materials, addMaterial, deleteMaterial, subjects } = useStudy();

  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reader Modal State
  const [readingMaterial, setReadingMaterial] = useState(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  // Upload Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: 'PDF',
    size: '4.5 MB',
    author: 'Computer Science Department',
    description: '',
    chapters: [
      {
        title: '1. Fundamentals & Overview',
        content: '### Core Principles\nDetailed academic notes and theoretical foundations for this subject.',
        keyFormulas: ['Key Formula: Theoretical baseline complexity O(1)']
      }
    ]
  });

  const openUploadModal = () => {
    setFormData({
      title: '',
      subject: subjects[0] || 'Data Structures & Algorithms',
      type: 'PDF',
      size: '3.8 MB',
      author: 'Computer Science Department',
      description: '',
      chapters: [
        {
          title: '1. Fundamentals & Overview',
          content: '### Core Principles\nDetailed academic notes and theoretical foundations for this subject.',
          keyFormulas: ['Key Formula: Theoretical baseline complexity O(1)']
        }
      ]
    });
    setIsModalOpen(true);
  };

  const closeUploadModal = () => setIsModalOpen(false);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addMaterial({
      ...formData,
      uploadedDate: new Date().toISOString().split('T')[0]
    });
    closeUploadModal();
  };

  const openReader = (material) => {
    setReadingMaterial(material);
    setActiveChapterIdx(0);
  };

  const closeReader = () => {
    setReadingMaterial(null);
    setActiveChapterIdx(0);
  };

  const handleDownloadSingle = (material) => {
    openPrintablePDF([material], true);
  };

  const handleDownloadSingleHTML = (material) => {
    downloadOfflineHandbookHTML([material]);
  };

  const handleDownloadAllSubjectsPDF = () => {
    openPrintablePDF(materials, true);
  };

  const handleDownloadAllSubjectsHTML = () => {
    downloadOfflineHandbookHTML(materials);
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchSubject = filterSubject === 'all' || m.subject === filterSubject;
      const matchType = filterType === 'all' || (m.type && m.type.toLowerCase() === filterType.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query ||
        m.title.toLowerCase().includes(query) ||
        (m.subject && m.subject.toLowerCase().includes(query)) ||
        (m.description && m.description.toLowerCase().includes(query));
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

  const currentChapter = readingMaterial && readingMaterial.chapters
    ? readingMaterial.chapters[activeChapterIdx] || readingMaterial.chapters[0]
    : null;

  return (
    <div className="materials-page">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Academic Study Handbooks & Full PDFs
          </h2>
          <p className="text-muted" style={{ maxWidth: '650px', fontSize: '0.92rem' }}>
            Comprehensive, multi-chapter academic curriculum guides across all engineering subjects with theory, formulas, code, and printable verified PDFs.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={handleDownloadAllSubjectsPDF}
            title="Generate and print/save a single mega PDF containing all 7 core subjects"
          >
            <i className="fas fa-file-pdf"></i> Download All Subjects (Mega PDF)
          </button>
          <button
            className="btn btn-outline"
            onClick={handleDownloadAllSubjectsHTML}
            title="Download full standalone offline handbook HTML containing all subjects"
          >
            <i className="fas fa-download"></i> All Offline Handbooks
          </button>
          <button className="btn btn-secondary" onClick={openUploadModal}>
            <i className="fas fa-upload"></i> Upload Custom Guide
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="input-with-icon" style={{ flex: '1 1 300px' }}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search handbooks by title, subject, or keywords..."
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
              <option value="all">All Subjects ({materials.length})</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              className="form-control"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Formats</option>
              <option value="pdf">PDF Handbooks</option>
              <option value="doc">Word / Docs</option>
              <option value="presentation">Presentations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Stats Callout */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(79, 70, 229, 0.2)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Complete Academic Curriculum Handbooks Available
            </h4>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              All 7 core engineering subjects are fully loaded with deep theoretical chapters, formulas, complexity charts, and verified PDF printing.
            </p>
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={handleDownloadAllSubjectsPDF}
          style={{ whiteSpace: 'nowrap' }}
        >
          <i className="fas fa-print"></i> 1-Click Print All PDFs
        </button>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="card">
          <div className="card-body">
            <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
              <i className="fas fa-folder-open empty-state-icon"></i>
              <h3>No study materials found</h3>
              <p>Try clearing your search query or subject filters to see all available academic handbooks.</p>
              <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setFilterSubject('all'); setFilterType('all'); }} style={{ marginTop: '1rem' }}>
                <i className="fas fa-redo"></i> Reset Filters
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.35rem' }}>
          {filteredMaterials.map(item => {
            const chapterCount = item.chapters ? item.chapters.length : 0;
            return (
              <div
                key={item.id}
                className="card material-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.4rem' }}>
                  {/* Top Subject and Format Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                      {item.subject}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#dc2626',
                      background: '#fee2e2',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <i className="fas fa-file-pdf"></i> {item.pages ? `${item.pages} Pages` : 'PDF'}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'var(--primary-light, rgba(79, 70, 229, 0.1))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      flexShrink: 0
                    }}>
                      <i className={`fas ${getTypeIcon(item.type)}`}></i>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        lineHeight: 1.35
                      }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {item.description || 'Full subject study material with comprehensive chapters, core algorithms, and formulas.'}
                  </p>

                  {/* Meta Details */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.1rem',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-app)',
                    borderRadius: '6px'
                  }}>
                    <span><i className="fas fa-book-open"></i> {chapterCount > 0 ? `${chapterCount} Chapters` : 'Handbook'}</span>
                    <span>•</span>
                    <span><i className="fas fa-clock"></i> {item.readTime || '40 mins'}</span>
                    <span>•</span>
                    <span><i className="fas fa-hdd"></i> {item.size || '4.5 MB'}</span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openReader(item)}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                      title="Read full chapters, theorems, and formulas in-app"
                    >
                      <i className="fas fa-book-reader"></i> Read Guide
                    </button>

                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDownloadSingle(item)}
                      title="Save / Print as PDF"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <i className="fas fa-file-pdf text-danger"></i> PDF
                    </button>

                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDownloadSingleHTML(item)}
                      title="Download offline document"
                    >
                      <i className="fas fa-download"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline text-danger"
                      onClick={() => deleteMaterial(item.id)}
                      title="Delete material"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* IN-APP STUDY HANDBOOK READER MODAL                                        */}
      {/* ========================================================================= */}
      {readingMaterial && (
        <div className="modal-overlay active" onClick={closeReader} style={{ zIndex: 1200 }}>
          <div
            className="modal-dialog modal-xl"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '1050px',
              width: '95vw',
              height: '90vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden'
            }}
          >
            {/* Reader Header */}
            <div className="modal-header" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
                <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                  {readingMaterial.subject}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {readingMaterial.title}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDownloadSingle(readingMaterial)}
                  title="Print or Save this handbook as PDF"
                >
                  <i className="fas fa-print"></i> Save / Print PDF
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleDownloadSingleHTML(readingMaterial)}
                  title="Download standalone offline HTML handbook"
                >
                  <i className="fas fa-download"></i> Offline HTML
                </button>
                <button
                  className="modal-close"
                  onClick={closeReader}
                  style={{ fontSize: '1.4rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Reader Split Body */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {/* Left Pane: Chapter Navigation */}
              <div style={{
                width: '280px',
                borderRight: '1px solid var(--border)',
                background: 'var(--bg-app)',
                overflowY: 'auto',
                padding: '1rem 0.75rem',
                flexShrink: 0
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
                  Table of Contents ({(readingMaterial.chapters || []).length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {(readingMaterial.chapters || []).map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveChapterIdx(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: activeChapterIdx === idx ? 'var(--primary)' : 'transparent',
                        color: activeChapterIdx === idx ? 'white' : 'var(--text-main)',
                        fontWeight: activeChapterIdx === idx ? 600 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        lineHeight: 1.35
                      }}
                    >
                      {chap.title}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', padding: '0.85rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Author / Faculty:</div>
                  <div style={{ color: 'var(--text-muted)' }}>{readingMaterial.author || 'Academic Faculty'}</div>
                  <div style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Read Time:</div>
                  <div style={{ color: 'var(--text-muted)' }}>{readingMaterial.readTime || '45 mins'} ({readingMaterial.pages || '40'} Pages)</div>
                </div>
              </div>

              {/* Right Pane: Chapter Content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem', background: 'var(--bg-card)' }}>
                {currentChapter ? (
                  <div>
                    {/* Chapter Title */}
                    <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Chapter {activeChapterIdx + 1} of {(readingMaterial.chapters || []).length}
                      </span>
                      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.35rem' }}>
                        {currentChapter.title}
                      </h2>
                    </div>

                    {/* Chapter Text Content */}
                    <div
                      className="reader-prose"
                      style={{ fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--text-main)' }}
                    >
                      {renderChapterContent(currentChapter.content)}
                    </div>

                    {/* Key Formulas Box */}
                    {currentChapter.keyFormulas && currentChapter.keyFormulas.length > 0 && (
                      <div style={{
                        marginTop: '2rem',
                        padding: '1.25rem 1.5rem',
                        background: 'rgba(2, 132, 199, 0.08)',
                        borderLeft: '4px solid #0284c7',
                        borderRadius: '0 8px 8px 0'
                      }}>
                        <div style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: '#0284c7',
                          marginBottom: '0.65rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <i className="fas fa-bolt"></i> Key Formulas, Theorems & Complexities
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-main)' }}>
                          {currentChapter.keyFormulas.map((f, fIdx) => (
                            <li key={fIdx} style={{ marginBottom: '0.4rem', fontFamily: 'monospace', fontSize: '0.92rem' }}>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Chapter Pagination Footer */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '3rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border)'
                    }}>
                      <button
                        className="btn btn-outline"
                        disabled={activeChapterIdx === 0}
                        onClick={() => setActiveChapterIdx(prev => Math.max(0, prev - 1))}
                        style={{ opacity: activeChapterIdx === 0 ? 0.4 : 1, cursor: activeChapterIdx === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        <i className="fas fa-arrow-left"></i> Previous Chapter
                      </button>

                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {activeChapterIdx + 1} / {(readingMaterial.chapters || []).length}
                      </span>

                      <button
                        className="btn btn-primary"
                        disabled={activeChapterIdx >= (readingMaterial.chapters || []).length - 1}
                        onClick={() => setActiveChapterIdx(prev => Math.min((readingMaterial.chapters || []).length - 1, prev + 1))}
                        style={{
                          opacity: activeChapterIdx >= (readingMaterial.chapters || []).length - 1 ? 0.4 : 1,
                          cursor: activeChapterIdx >= (readingMaterial.chapters || []).length - 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Next Chapter <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                    <p>No content available for this section.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UPLOAD / ADD MATERIAL MODAL                                               */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeUploadModal}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Upload Study Document</h3>
              <button className="modal-close" onClick={closeUploadModal}>&times;</button>
            </div>
            <form onSubmit={handleUploadSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Distributed Systems Review Guide"
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

                <div className="form-group">
                  <label className="form-label">Author / Faculty</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Dept. of Computer Science"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brief Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Topics covered, syllabus reference, or key exam focus points..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Format</label>
                    <select
                      className="form-control"
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="PDF">PDF Handbook</option>
                      <option value="DOCX">DOCX</option>
                      <option value="Presentation">Presentation (PPT)</option>
                      <option value="ZIP">ZIP / Source Code</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">File Size</label>
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

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                <button type="button" className="btn btn-secondary" onClick={closeUploadModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Handbook</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to render markdown-like content in React reader pane
function renderChapterContent(contentStr) {
  if (!contentStr) return null;

  const lines = contentStr.trim().split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} style={{ margin: '0.75rem 0 1.25rem 1.5rem', padding: 0 }}>
          {currentList.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.45rem', lineHeight: 1.6 }}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${elements.length}`}
            style={{
              background: '#0f172a',
              color: '#f8fafc',
              padding: '1rem 1.25rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              overflowX: 'auto',
              margin: '1rem 0'
            }}
          >
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={`h4-${i}`} style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.25rem 0 0.5rem', color: 'var(--text-main)' }}>
          {line.replace('#### ', '')}
        </h4>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} style={{ fontSize: '1.25rem', fontWeight: 700, margin: '1.5rem 0 0.65rem', color: 'var(--text-main)' }}>
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} style={{ fontSize: '1.4rem', fontWeight: 700, margin: '1.75rem 0 0.75rem', color: 'var(--text-main)' }}>
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      currentList.push(line.trim().replace(/^[-*]\s+/, ''));
    } else if (/^\s*\d+\.\s+/.test(line)) {
      currentList.push(line.trim().replace(/^\d+\.\s+/, ''));
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={`p-${i}`} style={{ margin: '0.65rem 0', lineHeight: 1.7 }}>
          {renderInline(line)}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

function renderInline(text) {
  if (!text) return '';

  // Split by bold (**bold**) and inline code (`code`)
  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\$.*?\$)/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          style={{
            background: 'var(--bg-app)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.88em',
            fontFamily: 'monospace',
            color: 'var(--primary)'
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('$') && token.endsWith('$')) {
      parts.push(
        <code
          key={match.index}
          style={{
            background: 'var(--bg-app)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.88em',
            fontFamily: 'monospace',
            color: '#0284c7'
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts;
}
