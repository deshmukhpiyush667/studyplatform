import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';

export default function TimerPage() {
  const { timerSessions, saveTimerSession, subjects } = useStudy();

  const [mode, setMode] = useState('pomodoro'); // pomodoro (25), shortBreak (5), longBreak (15)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || 'Computer Science');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalDuration, setTotalDuration] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const timerRef = useRef(null);

  // Switch modes
  const switchMode = (newMode) => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setMode(newMode);

    let minutes = 25;
    if (newMode === 'shortBreak') minutes = 5;
    if (newMode === 'longBreak') minutes = 15;

    setTimeLeft(minutes * 60);
    setTotalDuration(minutes * 60);
  };

  // Play audio chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (err) {
      console.warn('Audio playback error', err);
    }
  };

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playChime();

            // Save completed session if pomodoro
            if (mode === 'pomodoro') {
              setCyclesCompleted(c => c + 1);
              saveTimerSession({
                duration: totalDuration / 60,
                subject: selectedSubject,
                timestamp: new Date().toISOString()
              });
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, totalDuration, selectedSubject]);

  const toggleStartPause = () => {
    setIsRunning(r => !r);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTimeLeft(totalDuration);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SVG Circular progress
  const strokeDashoffset = 440 - (440 * (totalDuration - timeLeft)) / totalDuration;

  return (
    <div className="timer-page">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2>Pomodoro Focus & Study Timer</h2>
        <p className="text-muted">Eliminate distractions using scientifically proven 25-minute intervals</p>
      </div>

      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
          {/* Mode Tabs */}
          <div style={{ display: 'inline-flex', background: 'var(--hover-bg)', borderRadius: '24px', padding: '4px', marginBottom: '1.5rem' }}>
            <button
              className={`btn btn-sm ${mode === 'pomodoro' ? 'btn-primary' : 'btn-text'}`}
              style={{ borderRadius: '20px', padding: '0.4rem 1.25rem' }}
              onClick={() => switchMode('pomodoro')}
            >
              Pomodoro (25m)
            </button>
            <button
              className={`btn btn-sm ${mode === 'shortBreak' ? 'btn-primary' : 'btn-text'}`}
              style={{ borderRadius: '20px', padding: '0.4rem 1.25rem' }}
              onClick={() => switchMode('shortBreak')}
            >
              Short Break (5m)
            </button>
            <button
              className={`btn btn-sm ${mode === 'longBreak' ? 'btn-primary' : 'btn-text'}`}
              style={{ borderRadius: '20px', padding: '0.4rem 1.25rem' }}
              onClick={() => switchMode('longBreak')}
            >
              Long Break (15m)
            </button>
          </div>

          {/* Subject Selector for Session */}
          {mode === 'pomodoro' && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Focus Subject:</span>
              <select
                className="form-control"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                style={{ width: 'auto', display: 'inline-block' }}
                disabled={isRunning}
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          {/* Circular Countdown Display */}
          <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 1.5rem auto' }}>
            <svg width="220" height="220" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--border)"
                strokeWidth="8"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="8"
                strokeDasharray="440"
                strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 700, fontFamily: 'monospace' }}>
                {formatTime(timeLeft)}
              </h1>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {isRunning ? 'Focusing...' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              className={`btn btn-lg ${isRunning ? 'btn-warning' : 'btn-primary'}`}
              style={{ minWidth: '130px' }}
              onClick={toggleStartPause}
            >
              <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'}`} style={{ marginRight: '6px' }}></i>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="btn btn-lg btn-outline" onClick={resetTimer}>
              <i className="fas fa-undo" style={{ marginRight: '6px' }}></i> Reset
            </button>
          </div>

          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Completed today: <strong>{cyclesCompleted} Pomodoro cycles</strong> ({cyclesCompleted * 25} focused mins)
          </p>
        </div>

        {/* Recent Focus History */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header">
            <h3>Recent Focus Sessions</h3>
          </div>
          <div className="card-body" style={{ padding: '0.5rem 1rem' }}>
            {timerSessions.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem 0' }}>
                No completed sessions yet. Start your first focus interval above!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {timerSessions.slice(0, 5).map((session, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 0',
                      borderBottom: idx !== timerSessions.slice(0, 5).length - 1 ? '1px solid var(--border)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="stat-icon icon-primary" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{session.subject}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {new Date(session.timestamp).toLocaleDateString()} at {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <span className="badge badge-success">+{session.duration} mins</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
