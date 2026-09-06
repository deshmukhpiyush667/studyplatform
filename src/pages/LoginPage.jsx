import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useStudy } from '../context/StudyContext';

export default function LoginPage() {
  const [email, setEmail] = useState('payal.deshmukh@university.edu');
  const [password, setPassword] = useState('studymate123');
  const [remember, setRemember] = useState(true);

  const { login, useDemoAccount } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useStudy();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('demo') === 'true') {
      handleDemoLogin();
    }
  }, [searchParams]);

  const handleDemoLogin = () => {
    useDemoAccount();
    addToast('Logged in as Payal Deshmukh (Demo Account)!', 'success');
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate('/dashboard');
    } else {
      addToast(res.message, 'error');
    }
  };

  return (
    <div className="auth-page-wrapper" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
      {/* Left Hero Banner Side */}
      <div className="auth-banner-side" style={{
        background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 60%, #06b6d4 100%)',
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
            <i className="fas fa-sparkles"></i> Academic Productivity
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem' }}>
            Take control of your studies, one focused session at a time.
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '500px' }}>
            Join thousands of university students organizing notes, tracking assignments, and boosting their GPA with StudyMate.
          </p>
        </div>

        <div style={{ fontSize: '0.88rem', opacity: 0.75 }}>
          &copy; 2026 StudyMate Platform • Modern Study Management
        </div>
      </div>

      {/* Right Form Side */}
      <div className="auth-form-side" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem 5rem',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <div className="auth-box" style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
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

          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Student Log In
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Enter your university credentials to access your dashboard.
          </p>

          {/* 1-Click Demo Account Quick Button */}
          <div style={{
            background: 'var(--bg-surface-subtle)',
            border: '1px dashed var(--primary)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.35rem' }}>
              EVALUATING STUDYMATE?
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Instant one-click access with pre-filled realistic engineering student data.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={handleDemoLogin}
            >
              <i className="fas fa-user-graduate"></i> Log In As Demo Student (Payal Deshmukh)
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="payal.deshmukh@university.edu"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                /> Remember me
              </label>
              <button
                type="button"
                onClick={() => addToast('Password reset link simulated to university email', 'info')}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              style={{ marginBottom: '1.5rem' }}
            >
              Log In <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ fontWeight: 700 }}>Sign Up Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
