import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../context/StudyContext';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { notes, tasks, materials, resources, schedule } = useStudy();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredNotes = q ? notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.subject.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q)
  ) : [];

  const filteredTasks = q ? tasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.subject.toLowerCase().includes(q)
  ) : [];

  const filteredMaterials = q ? materials.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.subject.toLowerCase().includes(q)
  ) : [];

  const filteredResources = q ? resources.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.subject.toLowerCase().includes(q)
  ) : [];

  const filteredSchedule = q ? schedule.filter(s =>
    s.subject.toLowerCase().includes(q) ||
    s.activity.toLowerCase().includes(q)
  ) : [];

  const totalMatches =
    filteredNotes.length +
    filteredTasks.length +
    filteredMaterials.length +
    filteredResources.length +
    filteredSchedule.length;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-dialog search-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <i className="fas fa-search"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search notes, tasks, materials, resources... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="search-results-list">
          {!q ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Type to search across all your study materials and tasks...
            </div>
          ) : totalMatches === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <i className="fas fa-search" style={{ fontSize: '1.8rem', marginBottom: '0.75rem', opacity: 0.5 }}></i>
              <p>No results found matching "<strong>{query}</strong>"</p>
            </div>
          ) : (
            <>
              {filteredNotes.map(n => (
                <div key={n.id} className="search-result-item" onClick={() => handleSelect('/notes')}>
                  <div className="search-result-icon"><i className="fas fa-sticky-note"></i></div>
                  <div className="search-result-details">
                    <div className="search-result-title">{n.title}</div>
                    <div className="search-result-sub">{n.subject} • Note</div>
                  </div>
                  <span className="search-result-type">Notes</span>
                </div>
              ))}

              {filteredTasks.map(t => (
                <div key={t.id} className="search-result-item" onClick={() => handleSelect('/tasks')}>
                  <div className="search-result-icon" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
                    <i className="fas fa-tasks"></i>
                  </div>
                  <div className="search-result-details">
                    <div className="search-result-title">{t.title}</div>
                    <div className="search-result-sub">{t.subject} • Due {t.dueDate || 'No date'}</div>
                  </div>
                  <span className="search-result-type">Task</span>
                </div>
              ))}

              {filteredMaterials.map(m => (
                <div key={m.id} className="search-result-item" onClick={() => handleSelect('/materials')}>
                  <div className="search-result-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)' }}>
                    <i className="fas fa-folder-open"></i>
                  </div>
                  <div className="search-result-details">
                    <div className="search-result-title">{m.title}</div>
                    <div className="search-result-sub">{m.subject} • {m.category}</div>
                  </div>
                  <span className="search-result-type">Material</span>
                </div>
              ))}

              {filteredResources.map(r => (
                <div key={r.id} className="search-result-item" onClick={() => handleSelect('/resources')}>
                  <div className="search-result-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="search-result-details">
                    <div className="search-result-title">{r.title}</div>
                    <div className="search-result-sub">{r.subject} • {r.platform}</div>
                  </div>
                  <span className="search-result-type">Resource</span>
                </div>
              ))}

              {filteredSchedule.map(s => (
                <div key={s.id} className="search-result-item" onClick={() => handleSelect('/planner')}>
                  <div className="search-result-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="search-result-details">
                    <div className="search-result-title">{s.activity}</div>
                    <div className="search-result-sub">{s.day} {s.startTime}-{s.endTime} • {s.subject}</div>
                  </div>
                  <span className="search-result-type">Schedule</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
