import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useStudy } from '../context/StudyContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('Semester 1');
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useStudy();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register({ name, email, course, semester, college, password });
    if (res.success) {
      addToast(`Welcome to StudyMate, ${name}! Your workspace is ready.`, 'success');
      navigate('/dashboard');
    } else {
      addToast(res.message, 'error');
    }
  };

  return (
    <div className="auth-page-wrapper" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
      {/* Left Banner */}
      <div className="auth-banner-side" style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 60%, #06b6d4 100%)',
        color: 'white',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Link to="/" className="brand-link" style={{ color: 'white' }}>
          <img src="/assets/logo.svg" alt="StudyMate" style={{ width: '38px', height: '38px' }} />
          <span style={{ fontSize: '1.4rem' }}>Study<span style={{ color: '#67e8f9' }}>Mate</span></span>
        </Link>

        <div>
          <div className="badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', marginBottom: '1rem' }}>
            <i className="fas fa-user-plus"></i> Join StudyMate
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem' }}>
            Build good study habits and achieve higher grades this semester.
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '1.05rem', opacity: 0.95 }}>
            <li><i className="fas fa-check-circle" style={{ color: '#34d399', marginRight: '0.5rem' }}></i> Smart note organizer with tags & favorites</li>
            <li><i className="fas fa-check-circle" style={{ color: '#34d399', marginRight: '0.5rem' }}></i> Timetable and overdue assignment alerts</li>
            <li><i className="fas fa-check-circle" style={{ color: '#34d399', marginRight: '0.5rem' }}></i> Built-in Pomodoro focus timer & quiz revision</li>
            <li><i className="fas fa-check-circle" style={{ color: '#34d399', marginRight: '0.5rem' }}></i> SGPA & CGPA academic calculator</li>
          </ul>
        </div>

        <div style={{ fontSize: '0.88rem', opacity: 0.75 }}>
          &copy; 2026 StudyMate Platform • Modern Study Management
        </div>
      </div>

      {/* Right Form */}
      <div className="auth-form-side" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 5rem',
        backgroundColor: 'var(--bg-surface)',
        overflowY: 'auto'
      }}>
        <div className="auth-box" style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Link to="/" className="brand-link">
              <img src="/assets/logo.svg" alt="StudyMate" style={{ width: '32px', height: '32px' }} />
              <span>Study<span className="brand-highlight">Mate</span></span>
            </Link>
            <button
              className="icon-btn theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
              type="button"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
            Create Student Account
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Set up your personalized student workspace in seconds.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Payal Deshmukh"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">University Email *</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. payal@university.edu"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Course / Degree *</label>
                <input
                  type="text"
                  className="form-control"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. Computer Science"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Semester / Year</label>
                <input
                  type="text"
                  className="form-control"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  placeholder="e.g. Semester 6"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">University / Institute</label>
              <input
                type="text"
                className="form-control"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Stanford University"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: '1rem', marginBottom: '1.25rem' }}
            >
              Complete Registration &amp; Enter <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: 700 }}>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
