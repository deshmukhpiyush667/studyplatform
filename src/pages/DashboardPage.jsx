import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import { useTheme } from '../context/ThemeContext';
import { TasksService } from '../services/storage';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function DashboardPage() {
  const { profile, tasks, notes, schedule, gpaData, badges, toggleTaskComplete, toggleSessionDone, addTask } = useStudy();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskDueDate, setTaskDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const weeklyChartRef = useRef(null);
  const subjectChartRef = useRef(null);
  const weeklyChartInstance = useRef(null);
  const subjectChartInstance = useRef(null);

  // Greeting
  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // KPIs
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const currentGpa = gpaData.semesters && gpaData.semesters.length > 0 ? gpaData.semesters[0].sgpa : 3.82;

  // Timetable for current day
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[new Date().getDay()];
  let todaySessions = schedule.filter(s => s.day === currentDay);
  if (todaySessions.length === 0) {
    todaySessions = schedule.slice(0, 3);
  }

  // Chart.js initialization
  useEffect(() => {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

    // Weekly Study Hours Bar Chart
    if (weeklyChartRef.current) {
      if (weeklyChartInstance.current) weeklyChartInstance.current.destroy();
      const ctx = weeklyChartRef.current.getContext('2d');
      weeklyChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Study Hours',
            data: [3.5, 4.2, 2.8, 5.0, 4.5, 6.0, 3.5],
            backgroundColor: '#4f46e5',
            borderRadius: 6,
            barThickness: 24
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: textColor, font: { weight: 600 } } },
            y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 2, callback: v => v + 'h' }, beginAtZero: true }
          }
        }
      });
    }

    // Subject Breakdown Doughnut Chart
    if (subjectChartRef.current) {
      if (subjectChartInstance.current) subjectChartInstance.current.destroy();
      const subCtx = subjectChartRef.current.getContext('2d');
      subjectChartInstance.current = new Chart(subCtx, {
        type: 'doughnut',
        data: {
          labels: ['Operating Systems', 'DBMS', 'Algorithms', 'Networks', 'Machine Learning'],
          datasets: [{
            data: [32, 26, 22, 12, 8],
            backgroundColor: ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, boxWidth: 12, font: { size: 11, weight: 600 } }
            }
          }
        }
      });
    }

    return () => {
      if (weeklyChartInstance.current) weeklyChartInstance.current.destroy();
      if (subjectChartInstance.current) subjectChartInstance.current.destroy();
    };
  }, [theme]);

  const handleQuickAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskSubject) return;
    addTask({
      title: taskTitle,
      subject: taskSubject,
      priority: taskPriority,
      dueDate: taskDueDate,
      dueTime: "23:59",
      category: "Assignment"
    });
    setTaskTitle('');
    setTaskSubject('');
    setIsTaskModalOpen(false);
  };

  return (
    <main className="content-body">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>{greeting}, {profile?.name ? profile.name.split(' ')[0] : 'Student'}! 👋</h1>
          <p>Welcome to your study hub. You have upcoming assignments due this week. Keep up the momentum!</p>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.95 }}>
            <i className="far fa-calendar-alt"></i> <span>{todayFormatted}</span>
          </div>
        </div>
        <div className="welcome-stats-pill">
          <div className="welcome-stat-item">
            <div className="welcome-stat-icon"><i className="fas fa-fire" style={{ color: '#fef08a' }}></i></div>
            <div className="welcome-stat-info">
              <span>Current Streak</span>
              <strong>{profile?.studyStreak || 1} Days</strong>
            </div>
          </div>
          <div style={{ width: '1px', height: '35px', background: 'rgba(255, 255, 255, 0.25)' }}></div>
          <div className="welcome-stat-item">
            <div className="welcome-stat-icon"><i className="fas fa-clock" style={{ color: '#67e8f9' }}></i></div>
            <div className="welcome-stat-info">
              <span>Today's Focus</span>
              <strong>{profile?.todayStudyHours || 0} hrs</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="quick-actions-bar">
        <button className="quick-action-item" onClick={() => setIsTaskModalOpen(true)}>
          <div className="quick-action-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <i className="fas fa-plus-circle"></i>
          </div>
          <span className="quick-action-label">Add Task</span>
        </button>

        <Link to="/notes?action=new" className="quick-action-item">
          <div className="quick-action-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
            <i className="fas fa-edit"></i>
          </div>
          <span className="quick-action-label">Create Note</span>
        </Link>

        <Link to="/planner?action=new" className="quick-action-item">
          <div className="quick-action-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <i className="fas fa-calendar-plus"></i>
          </div>
          <span className="quick-action-label">Add Session</span>
        </Link>

        <Link to="/timer" className="quick-action-item">
          <div className="quick-action-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            <i className="fas fa-play"></i>
          </div>
          <span className="quick-action-label">Start Timer</span>
        </Link>

        <Link to="/quiz" className="quick-action-item">
          <div className="quick-action-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            <i className="fas fa-spell-check"></i>
          </div>
          <span className="quick-action-label">Take Quiz</span>
        </Link>

        <Link to="/goals?action=new" className="quick-action-item">
          <div className="quick-action-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
            <i className="fas fa-bullseye"></i>
          </div>
          <span className="quick-action-label">Add Goal</span>
        </Link>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="stats-cards-grid">
        <div className="metric-card">
          <div className="metric-data">
            <div className="metric-label">Tasks & Deadlines</div>
            <div className="metric-value">{totalTasks}</div>
            <div className="metric-trend text-warning">
              <i className="fas fa-spinner"></i> {completionRate}% Complete
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <i className="fas fa-tasks"></i>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-data">
            <div className="metric-label">Completed Tasks</div>
            <div className="metric-value">{completedTasks}</div>
            <div className="metric-trend text-success">
              <i className="fas fa-check-circle"></i> On Track
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            <i className="fas fa-clipboard-check"></i>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-data">
            <div className="metric-label">Total Study Hours</div>
            <div className="metric-value">{profile?.totalStudyHours || 0}h</div>
            <div className="metric-trend text-primary">
              <i className="fas fa-chart-line"></i> +12.5h this week
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <i className="fas fa-clock"></i>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-data">
            <div className="metric-label">Current CGPA</div>
            <div className="metric-value">{Number(currentGpa).toFixed(2)}</div>
            <div className="metric-trend text-success">
              <i className="fas fa-star"></i> High Honors
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
            <i className="fas fa-award"></i>
          </div>
        </div>
      </div>

      {/* Main Dashboard 2-Column Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-col">
          {/* Weekly Study Hours Chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="fas fa-chart-bar text-primary"></i> Weekly Study Distribution
              </div>
              <Link to="/progress" className="btn btn-sm btn-outline">
                Detailed Analytics <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="card-body">
              <div style={{ height: '250px', position: 'relative' }}>
                <canvas ref={weeklyChartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Today's Timetable Widget */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="fas fa-calendar-day text-primary"></i> Today's Schedule & Sessions
              </div>
              <Link to="/planner" className="btn btn-sm btn-secondary">Open Planner</Link>
            </div>
            <div className="card-body">
              {todaySessions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                  <i className="fas fa-mug-hot" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem', display: 'block' }}></i>
                  <p style={{ fontWeight: 600 }}>No sessions scheduled for today</p>
                  <Link to="/planner" className="btn btn-sm btn-outline" style={{ marginTop: '0.75rem' }}>Plan A Session</Link>
                </div>
              ) : (
                <div className="timeline-list">
                  {todaySessions.map(s => (
                    <div
                      key={s.id}
                      className="timeline-item"
                      style={{
                        borderLeftColor: s.isDone ? 'var(--success)' : 'var(--primary)',
                        opacity: s.isDone ? 0.6 : 1
                      }}
                    >
                      <div className="timeline-time">{s.startTime} - {s.endTime}</div>
                      <div className="timeline-details">
                        <div className="timeline-subject">{s.subject}</div>
                        <div className="timeline-activity">{s.activity}</div>
                      </div>
                      <button
                        className={`btn btn-sm ${s.isDone ? 'btn-success' : 'btn-secondary'}`}
                        onClick={() => toggleSessionDone(s.id)}
                        title={s.isDone ? 'Mark Undone' : 'Mark Completed'}
                      >
                        <i className={`fas ${s.isDone ? 'fa-check' : 'fa-circle'}`}></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subject Breakdown Doughnut */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="fas fa-pie-chart text-secondary"></i> Subject Focus Distribution
              </div>
            </div>
            <div className="card-body">
              <div style={{ height: '220px', position: 'relative' }}>
                <canvas ref={subjectChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-col">
          {/* Upcoming Deadlines */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="fas fa-exclamation-circle text-danger"></i> Upcoming Deadlines
              </div>
              <Link to="/tasks" className="btn btn-sm btn-outline">All Tasks</Link>
            </div>
            <div className="card-body">
              {pendingTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                  <i className="fas fa-calendar-check" style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '0.5rem', display: 'block' }}></i>
                  <p style={{ fontWeight: 600 }}>All caught up!</p>
                  <span style={{ fontSize: '0.8rem' }}>No pending assignments or tasks due soon.</span>
                </div>
              ) : (
                <div className="deadline-list">
                  {pendingTasks.slice(0, 4).map(t => {
                    const overdue = TasksService.isOverdue(t);
                    return (
                      <div key={t.id} className="deadline-item">
                        <div className="deadline-check" onClick={() => toggleTaskComplete(t.id)}>
                          <i className="far fa-circle"></i>
                        </div>
                        <div className="deadline-main">
                          <div className="deadline-title">{t.title}</div>
                          <div className="deadline-meta">
                            <span><i className="fas fa-book-open"></i> {t.subject}</span>
                            <span><i className="far fa-clock"></i> {t.dueDate} {t.dueTime || ''}</span>
                            {overdue && (
                              <span className="overdue-badge"><i className="fas fa-exclamation-triangle"></i> Overdue</span>
                            )}
                          </div>
                        </div>
                        <span className={`priority-pill ${t.priority || 'medium'}`}>{t.priority?.toUpperCase()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Notes Widget */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="fas fa-sticky-note text-warning"></i> Recent Study Notes
              </div>
              <Link to="/notes" className="btn btn-sm btn-secondary">Browse All</Link>
            </div>
            <div className="card-body">
              {notes.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', padding: '1rem' }}>
                  No notes yet. Create your first note!
                </p>
              ) : (
                <div className="recent-notes-grid">
                  {notes.slice(0, 2).map(n => (
                    <div
                      key={n.id}
                      className="recent-note-card"
                      onClick={() => navigate('/notes')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{n.subject}</span>
                        {n.isPinned && <i className="fas fa-thumbtack text-primary" style={{ fontSize: '0.75rem' }}></i>}
                      </div>
                      <div className="recent-note-title">{n.title}</div>
                      <div className="recent-note-snippet">{n.content?.replace(/#|\*|`/g, '')}</div>
                      <div className="recent-note-footer">
                        <span><i className="far fa-calendar"></i> {new Date(n.createdAt).toLocaleDateString()}</span>
                        <span>View <i className="fas fa-arrow-right"></i></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Productivity Badges Preview */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="fas fa-trophy text-warning"></i> Productivity Badges
              </div>
              <Link to="/profile" className="btn btn-sm btn-outline">All Badges</Link>
            </div>
            <div className="card-body">
              <div className="badges-container">
                {badges.slice(0, 5).map(b => (
                  <div
                    key={b.id}
                    className={`badge-card ${b.unlocked ? '' : 'locked'}`}
                    title={`${b.title}: ${b.desc}`}
                  >
                    <div className="badge-icon" style={{ color: b.color }}>
                      <i className={`fas ${b.icon}`}></i>
                    </div>
                    <div className="badge-title">{b.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Task Modal */}
      {isTaskModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsTaskModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title"><i className="fas fa-plus-circle text-primary"></i> Quick Add Task</h3>
              <button className="modal-close" onClick={() => setIsTaskModalOpen(false)}><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleQuickAddTask}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Task Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Complete chapter 5 exercise"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Operating Systems"
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
