import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function QuizPage() {
  const { quizCategories, quizQuestions, saveQuizResult, quizHistory } = useStudy();

  const [selectedSubject, setSelectedSubject] = useState(quizCategories[0] || 'Computer Science');
  const [quizState, setQuizState] = useState('lobby'); // 'lobby', 'active', 'result'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionIndex]: selectedOptionIndex }
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);

  // Start Quiz
  const startQuiz = () => {
    const questions = quizQuestions[selectedSubject] || [];
    if (questions.length === 0) {
      alert('No questions available for this subject yet.');
      return;
    }
    setActiveQuizQuestions(questions);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizState('active');
  };

  // Select Option
  const handleSelectOption = (optionIdx) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIdx]: optionIdx
    });
  };

  // Next or Finish
  const handleNext = () => {
    if (currentQuestionIdx < activeQuizQuestions.length - 1) {
      setCurrentQuestionIdx(c => c + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(c => c - 1);
    }
  };

  // Finish Quiz and Calculate Score
  const finishQuiz = () => {
    let correctCount = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / activeQuizQuestions.length) * 100);

    saveQuizResult({
      subject: selectedSubject,
      score,
      totalQuestions: activeQuizQuestions.length,
      correctAnswers: correctCount,
      date: new Date().toISOString()
    });

    setQuizState('result');
  };

  const calculateResultStats = () => {
    let correctCount = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const score = Math.round((correctCount / (activeQuizQuestions.length || 1)) * 100);
    return { correctCount, total: activeQuizQuestions.length, score };
  };

  const currentQ = activeQuizQuestions[currentQuestionIdx];

  return (
    <div className="quiz-page">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Interactive Subject Quizzes & Self-Testing</h2>
        <p className="text-muted">Reinforce your active recall with timed multiple-choice assessments and answer explanations</p>
      </div>

      {/* LOBBY VIEW */}
      {quizState === 'lobby' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div className="stat-icon icon-primary" style={{ margin: '0 auto 1.25rem auto', width: '60px', height: '60px', fontSize: '1.5rem' }}>
              <i className="fas fa-question-circle"></i>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Choose Your Quiz Subject</h3>
            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Select a module from your active coursework to test your knowledge. Each quiz tests core concepts and algorithms.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {quizCategories.map(cat => {
                const count = (quizQuestions[cat] || []).length;
                return (
                  <button
                    key={cat}
                    className={`btn ${selectedSubject === cat ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.6rem 1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => setSelectedSubject(cat)}
                  >
                    <i className="fas fa-book-open"></i>
                    <span>{cat}</span>
                    <span className="badge" style={{
                      background: selectedSubject === cat ? 'rgba(255,255,255,0.25)' : 'var(--primary-light, #ede9fe)',
                      color: selectedSubject === cat ? '#fff' : 'var(--primary, #4f46e5)',
                      fontSize: '0.72rem',
                      padding: '2px 7px',
                      borderRadius: '10px'
                    }}>
                      {count}+ Qs
                    </span>
                  </button>
                );
              })}
            </div>

            <button className="btn btn-lg btn-primary" onClick={startQuiz} style={{ minWidth: '180px' }}>
              <i className="fas fa-play" style={{ marginRight: '6px' }}></i> Start Assessment
            </button>
          </div>

          {/* Past Quiz Attempts */}
          <div className="card">
            <div className="card-header">
              <h3>Recent Quiz Results</h3>
            </div>
            <div className="card-body">
              {quizHistory.length === 0 ? (
                <p className="text-muted" style={{ textAlign: 'center', padding: '1rem 0' }}>
                  No quiz history recorded yet. Complete your first test above!
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Correct / Total</th>
                        <th>Date Taken</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizHistory.map(item => (
                        <tr key={item.id}>
                          <td><strong>{item.subject}</strong></td>
                          <td><strong>{item.score}%</strong></td>
                          <td>{item.correctAnswers} / {item.totalQuestions}</td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge badge-${item.score >= 80 ? 'success' : item.score >= 60 ? 'warning' : 'danger'}`}>
                              {item.score >= 80 ? 'Mastered' : item.score >= 60 ? 'Passed' : 'Needs Review'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ VIEW */}
      {quizState === 'active' && currentQ && (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            {/* Header progress */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="badge badge-primary">{selectedSubject}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Question {currentQuestionIdx + 1} of {activeQuizQuestions.length}
              </span>
            </div>

            <div className="progress-bar-bg" style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary)',
                  width: `${((currentQuestionIdx + 1) / activeQuizQuestions.length) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>

            {/* Question title */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {currentQ.question}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestionIdx] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--hover-bg)' : 'var(--card-bg)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border)',
                        backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: '0.95rem' }}>{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Quiz Nav footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="btn btn-outline"
                disabled={currentQuestionIdx === 0}
                onClick={handlePrev}
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              <button
                className="btn btn-primary"
                disabled={userAnswers[currentQuestionIdx] === undefined}
                onClick={handleNext}
              >
                {currentQuestionIdx === activeQuizQuestions.length - 1 ? 'Submit & Review' : 'Next Question'}{' '}
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS VIEW */}
      {quizState === 'result' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {(() => {
            const { correctCount, total, score } = calculateResultStats();
            return (
              <>
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', marginBottom: '2rem' }}>
                  <div
                    className={`stat-icon ${score >= 80 ? 'icon-success' : score >= 60 ? 'icon-warning' : 'icon-danger'}`}
                    style={{ margin: '0 auto 1rem auto', width: '70px', height: '70px', fontSize: '2rem' }}
                  >
                    <i className={`fas ${score >= 80 ? 'fa-trophy' : score >= 60 ? 'fa-award' : 'fa-redo'}`}></i>
                  </div>
                  <h2>Quiz Completed!</h2>
                  <h1 style={{ fontSize: '3.5rem', color: score >= 80 ? 'var(--success)' : 'var(--primary)', margin: '0.5rem 0' }}>
                    {score}%
                  </h1>
                  <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                    You got <strong>{correctCount}</strong> out of <strong>{total}</strong> questions correct.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                    <button className="btn btn-primary" onClick={() => setQuizState('lobby')}>
                      <i className="fas fa-arrow-left"></i> Back to Quiz Menu
                    </button>
                    <button className="btn btn-outline" onClick={startQuiz}>
                      <i className="fas fa-redo"></i> Retake This Quiz
                    </button>
                  </div>
                </div>

                {/* Question by question explanation review */}
                <div className="card">
                  <div className="card-header">
                    <h3>Detailed Question Review & Explanations</h3>
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {activeQuizQuestions.map((q, idx) => {
                      const userChoice = userAnswers[idx];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div
                          key={idx}
                          style={{
                            padding: '1.25rem',
                            border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--hover-bg)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 600 }}>Question {idx + 1}</span>
                            <span className={`badge badge-${isCorrect ? 'success' : 'danger'}`}>
                              {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                            </span>
                          </div>
                          <p style={{ fontWeight: 500, margin: '0 0 0.75rem 0' }}>{q.question}</p>

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
                                <span style={{ color: 'var(--success)' }}>{q.options[q.correctAnswer]}</span>
                              </div>
                            )}
                          </div>

                          {q.explanation && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                              <i className="fas fa-info-circle" style={{ marginRight: '4px' }}></i>
                              <strong>Explanation: </strong>{q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
