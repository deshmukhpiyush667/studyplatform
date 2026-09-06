import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { notes, tasks, profile } = useStudy();
  const navigate = useNavigate();

  const pendingTasksCount = tasks.filter(t => !t.completed).length;
  const notesCount = notes.length;

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="brand-link" onClick={onClose}>
            <img src="/assets/logo.svg" alt="StudyMate Logo" className="brand-logo" />
            <span>Study<span className="brand-highlight">Mate</span></span>
          </NavLink>
        </div>

        <div className="sidebar-nav-container">
          {/* Main Group */}
          <div>
            <div className="nav-group-title">Main</div>
            <ul className="nav-list">
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-th-large"></i> <span>Dashboard</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Academics Group */}
          <div>
            <div className="nav-group-title">Academics</div>
            <ul className="nav-list">
              <li>
                <NavLink to="/notes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-sticky-note"></i> <span>Notes & Summaries</span>
                  {notesCount > 0 && <span className="nav-badge">{notesCount}</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/tasks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-tasks"></i> <span>Tasks & Assignments</span>
                  {pendingTasksCount > 0 && <span className="nav-badge warning">{pendingTasksCount}</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/planner" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-calendar-alt"></i> <span>Study Planner</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/materials" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-folder-open"></i> <span>Study Materials</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/resources" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-graduation-cap"></i> <span>Learning Resources</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Performance & Tools */}
          <div>
            <div className="nav-group-title">Performance & Tools</div>
            <ul className="nav-list">
              <li>
                <NavLink to="/goals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-bullseye"></i> <span>Study Goals</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/progress" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-chart-line"></i> <span>Progress Tracking</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/timer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-stopwatch"></i> <span>Pomodoro Timer</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/quiz" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-spell-check"></i> <span>Revision Quizzes</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/gpa" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-calculator"></i> <span>Marks & GPA</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <div className="nav-group-title">Account</div>
            <ul className="nav-list">
              <li>
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-user-circle"></i> <span>Student Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                  <i className="fas fa-cog"></i> <span>Settings & Data</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/#faq" className="nav-link" onClick={onClose}>
                  <i className="fas fa-question-circle"></i> <span>Help & FAQ</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user-card" onClick={() => { onClose(); navigate('/profile'); }}>
            <div className="user-avatar">{profile?.avatar || 'PD'}</div>
            <div className="user-info">
              <div className="user-name">{profile?.name || user?.name || 'Payal Deshmukh'}</div>
              <div className="user-role">{profile?.course || 'B.Tech CSE'}</div>
            </div>
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.4rem' }}
              title="Log Out"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
