import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus, subjects } = useStudy();

  const [filterSubject, setFilterSubject] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('due-asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    dueDate: '',
    dueTime: '23:59',
    priority: 'medium',
    status: 'pending',
    description: '',
    tags: ''
  });

  const openCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      subject: subjects[0] || 'Computer Science',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '23:59',
      priority: 'medium',
      status: 'pending',
      description: '',
      tags: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      subject: task.subject,
      dueDate: task.dueDate || '',
      dueTime: task.dueTime || '23:59',
      priority: task.priority || 'medium',
      status: task.status || 'pending',
      description: task.description || '',
      tags: Array.isArray(task.tags) ? task.tags.join(', ') : (task.tags || '')
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskPayload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingTask) {
      updateTask(editingTask.id, taskPayload);
    } else {
      addTask(taskPayload);
    }
    closeModal();
  };

  // Filter and Sort Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const isCompleted = task.completed || task.status === 'completed';
      const matchSubject = filterSubject === 'all' || task.subject === filterSubject;
      const matchPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchStatus = filterStatus === 'all' || 
        (filterStatus === 'completed' && isCompleted) || 
        (filterStatus === 'pending' && !isCompleted) ||
        (task.status === filterStatus);
      const matchSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSubject && matchPriority && matchStatus && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'due-asc') {
        return new Date(`${a.dueDate}T${a.dueTime || '00:00'}`) - new Date(`${b.dueDate}T${b.dueTime || '00:00'}`);
      } else if (sortBy === 'due-desc') {
        return new Date(`${b.dueDate}T${b.dueTime || '00:00'}`) - new Date(`${a.dueDate}T${a.dueTime || '00:00'}`);
      } else if (sortBy === 'priority') {
        const weights = { high: 3, medium: 2, low: 1 };
        return (weights[b.priority] || 0) - (weights[a.priority] || 0);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [tasks, filterSubject, filterPriority, filterStatus, sortBy, searchQuery]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed || t.status === 'completed').length;
    const pending = tasks.filter(t => !t.completed && t.status !== 'completed').length;
    const high = tasks.filter(t => t.priority === 'high' && !t.completed && t.status !== 'completed').length;
    return { total, completed, pending, high };
  }, [tasks]);

  return (
    <div className="tasks-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Tasks & Assignments</h2>
          <p className="text-muted">Track assignments, project milestones, and daily study homework</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <i className="fas fa-plus"></i> New Task
        </button>
      </div>

      {/* Stats row */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon icon-primary"><i className="fas fa-tasks"></i></div>
          <div className="stat-info">
            <h3>{taskStats.total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-warning"><i className="fas fa-clock"></i></div>
          <div className="stat-info">
            <h3>{taskStats.pending}</h3>
            <p>In Progress / Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-danger"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="stat-info">
            <h3>{taskStats.high}</h3>
            <p>High Priority Urgent</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-success"><i className="fas fa-check-circle"></i></div>
          <div className="stat-info">
            <h3>{taskStats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flex: '1 1 300px', gap: '0.75rem' }}>
            <div className="input-with-icon" style={{ flex: 1 }}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <select
              value={filterSubject}
              onChange={e => setFilterSubject(e.target.value)}
              className="form-control"
              style={{ width: 'auto' }}
            >
              <option value="all">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              className="form-control"
              style={{ width: 'auto' }}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="form-control"
              style={{ width: 'auto' }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="form-control"
              style={{ width: 'auto' }}
            >
              <option value="due-asc">Due Date (Earliest First)</option>
              <option value="due-desc">Due Date (Latest First)</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="card">
        <div className="card-body" style={{ padding: '0.5rem 1rem' }}>
          {filteredTasks.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <i className="fas fa-clipboard-check empty-state-icon"></i>
              <h3>No tasks found</h3>
              <p>No tasks match your current filters. Add a new task or modify filters!</p>
              <button className="btn btn-primary" onClick={openCreateModal} style={{ marginTop: '1rem' }}>
                <i className="fas fa-plus"></i> Add New Task
              </button>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map(task => {
                const isOverdue = task.status !== 'completed' && task.dueDate && new Date(`${task.dueDate}T${task.dueTime || '23:59'}`) < new Date();
                const isCompleted = task.status === 'completed';

                return (
                  <div
                    key={task.id}
                    className={`task-row ${isCompleted ? 'completed' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 0.5rem',
                      borderBottom: '1px solid var(--border)',
                      gap: '1rem'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleTaskStatus(task.id)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h4
                          style={{
                            margin: 0,
                            textDecoration: isCompleted ? 'line-through' : 'none',
                            color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                            fontSize: '1rem'
                          }}
                        >
                          {task.title}
                        </h4>
                        <span className={`badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}`}>
                          {task.priority}
                        </span>
                        <span className="badge badge-secondary">{task.subject}</span>
                        {isOverdue && <span className="badge badge-danger">Overdue</span>}
                      </div>

                      {task.description && (
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {task.description}
                        </p>
                      )}

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>
                          <i className="far fa-calendar-alt" style={{ marginRight: '4px' }}></i>
                          Due: {task.dueDate} {task.dueTime ? `at ${task.dueTime}` : ''}
                        </span>
                        {task.tags && task.tags.length > 0 && (
                          <span>
                            <i className="fas fa-tags" style={{ marginRight: '4px' }}></i>
                            {Array.isArray(task.tags) ? task.tags.join(', ') : task.tags}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-sm btn-outline"
                        title="Edit Task"
                        onClick={() => openEditModal(task)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline text-danger"
                        title="Delete Task"
                        onClick={() => deleteTask(task.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Task Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Complete Chapter 4 Exercises"
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
                    <label className="form-label">Priority</label>
                    <select
                      className="form-control"
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Due Date *</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={formData.dueDate}
                      onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.dueTime}
                      onChange={e => setFormData({ ...formData, dueTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description / Instructions</label>
                  <textarea
                    rows="3"
                    placeholder="Add any specific guidelines, links, or notes..."
                    className="form-control"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="homework, lab, reading"
                    className="form-control"
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
