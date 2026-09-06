import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { profile, updateProfile, stats } = useStudy();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || 'Payal Deshmukh',
    email: profile.email || 'payal.deshmukh@university.edu',
    major: profile.major || 'Computer Science & Software Engineering',
    university: profile.university || 'State Tech University',
    bio: profile.bio || 'Honors student interested in Distributed Systems, React frontend architecture, and AI.',
    studyGoalHours: profile.studyGoalHours || 30
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const badges = profile.badges || [];

  return (
    <div className="profile-page">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Student Profile & Achievements</h2>
        <p className="text-muted">Manage your personal academic identity, focus goals, and unlock gamified badges</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Profile Card */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                fontSize: '2rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {(formData.name || 'Payal Deshmukh').split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0' }}>{formData.name}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{formData.email}</p>
              <span className="badge badge-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                {formData.major}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>University / College:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontWeight: 500 }}>{formData.university}</p>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bio / Summary:</strong>
              <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)' }}>{formData.bio}</p>
            </div>
            <div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Weekly Study Goal:</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontWeight: 500 }}>{formData.studyGoalHours} hrs / week</p>
            </div>
          </div>

          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setIsEditing(true)}>
            <i className="fas fa-user-edit"></i> Edit Profile Info
          </button>
        </div>

        {/* Academic Stats summary */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ margin: '0 0 1.25rem 0' }}>Academic Highlights</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--hover-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Focus Hours Logged</span>
              <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--primary)' }}>{stats.studyHours || '32.5'} hrs</h2>
            </div>
            <div style={{ padding: '1rem', background: 'var(--hover-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tasks Completed</span>
              <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--success)' }}>{stats.tasksCompleted || '18'}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'var(--hover-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current GPA</span>
              <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--warning)' }}>{stats.currentGpa || '3.88'}</h2>
            </div>
            <div style={{ padding: '1rem', background: 'var(--hover-bg)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Badges Unlocked</span>
              <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--info)' }}>
                {badges.filter(b => b.unlocked).length} / {badges.length}
              </h2>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <i className="fas fa-shield-alt text-primary" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <h5 style={{ margin: 0 }}>Spring Boot Account Sync</h5>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Active user: <strong>{user?.name || 'Payal Deshmukh'}</strong>. Prepared for JWT MySQL cloud sync.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gamified Achievements & Badges */}
      <div className="card">
        <div className="card-header">
          <h3>Achievements & Milestones ({badges.filter(b => b.unlocked).length} Unlocked)</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {badges.map(badge => (
              <div
                key={badge.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${badge.unlocked ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: badge.unlocked ? 'var(--hover-bg)' : 'var(--card-bg)',
                  opacity: badge.unlocked ? 1 : 0.55,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: badge.unlocked ? 'var(--primary)' : 'var(--border)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '0.75rem'
                  }}
                >
                  <i className={`fas ${badge.icon || 'fa-award'}`}></i>
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{badge.name}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{badge.description}</p>
                <span
                  className={`badge ${badge.unlocked ? 'badge-success' : 'badge-secondary'}`}
                  style={{ marginTop: '0.75rem', fontSize: '0.7rem' }}
                >
                  {badge.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-overlay active" onClick={() => setIsEditing(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3>Edit Student Profile</h3>
              <button className="modal-close" onClick={() => setIsEditing(false)}>&times;</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Major / Field of Study</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={formData.major}
                    onChange={e => setFormData({ ...formData, major: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">University / Institution</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.university}
                    onChange={e => setFormData({ ...formData, university: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Weekly Study Goal (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    className="form-control"
                    value={formData.studyGoalHours}
                    onChange={e => setFormData({ ...formData, studyGoalHours: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Student Bio</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
