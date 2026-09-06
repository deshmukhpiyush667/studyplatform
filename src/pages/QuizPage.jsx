import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';

const SUBJECT_ICONS = {
  'quiz_dsa': { icon: 'fa-sitemap', color: '#4f46e5', bg: '#e0e7ff' },
  'quiz_os': { icon: 'fa-microchip', color: '#06b6d4', bg: '#cffafe' },
  'quiz_dbms': { icon: 'fa-database', color: '#8b5cf6', bg: '#ede9fe' },
  'quiz_cn': { icon: 'fa-network-wired', color: '#2563eb', bg: '#dbeafe' },
  'quiz_se': { icon: 'fa-code-branch', color: '#059669', bg: '#d1fae5' },
  'quiz_python': { icon: 'fa-terminal', color: '#d97706', bg: '#fef3c7' },
  'quiz_math': { icon: 'fa-square-root-alt', color: '#db2777', bg: '#fce7f3' }
};

export default function QuizPage() {
  const { quizzes, quizHistory, saveQuizResult } = useStudy();

  const [screen, setScreen] = useState('select'); // 'select', 'play', 'result'
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const timerRef = useRef(null);

  // Live Timer during quiz
  useEffect(() => {
    if (screen === 'play') {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimerSeconds(0);
    setScreen('play');
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleNext = () => {
    if (!currentQuiz) return;
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(idx => idx + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(idx => idx - 1);
    }
  };

  const handleCancelQuiz = () => {
    if (window.confirm('Are you sure you want to exit? Your quiz progress will be lost.')) {
      setScreen('select');
      setCurrentQuiz(null);
    }
  };

  const handleSubmitQuiz = () => {
    if (!currentQuiz) return;

    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      const selected = userAnswers[q.id];
      const correct = q.correct !== undefined ? q.correct : q.correctAnswer;
      if (selected === correct) {
        correctCount += 1;
      }
    });

    const total = currentQuiz.questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    const resultRecord = {
      quizSubject: currentQuiz.subject,
      subject: currentQuiz.subject,
      score: correctCount,
      totalQuestions: total,
      percentage: percentage,
      date: new Date().toISOString()
    };

    saveQuizResult(resultRecord);
    setLastResult({
      ...resultRecord,
      quiz: currentQuiz,
      answers: { ...userAnswers },
      timeTaken: formatTimer(timerSeconds)
    });
    setScreen('result');
  };

  const currentQ = currentQuiz ? currentQuiz.questions[currentQuestionIndex] : null;
  const isLastQuestion = currentQuiz && currentQuestionIndex === currentQuiz.questions.length - 1;
  const isOptionSelected = currentQ && userAnswers[currentQ.id] !== undefined;

  return (
    <div className="quiz-page-container">
      {/* SCREEN 1: SELECT QUIZ & HISTORY */}
      {screen === 'select' && (
        <div id="quiz-select-screen">
          <div className="page-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 className="page-title">Revision Quizzes & Practice</h1>
              <p className="page-subtitle">Test your memory and grasp of core subjects with instant MCQs and explanation reviews.</p>
            </div>
          </div>

          {/* Subject Quiz Cards Grid */}
          <div className="quiz-categories-grid" style={{ marginBottom: '2.5rem' }}>
            {quizzes.map(q => {
              const iconConf = SUBJECT_ICONS[q.id] || { icon: 'fa-question-circle', color: '#10b981', bg: '#d1fae5' };
              const qCount = q.questions ? q.questions.length : 32;

              return (
                <div
                  key={q.id}
                  className="quiz-cat-card"
                  onClick={() => handleStartQuiz(q)}
                >
                  <div className="quiz-cat-icon" style={{ backgroundColor: iconConf.bg, color: iconConf.color }}>
                    <i className={`fas ${iconConf.icon}`}></i>
                  </div>
                  <div className="quiz-cat-title">{q.title}</div>
                  <div className="quiz-cat-desc">{q.description}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      <i className="fas fa-list-ol"></i> {qCount} Questions
                    </span>
                    <span className="btn btn-sm btn-primary">
                      Start Quiz <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Previous Quiz Attempts Table */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-history text-primary"></i> Previous Quiz Attempts
              </h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <table className="table gpa-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Score</th>
                      <th>Accuracy</th>
                      <th>Date Taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizHistory.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                          No quiz history recorded yet. Choose a subject above to start practicing!
                        </td>
                      </tr>
                    ) : (
                      quizHistory.map((item, idx) => (
                        <tr key={item.id || idx}>
                          <td><strong>{item.quizSubject || item.subject}</strong></td>
                          <td>
                            <strong>{item.score} / {item.totalQuestions || 32}</strong>
                          </td>
                          <td>
                            <span className={`badge badge-${(item.percentage || 0) >= 80 ? 'success' : (item.percentage || 0) >= 60 ? 'warning' : 'danger'}`}>
                              {item.percentage !== undefined ? item.percentage : Math.round((item.score / (item.totalQuestions || 32)) * 100)}%
                            </span>
                          </td>
                          <td>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: ACTIVE QUIZ PLAY */}
      {screen === 'play' && currentQuiz && currentQ && (
        <div className="quiz-play-wrapper">
          <div className="quiz-question-box">
            {/* Header progress */}
            <div className="quiz-progress-header">
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
                  {currentQuiz.subject}
                </span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-warning" style={{ fontSize: '0.82rem' }}>
                  <i className="far fa-clock"></i> {formatTimer(timerSeconds)}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-bar-container" style={{ marginBottom: '1.75rem', height: '6px' }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h2 className="quiz-question-title">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const letters = ['A', 'B', 'C', 'D', 'E'];

                return (
                  <div
                    key={idx}
                    className={`quiz-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                  >
                    <span className="quiz-opt-letter">{letters[idx]}</span>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <button className="btn btn-secondary btn-sm" onClick={handleCancelQuiz}>
                <i className="fas fa-times"></i> Cancel Quiz
              </button>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className="btn btn-secondary"
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePrev}
                >
                  <i className="fas fa-arrow-left"></i> Previous
                </button>
                {!isLastQuestion ? (
                  <button
                    className="btn btn-primary"
                    disabled={!isOptionSelected}
                    onClick={handleNext}
                  >
                    Next <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    disabled={!isOptionSelected}
                    onClick={handleSubmitQuiz}
                  >
                    <i className="fas fa-check-circle"></i> Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: RESULTS & EXPLANATIONS */}
      {screen === 'result' && lastResult && (
        <div className="quiz-play-wrapper">
          <div className="card quiz-result-card" style={{ marginBottom: '2rem' }}>
            <div className="quiz-score-circle">
              <div className="quiz-score-num">{lastResult.percentage}%</div>
              <div className="quiz-score-label">
                {lastResult.score} / {lastResult.totalQuestions} Correct
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Quiz Completed!</h2>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {lastResult.percentage >= 80 ? 'Outstanding mastery of this subject! 🏆' :
               lastResult.percentage >= 60 ? 'Good work! Review key concepts to reach 100%. 👍' :
               'Needs practice. Review explanations below and retake the quiz.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => setScreen('select')}>
                <i className="fas fa-th-large"></i> Take Another Quiz
              </button>
              <button className="btn btn-outline" onClick={() => handleStartQuiz(lastResult.quiz)}>
                <i className="fas fa-redo"></i> Retake This Quiz
              </button>
            </div>
          </div>

          {/* Detailed Question Review & Explanations */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-search-plus text-primary"></i> Detailed Question Review & Explanations
              </h3>
            </div>
            <div className="card-body" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {lastResult.quiz.questions.map((q, idx) => {
                  const userChoice = lastResult.answers[q.id];
                  const correctIdx = q.correct !== undefined ? q.correct : q.correctAnswer;
                  const isCorrect = userChoice === correctIdx;

                  return (
                    <div
                      key={q.id || idx}
                      style={{
                        padding: '1.25rem',
                        border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-surface)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700 }}>Question {idx + 1}</span>
                        <span className={`badge badge-${isCorrect ? 'success' : 'danger'}`}>
                          {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                        </span>
                      </div>
                      <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{q.question}</p>

                      <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <div>
                          <strong>Your Answer: </strong>
                          <span style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                            {userChoice !== undefined ? q.options[userChoice] : 'Not Answered'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div style={{ marginTop: '0.25rem' }}>
                            <strong>Correct Answer: </strong>
                            <span style={{ color: 'var(--success)' }}>{q.options[correctIdx]}</span>
                          </div>
                        )}
                      </div>

                      {q.explanation && (
                        <div style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                          borderTop: '1px solid var(--border)',
                          paddingTop: '0.6rem',
                          marginTop: '0.6rem',
                          lineHeight: 1.5
                        }}>
                          <i className="fas fa-lightbulb text-warning" style={{ marginRight: '6px' }}></i>
                          <strong>Explanation: </strong>{q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
