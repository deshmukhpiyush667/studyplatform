import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useStudy } from '../../context/StudyContext';

export default function Topbar({ onToggleMobileSidebar, onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();
  const { profile, notifications, markAllNotificationsRead } = useStudy();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-btn"
          aria-label="Toggle Navigation"
          onClick={onToggleMobileSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="search-trigger" onClick={onOpenSearch}>
          <i className="fas fa-search"></i>
          <span>Search notes, tasks, materials...</span>
          <kbd className="search-kbd">Ctrl K</kbd>
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick Add Button */}
        <button className="quick-add-btn" onClick={() => navigate('/tasks?action=new')}>
          <i className="fas fa-plus"></i> <span>Add Task</span>
        </button>

        {/* Theme Switcher */}
        <button
          className="icon-btn theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="icon-btn"
            onClick={(e) => { e.stopPropagation(); setShowNotifs(!showNotifs); }}
            title="Notifications"
            aria-label="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="badge-dot"></span>}
          </button>

          {showNotifs && (
            <div className="dropdown-menu active" style={{ width: '320px', right: 0 }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  Notifications ({unreadCount} unread)
                </span>
                {unreadCount > 0 && (
                  <button
                    className="btn btn-sm btn-outline"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => markAllNotificationsRead()}
                  >
                    Mark Read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '0.5rem' }}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className="dropdown-item"
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-md)',
                        opacity: n.read ? 0.6 : 1,
                        backgroundColor: !n.read ? 'var(--bg-surface-subtle)' : 'transparent',
                        marginBottom: '0.25rem'
                      }}
                    >
                      <i className="fas fa-bell text-primary" style={{ marginTop: '2px' }}></i>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{n.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{n.message}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>{n.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Pill */}
        <button
          onClick={() => navigate('/profile')}
          className="icon-btn"
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer'
          }}
          title="View Profile"
        >
          {profile?.avatar || 'AJ'}
        </button>
      </div>
    </header>
  );
}
