import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useStudy } from '../context/StudyContext';
import { StorageService } from '../services/storage';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { refreshData } = useStudy();

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [timerSound, setTimerSound] = useState(true);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  // Export JSON backup
  const handleExportData = () => {
    const data = StorageService.exportAllData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StudyMate_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleImportFile = (e) => {
    setImportError('');
    setImportSuccess('');
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const success = StorageService.importAllData(parsed);
        if (success) {
          setImportSuccess('Data imported successfully! Reloading workspace...');
          setTimeout(() => {
            refreshData();
            setImportSuccess('');
          }, 1200);
        } else {
          setImportError('Invalid backup file structure.');
        }
      } catch (err) {
        setImportError('Failed to parse JSON file. Please ensure it is a valid StudyMate export.');
      }
    };
    reader.readAsText(file);
  };

  // Reset to initial seed demo data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data back to factory demo state? Any unsaved custom items will be replaced.')) {
      StorageService.clearAll();
      refreshData();
      alert('Data reset to default demo values.');
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Application Settings & Preferences</h2>
        <p className="text-muted">Customize your UI theme, notifications, LocalStorage data backup, and backend integration settings</p>
      </div>

      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Appearance Card */}
        <div className="card">
          <div className="card-header">
            <h3>Appearance & Interface</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h4 style={{ margin: 0 }}>Theme Mode</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Current: <strong>{theme === 'dark' ? 'Dark Mode (Moon)' : 'Light Mode (Sun)'}</strong>
                </p>
              </div>
              <button className="btn btn-outline" onClick={toggleTheme}>
                <i className={`fas ${theme === 'dark' ? 'fa-sun text-warning' : 'fa-moon text-primary'}`}></i> Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h4 style={{ margin: 0 }}>Timer Audio Chime</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Play a gentle audio alert when Pomodoro study cycles end
                </p>
              </div>
              <input
                type="checkbox"
                checked={timerSound}
                onChange={e => setTimerSound(e.target.checked)}
                style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0' }}>
              <div>
                <h4 style={{ margin: 0 }}>Push & In-App Toast Notifications</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Display notification toasts for upcoming tasks, timetable sessions, and achievements
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationEnabled}
                onChange={e => setNotificationEnabled(e.target.checked)}
                style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
            </div>
          </div>
        </div>

        {/* Data Backup, Export & Import */}
        <div className="card">
          <div className="card-header">
            <h3>Data Management & Offline Backup</h3>
          </div>
          <div className="card-body">
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Your study notes, assignments, timetable, and quizzes are securely stored in your browser's LocalStorage. You can export a portable JSON backup or restore past records anytime.
            </p>

            {importSuccess && (
              <div className="badge badge-success" style={{ display: 'block', padding: '0.75rem', marginBottom: '1rem', textAlign: 'left', fontSize: '0.9rem' }}>
                <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> {importSuccess}
              </div>
            )}
            {importError && (
              <div className="badge badge-danger" style={{ display: 'block', padding: '0.75rem', marginBottom: '1rem', textAlign: 'left', fontSize: '0.9rem' }}>
                <i className="fas fa-exclamation-triangle" style={{ marginRight: '6px' }}></i> {importError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button className="btn btn-primary" onClick={handleExportData}>
                <i className="fas fa-download"></i> Export JSON Backup
              </button>

              <label className="btn btn-outline" style={{ cursor: 'pointer', margin: 0 }}>
                <i className="fas fa-upload"></i> Restore from JSON
                <input
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={handleImportFile}
                />
              </label>

              <button className="btn btn-outline text-danger" onClick={handleResetData}>
                <i className="fas fa-trash-restore"></i> Reset to Factory Demo Data
              </button>
            </div>
          </div>
        </div>

        {/* Java Spring Boot + MySQL Integration Guide */}
        <div className="card">
          <div className="card-header">
            <h3>Future Backend Architecture (Spring Boot + MySQL)</h3>
          </div>
          <div className="card-body">
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              This React application is architected with a decoupled service layer. When transitioning from LocalStorage to a Java Spring Boot REST API, simply configure the endpoints below:
            </p>

            <div style={{ background: 'var(--hover-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <div>// Example Spring Boot Controller Mapping:</div>
              <div style={{ color: 'var(--primary)', marginTop: '4px' }}>POST /api/v1/auth/login</div>
              <div style={{ color: 'var(--primary)' }}>GET  /api/v1/tasks (Pageable, Sort)</div>
              <div style={{ color: 'var(--primary)' }}>POST /api/v1/tasks</div>
              <div style={{ color: 'var(--primary)' }}>GET  /api/v1/timetable</div>
              <div style={{ color: 'var(--primary)' }}>POST /api/v1/quizzes/submit</div>
              <div style={{ color: 'var(--primary)' }}>GET  /api/v1/gpa/semesters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
