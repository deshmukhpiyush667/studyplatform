import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function PlannerPage() {
  const { timetable, addSession, updateSession, deleteSession, toggleSessionCompleted, subjects } = useStudy();

  const [selectedDay, setSelectedDay] = useState('All');
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'
  const [activeDayTab, setActiveDayTab] = useState('Monday');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    room: '',
    type: 'Lecture',
    color: '#4f46e5'
  });

  const openCreateModal = (presetDay = 'Monday') => {
    setEditingSession(null);
    setFormData({
      title: '',
      subject: subjects[0] || 'Computer Science',
      day: presetDay,
      startTime: '09:00',
      endTime: '10:30',
      room: 'Room 302',
      type: 'Lecture',
      color: '#4f46e5'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (session) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      subject: session.subject,
      day: session.day || 'Monday',
      startTime: session.startTime || '09:00',
      endTime: session.endTime || '10:30',
      room: session.room || '',
      type: session.type || 'Lecture',
      color: session.color || '#4f46e5'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSession(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingSession) {
      updateSession(editingSession.id, formData);
    } else {
      addSession(formData);
    }
    closeModal();
  };

  // Group sessions by day
  const sessionsByDay = useMemo(() => {
    const grouped = {};
    DAYS_OF_WEEK.forEach(d => { grouped[d] = []; });
    timetable.forEach(session => {
      const day = session.day || 'Monday';
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(session);
    });
    // Sort each day by startTime
    Object.keys(grouped).forEach(d => {
      grouped[d].sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    });
    return grouped;
  }, [timetable]);

  const totalSessions = timetable.length;
  const completedCount = timetable.filter(s => s.completed).length;

  return (
    <div className="planner-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Weekly Study Timetable & Planner</h2>
          <p className="text-muted">Organize your weekly lectures, labs, tutoring, and self-study sessions</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="btn-group" style={{ display: 'flex' }}>
            <button
              className={`btn ${viewMode === 'week' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('week')}
            >
              <i className="fas fa-calendar-week"></i> Week View
            </button>
            <button
              className={`btn ${viewMode === 'day' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('day')}
            >
              <i className="fas fa-calendar-day"></i> Day View
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => openCreateModal(activeDayTab)}>
            <i className="fas fa-plus"></i> Add Session
          </button>
        </div>
      </div>

      {/* Progress alert */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', backgroundColor: 'var(--card-bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="stat-icon icon-primary"><i className="fas fa-calendar-check"></i></div>
            <div>
              <h4 style={{ margin: 0 }}>Weekly Schedule Status</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {completedCount} of {totalSessions} sessions completed this week ({totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0}%)
              </p>
            </div>
          </div>
          <div style={{ width: '200px' }}>
            <div className="progress-bar-bg" style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary)',
                  width: `${totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode: Week Grid */}
      {viewMode === 'week' ? (
        <div className="timetable-week-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="card timetable-day-col" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div
                className="card-header"
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--hover-bg)'
                }}
              >
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{day}</h4>
                <button
                  className="btn btn-sm btn-outline"
                  style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                  onClick={() => openCreateModal(day)}
                  title={`Add session to ${day}`}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="card-body" style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sessionsByDay[day].length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No sessions
                  </div>
                ) : (
                  sessionsByDay[day].map(session => (
                    <div
                      key={session.id}
                      className="session-card"
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: `4px solid ${session.color || 'var(--primary)'}`,
                        backgroundColor: 'var(--card-bg)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                        opacity: session.completed ? 0.65 : 1
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h5
                          style={{
                            margin: 0,
                            fontSize: '0.9rem',
                            textDecoration: session.completed ? 'line-through' : 'none'
                          }}
                        >
                          {session.title}
                        </h5>
                        <input
                          type="checkbox"
                          checked={!!session.completed}
                          onChange={() => toggleSessionCompleted(session.id)}
                          title="Mark completed"
                          style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                        />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        <i className="far fa-clock"></i> {session.startTime} - {session.endTime}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{session.subject}</span>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button
                            className="btn btn-sm"
                            style={{ padding: '2px 5px', fontSize: '0.7rem', color: 'var(--text-muted)' }}
                            onClick={() => openEditModal(session)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{ padding: '2px 5px', fontSize: '0.7rem', color: 'var(--danger)' }}
                            onClick={() => deleteSession(session.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                      {session.room && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          <i className="fas fa-map-marker-alt"></i> {session.room}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* View Mode: Day Tabs */
        <div>
          <div className="tabs-nav" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {DAYS_OF_WEEK.map(day => (
              <button
                key={day}
                className={`btn ${activeDayTab === day ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveDayTab(day)}
              >
                {day} ({sessionsByDay[day].length})
              </button>
            ))}
          </div>

          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{activeDayTab}'s Agenda</h3>
              <button className="btn btn-sm btn-primary" onClick={() => openCreateModal(activeDayTab)}>
                <i className="fas fa-plus"></i> Add Session to {activeDayTab}
              </button>
            </div>
            <div className="card-body">
              {sessionsByDay[activeDayTab].length === 0 ? (
                <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                  <i className="fas fa-calendar-day empty-state-icon"></i>
                  <h3>No sessions scheduled for {activeDayTab}</h3>
                  <p>Take a break or add classes, study blocks, and labs to stay organized.</p>
                  <button className="btn btn-primary" onClick={() => openCreateModal(activeDayTab)} style={{ marginTop: '1rem' }}>
                    <i className="fas fa-plus"></i> Add Study Session
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sessionsByDay[activeDayTab].map(session => (
                    <div
                      key={session.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: `5px solid ${session.color || 'var(--primary)'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                          type="checkbox"
                          checked={!!session.completed}
                          onChange={() => toggleSessionCompleted(session.id)}
                          style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        />
                        <div>
                          <h4 style={{ margin: 0, textDecoration: session.completed ? 'line-through' : 'none' }}>
                            {session.title}
                          </h4>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span><i className="far fa-clock"></i> {session.startTime} - {session.endTime}</span>
                            <span><i className="fas fa-book"></i> {session.subject}</span>
                            {session.room && <span><i className="fas fa-map-marker-alt"></i> {session.room}</span>}
                            <span><i className="fas fa-tag"></i> {session.type}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-sm btn-outline" onClick={() => openEditModal(session)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline text-danger" onClick={() => deleteSession(session.id)}>
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3>{editingSession ? 'Edit Timetable Session' : 'Add Timetable Session'}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Session Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Operating Systems Lecture"
                    className="form-control"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
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
                    <label className="form-label">Day of Week</label>
                    <select
                      className="form-control"
                      value={formData.day}
                      onChange={e => setFormData({ ...formData, day: e.target.value })}
                    >
                      {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.startTime}
                      onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.endTime}
                      onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Session Type</label>
                    <select
                      className="form-control"
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Lecture">Lecture</option>
                      <option value="Lab">Lab</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Self-Study">Self-Study</option>
                      <option value="Group Study">Group Study</option>
                      <option value="Exam / Test">Exam / Test</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location / Room / URL</label>
                    <input
                      type="text"
                      placeholder="e.g. Hall B / Zoom"
                      className="form-control"
                      value={formData.room}
                      onChange={e => setFormData({ ...formData, room: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Accent Color</label>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(c => (
                      <div
                        key={c}
                        onClick={() => setFormData({ ...formData, color: c })}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: c,
                          cursor: 'pointer',
                          border: formData.color === c ? '3px solid #000' : '2px solid transparent',
                          transform: formData.color === c ? 'scale(1.1)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingSession ? 'Save Changes' : 'Add Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
