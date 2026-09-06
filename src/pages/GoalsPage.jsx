import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal, toggleMilestone, updateGoalProgress } = useStudy();

  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    targetDate: '',
    progress: 0,
    milestones: ''
  });

  const openCreateModal = () => {
    setEditingGoal(null);
    setFormData({
      title: '',
      category: 'Academic',
      targetDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      progress: 0,
      milestones: 'Complete prerequisite review\nFinish weekly problem sets\nTake practice mock test'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      category: goal.category || 'Academic',
      targetDate: goal.targetDate || '',
      progress: goal.progress || 0,
      milestones: Array.isArray(goal.milestones)
        ? goal.milestones.map(m => typeof m === 'string' ? m : (m.text || m.title)).join('\n')
        : ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const milestonesList = formData.milestones
      .split('\n')
      .map(m => m.trim())
      .filter(Boolean)
      .map(text => ({ title: text, completed: false }));

    const payload = {
      title: formData.title,
      category: formData.category,
      targetDate: formData.targetDate,
      progress: Number(formData.progress) || 0,
      milestones: milestonesList
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, payload);
    } else {
      addGoal(payload);
    }
    closeModal();
  };

  const filteredGoals = goals.filter(g => {
    if (filterCategory === 'all') return true;
    return (g.category || '').toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <div className="goals-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Goals & Milestones</h2>
          <p className="text-muted">Set ambitious targets, monitor milestone completion, and stay accountable</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <i className="fas fa-bullseye"></i> Set New Goal
        </button>
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'Academic', 'Career', 'Skill', 'Personal'].map(cat => (
          <button
            key={cat}
            className={`btn ${filterCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterCategory(cat)}
            style={{ textTransform: 'capitalize' }}
          >
            {cat === 'all' ? 'All Goals' : cat}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <div className="card">
          <div className="card-body">
            <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
              <i className="fas fa-trophy empty-state-icon"></i>
              <h3>No goals set yet</h3>
              <p>Break down big academic dreams into actionable, trackable milestones.</p>
              <button className="btn btn-primary" onClick={openCreateModal} style={{ marginTop: '1rem' }}>
                <i className="fas fa-plus"></i> Define Your First Goal
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filteredGoals.map(goal => {
            const milestones = Array.isArray(goal.milestones) ? goal.milestones : [];
            const completedCount = milestones.filter(m => typeof m === 'object' ? (m.done !== undefined ? !!m.done : !!m.completed) : false).length;
            const calculatedProgress = milestones.length > 0
              ? Math.round((completedCount / milestones.length) * 100)
              : (goal.progress || 0);

            return (
              <div key={goal.id} className="card goal-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span className="badge badge-primary">{goal.category || 'Academic'}</span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn btn-sm btn-outline" onClick={() => openEditModal(goal)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-outline text-danger" onClick={() => deleteGoal(goal.id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>

                  <h3 style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '1.2rem' }}>{goal.title}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                    Target: {goal.targetDate || 'Ongoing'}
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      <span>Progress</span>
                      <strong>{calculatedProgress}%</strong>
                    </div>
                    <div className="progress-bar-bg" style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          background: calculatedProgress === 100 ? 'var(--success)' : 'var(--primary)',
                          width: `${calculatedProgress}%`,
                          transition: 'width 0.3s ease'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones checklist */}
                  <div style={{ marginTop: 'auto' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Milestones ({completedCount}/{milestones.length})
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {milestones.map((m, idx) => {
                        const isDone = typeof m === 'object' ? (m.done !== undefined ? !!m.done : !!m.completed) : false;
                        const title = typeof m === 'object' ? (m.text || m.title) : m;
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleMilestone(goal.id, idx)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              padding: '0.3rem 0.5rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: isDone ? 'var(--hover-bg)' : 'transparent'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              readOnly
                              style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                            />
                            <span style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-main)' }}>
                              {title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Goal Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3>{editingGoal ? 'Edit Goal' : 'Define New Goal'}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Goal Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master React & Pass Advanced Algorithms Exam"
                    className="form-control"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Academic">Academic</option>
                      <option value="Career">Career</option>
                      <option value="Skill">Skill</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Completion Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.targetDate}
                      onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Milestones (One per line)</label>
                  <textarea
                    rows="4"
                    placeholder="Step 1: Read syllabus\nStep 2: Submit project\nStep 3: Review mock tests"
                    className="form-control"
                    value={formData.milestones}
                    onChange={e => setFormData({ ...formData, milestones: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingGoal ? 'Save Changes' : 'Create Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
