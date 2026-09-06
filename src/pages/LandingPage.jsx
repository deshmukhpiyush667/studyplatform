import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ToastContainer from '../components/common/ToastContainer';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* Landing Header */}
      <header className="landing-header">
        <div className="landing-nav-container">
          <Link to="/" className="brand-link">
            <img src="/assets/logo.svg" alt="StudyMate Logo" className="brand-logo" />
            <span>Study<span className="brand-highlight">Mate</span></span>
          </Link>

          <nav>
            <ul className="landing-nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Feedback</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>

          <div className="landing-cta-group">
            <button
              className="icon-btn theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Enter App <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-bg"></div>
        <div className="hero-container">
          <div className="hero-badge">
            <i className="fas fa-bolt"></i> The All-in-One Student Workspace
          </div>
          <h1 className="hero-title">
            Plan Your Studies. Track Your Progress. <br />
            <span className="gradient-text">Achieve Your Goals.</span>
          </h1>
          <p className="hero-desc">
            StudyMate unites your smart notes, assignment deadlines, weekly timetable, focus Pomodoro timer, revision quizzes, and GPA tracker into a clean, modern React workspace built for academic excellence.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              <i className="fas fa-rocket"></i> Get Started Free
            </Link>
            <Link to="/login?demo=true" className="btn btn-secondary btn-lg">
              <i className="fas fa-play-circle"></i> Try Instant Demo
            </Link>
          </div>

          {/* Dashboard Preview Card Mockup */}
          <div className="hero-mockup-wrapper">
            <div className="hero-mockup-card">
              <div className="mockup-topbar">
                <span className="mockup-dot red"></span>
                <span className="mockup-dot yellow"></span>
                <span className="mockup-dot green"></span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginLeft: 'auto' }}>
                  studymate.platform/dashboard
                </span>
              </div>
              <div className="mockup-inner">
                <div className="mockup-sidebar">
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
                    <i className="fas fa-graduation-cap"></i> StudyMate Hub
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <div style={{ padding: '0.35rem 0.5rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '6px', fontWeight: 700 }}>
                      <i className="fas fa-th-large"></i> Dashboard
                    </div>
                    <div style={{ padding: '0.35rem 0.5rem' }}><i className="fas fa-tasks"></i> Tasks (6)</div>
                    <div style={{ padding: '0.35rem 0.5rem' }}><i className="fas fa-sticky-note"></i> Notes (5)</div>
                    <div style={{ padding: '0.35rem 0.5rem' }}><i className="fas fa-calendar-alt"></i> Timetable</div>
                    <div style={{ padding: '0.35rem 0.5rem' }}><i className="fas fa-stopwatch"></i> Pomodoro</div>
                    <div style={{ padding: '0.35rem 0.5rem' }}><i className="fas fa-calculator"></i> GPA (3.82)</div>
                  </div>
                </div>
                <div className="mockup-content">
                  <div style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', color: 'white', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Welcome back, Payal! 👋</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>12-Day Study Streak • 3.5 hrs logged today</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PENDING TASKS</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>5 Due</div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STUDY HOURS</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>142.5 hrs</div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SEMESTER GPA</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>3.82 / 4.0</div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Upcoming Assignments</span>
                      <span style={{ color: 'var(--primary)' }}>View All</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
                      <span>DBMS Normalization Assignment #3</span>
                      <span className="badge badge-danger">High</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0' }}>
                      <span>Operating Systems Virtual Memory Lab Report</span>
                      <span className="badge badge-danger">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div>
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Active University Students</div>
            </div>
            <div>
              <div className="stat-number">250,000+</div>
              <div className="stat-label">Productive Study Hours Logged</div>
            </div>
            <div>
              <div className="stat-number">98%</div>
              <div className="stat-label">Students Reported Better Grades</div>
            </div>
            <div>
              <div className="stat-number">4.9 / 5</div>
              <div className="stat-label">Average Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bento Grid */}
      <section id="features" className="section-wrapper">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">Feature Suite</span>
            <h2 className="section-title">Everything You Need to Excel Academically</h2>
            <p className="section-desc">Designed with students, for students. From daily scheduling to finals revision and GPA planning, StudyMate has you covered.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                <i className="fas fa-sticky-note"></i>
              </div>
              <h3 className="feature-title">Smart Notes & Summaries</h3>
              <p className="feature-desc">Create, categorize, tag, and pin your lecture notes. Search across all subjects instantly and mark favorites for quick revision.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: '#fee2e2', color: '#ef4444' }}>
                <i className="fas fa-tasks"></i>
              </div>
              <h3 className="feature-title">Assignments & Deadlines</h3>
              <p className="feature-desc">Prioritize coursework with High, Medium, and Low flags. Intelligent overdue detection ensures no homework falls through the cracks.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: '#d1fae5', color: '#10b981' }}>
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="feature-title">Interactive Timetable</h3>
              <p className="feature-desc">Organize daily and weekly study blocks. Plan lectures, lab sessions, and revision hours with a clean timetable grid.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
                <i className="fas fa-stopwatch"></i>
              </div>
              <h3 className="feature-title">Pomodoro Focus Timer</h3>
              <p className="feature-desc">Beat procrastination with customizable 25-minute focus intervals and structured breaks. Completed sessions automatically build your study streak.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: '#cffafe', color: '#0891b2' }}>
                <i className="fas fa-question-circle"></i>
              </div>
              <h3 className="feature-title">Revision Quizzes</h3>
              <p className="feature-desc">Take interactive multiple-choice quizzes across core subjects. Receive instant score breakdowns and detailed explanations for every question.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                <i className="fas fa-calculator"></i>
              </div>
              <h3 className="feature-title">Marks & GPA Calculator</h3>
              <p className="feature-desc">Calculate your SGPA and CGPA accurately on 4.0 and 10.0 scales. Enter credit weights and letter grades to simulate your academic standing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-wrapper" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">Why StudyMate</span>
            <h2 className="section-title">Built for Real Student Productivity</h2>
            <p className="section-desc">Stop juggling five scattered apps, loose sticky notes, and lost syllabus files.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <i className="fas fa-brain text-primary" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}></i>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Zero Cognitive Overload</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>A single source of truth for assignments, schedules, revision materials, and academic metrics.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <i className="fas fa-fire text-warning" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}></i>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Habit & Streak Gamification</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Unlock productivity badges like “Task Master” and “7-Day Streak” that keep you motivated throughout the semester.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <i className="fas fa-database text-success" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}></i>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>100% Private & Persistent</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>All data saves securely in your browser's LocalStorage. Export and restore full JSON backups anytime with zero data loss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-wrapper">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">Workflow</span>
            <h2 className="section-title">How StudyMate Transforms Your Routine</h2>
            <p className="section-desc">Three simple steps to higher grades and lower study stress.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Plan & Schedule</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Input your semester courses, upcoming assignments, and weekly study blocks into your interactive timetable.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Focus & Revise</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Use the Pomodoro timer to focus deeply on challenging subjects and take MCQ quizzes to test your conceptual recall.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Track & Excel</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>Watch your completion rate climb, log study hours, forecast your final GPA, and crush your semester finals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-wrapper" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">Student Testimonials</span>
            <h2 className="section-title">Loved by Thousands of Undergrads</h2>
            <p className="section-desc">Here is what students say about using StudyMate for their daily academic routine.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="test-stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="test-quote">“StudyMate completely changed how I prepare for exams. Having my operating systems notes, timetable, and Pomodoro timer in one tab saved me at least 5 hours every week.”</p>
              <div className="test-author">
                <div className="test-avatar">SK</div>
                <div>
                  <div className="test-name">Sarah Kim</div>
                  <div className="test-school">Computer Science, Stanford</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="test-stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="test-quote">“The GPA calculator and task priority flags are game changers. I stopped missing deadlines and brought my CGPA from 3.4 up to 3.85 this semester!”</p>
              <div className="test-author">
                <div className="test-avatar" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)' }}>DP</div>
                <div>
                  <div className="test-name">David Patel</div>
                  <div className="test-school">Software Engineering, Georgia Tech</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="test-stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="test-quote">“The revision quizzes with immediate explanations helped me ace my DBMS midterms. The dark mode and slick interface make studying actually enjoyable.”</p>
              <div className="test-author">
                <div className="test-avatar" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>EL</div>
                <div>
                  <div className="test-name">Emily Liu</div>
                  <div className="test-school">Information Systems, UC Berkeley</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-wrapper">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pill">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Quick answers to common questions about StudyMate.</p>
          </div>

          <div className="faq-list">
            {[
              {
                q: "Is StudyMate free to use?",
                a: "Yes! StudyMate is completely free and student-focused. All core features including notes, tasks, study planner, focus timer, revision quizzes, and GPA calculators are available with zero paywalls."
              },
              {
                q: "Will my notes and tasks disappear if I refresh or close my browser?",
                a: "No. StudyMate uses resilient LocalStorage persistence. Everything you create—from notes and tasks to timer logs and semester grades—is safely stored on your device. You can also export a full JSON backup from Settings anytime!"
              },
              {
                q: "Can StudyMate be connected to a Java Spring Boot + MySQL backend?",
                a: "Yes! StudyMate's JavaScript architecture uses clean service repository layers that mirror standard RESTful endpoints (/api/v1/notes, /api/v1/tasks, /api/v1/schedules). You can connect a Spring Boot REST API and MySQL database seamlessly without rewriting frontend logic."
              },
              {
                q: "Does StudyMate work on mobile devices and tablets?",
                a: "Absolutely. StudyMate is crafted with responsive CSS Grid and Flexbox, complete with a collapsible mobile drawer navigation, responsive tables, and touch-friendly controls."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer" style={{ display: openFaq === index ? 'block' : 'none' }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner Section */}
      <section className="section-wrapper" style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 60%, #06b6d4 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '5rem 1.5rem',
        borderRadius: 'var(--radius-lg, 16px)',
        margin: '3rem auto',
        maxWidth: '1200px'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
            Ready to Supercharge Your Academic Success?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.6 }}>
            Join thousands of university students who organize their notes, crush deadlines, and boost their GPA with StudyMate.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="btn btn-primary btn-lg" style={{ backgroundColor: '#fff', color: '#4338ca', fontWeight: 700 }}>
              <i className="fas fa-rocket"></i> Enter App Workspace
            </Link>
            <Link to="/login?demo=true" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.8)', color: '#fff' }}>
              <i className="fas fa-play-circle"></i> Try 1-Click Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand-link">
              <img src="/assets/logo.svg" alt="StudyMate" style={{ width: '32px', height: '32px' }} />
              <span>Study<span className="brand-highlight">Mate</span></span>
            </Link>
            <p>A modern, student-first productivity platform empowering learners to plan, organize, and achieve academic excellence.</p>
          </div>
          <div>
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/notes">Notes Manager</Link></li>
              <li><Link to="/tasks">Assignments & Tasks</Link></li>
              <li><Link to="/planner">Timetable Planner</Link></li>
              <li><Link to="/timer">Pomodoro Focus Timer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Learning Tools</h4>
            <ul className="footer-links">
              <li><Link to="/quiz">Revision Quizzes</Link></li>
              <li><Link to="/gpa">Marks & GPA Calculator</Link></li>
              <li><Link to="/materials">Study Materials</Link></li>
              <li><Link to="/resources">Learning Resources</Link></li>
              <li><Link to="/progress">Analytics & Trends</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Account & Support</h4>
            <ul className="footer-links">
              <li><Link to="/profile">Student Profile</Link></li>
              <li><Link to="/settings">Settings & Backups</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 StudyMate Platform. Built with React &amp; CSS3.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#features" className="text-muted">Privacy Policy</a>
            <a href="#features" className="text-muted">Terms of Service</a>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}
