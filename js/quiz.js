/**
 * StudyMate - Revision Quiz Module Controller
 * Subject-based MCQs, active test engine, score calculator, answer explanation review, history log.
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuizModule();
});

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = {}; // { questionIndex: selectedOptionIndex }
let quizTimerInterval = null;
let quizSecondsElapsed = 0;

function initQuizModule() {
  renderQuizCategories();
  renderQuizHistory();
}

function renderQuizCategories() {
  const container = document.getElementById('quiz-categories-container');
  if (!container) return;

  const quizzes = QuizService.getAllQuizzes();
  const icons = {
    'quiz_dsa': { icon: 'fa-sitemap', color: '#4f46e5', bg: '#e0e7ff' },
    'quiz_os': { icon: 'fa-microchip', color: '#06b6d4', bg: '#cffafe' },
    'quiz_dbms': { icon: 'fa-database', color: '#8b5cf6', bg: '#ede9fe' }
  };

  let html = '';
  quizzes.forEach(q => {
    const iconConf = icons[q.id] || { icon: 'fa-question-circle', color: '#10b981', bg: '#d1fae5' };

    html += `
      <div class="quiz-cat-card" onclick="startQuiz('${q.id}')">
        <div class="quiz-cat-icon" style="background-color: ${iconConf.bg}; color: ${iconConf.color};">
          <i class="fas ${iconConf.icon}"></i>
        </div>
        <div class="quiz-cat-title">${q.title}</div>
        <div class="quiz-cat-desc">${q.description}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border);">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);"><i class="fas fa-list-ol"></i> ${q.questions.length} Questions</span>
          <span class="btn btn-sm btn-primary">Start Quiz <i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.startQuiz = function(quizId) {
  currentQuiz = QuizService.getQuizById(quizId);
  if (!currentQuiz) return;

  currentQuestionIndex = 0;
  userAnswers = {};
  quizSecondsElapsed = 0;

  // Toggle screens
  document.getElementById('quiz-select-screen').style.display = 'none';
  document.getElementById('quiz-result-screen').style.display = 'none';
  document.getElementById('quiz-play-screen').style.display = 'block';

  // Start timer
  clearInterval(quizTimerInterval);
  quizTimerInterval = setInterval(() => {
    quizSecondsElapsed++;
    const timerEl = document.getElementById('quiz-live-timer');
    if (timerEl) {
      const m = Math.floor(quizSecondsElapsed / 60);
      const s = quizSecondsElapsed % 60;
      timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
  }, 1000);

  renderCurrentQuestion();
};

function renderCurrentQuestion() {
  if (!currentQuiz) return;

  const q = currentQuiz.questions[currentQuestionIndex];
  const total = currentQuiz.questions.length;

  document.getElementById('quiz-subject-badge').textContent = currentQuiz.subject;
  document.getElementById('quiz-progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  document.getElementById('quiz-progress-bar').style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;

  document.getElementById('quiz-question-text').textContent = q.question;

  const optionsContainer = document.getElementById('quiz-options-container');
  const letters = ['A', 'B', 'C', 'D'];

  let html = '';
  q.options.forEach((opt, idx) => {
    const isSelected = userAnswers[currentQuestionIndex] === idx;
    html += `
      <div class="quiz-option ${isSelected ? 'selected' : ''}" onclick="selectQuizOption(${idx})">
        <div class="quiz-opt-letter">${letters[idx]}</div>
        <div style="flex: 1;">${escapeHtml(opt)}</div>
      </div>
    `;
  });
  optionsContainer.innerHTML = html;

  // Controls
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const submitBtn = document.getElementById('quiz-submit-btn');

  prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';
  nextBtn.style.display = currentQuestionIndex < total - 1 ? 'inline-flex' : 'none';
  submitBtn.style.display = currentQuestionIndex === total - 1 ? 'inline-flex' : 'none';
}

window.selectQuizOption = function(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;
  renderCurrentQuestion();
};

window.prevQuizQuestion = function() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderCurrentQuestion();
  }
};

window.nextQuizQuestion = function() {
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderCurrentQuestion();
  }
};

window.submitQuiz = function() {
  clearInterval(quizTimerInterval);

  let score = 0;
  const total = currentQuiz.questions.length;

  currentQuiz.questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correct) {
      score++;
    }
  });

  const percentage = Math.round((score / total) * 100);

  // Save to history
  QuizService.saveQuizResult({
    quizSubject: currentQuiz.subject,
    score,
    totalQuestions: total,
    percentage
  });

  // Switch to result screen
  document.getElementById('quiz-play-screen').style.display = 'none';
  document.getElementById('quiz-result-screen').style.display = 'block';

  renderQuizResult(score, total, percentage);
  renderQuizHistory();
};

function renderQuizResult(score, total, percentage) {
  document.getElementById('result-score-number').textContent = `${percentage}%`;
  document.getElementById('result-score-fraction').textContent = `${score} / ${total} Correct`;

  const feedbackEl = document.getElementById('result-feedback');
  if (percentage === 100) {
    feedbackEl.innerHTML = '<span class="text-success"><i class="fas fa-crown"></i> Flawless Victory! You mastered this subject!</span>';
  } else if (percentage >= 80) {
    feedbackEl.innerHTML = '<span class="text-success"><i class="fas fa-star"></i> Excellent Work! Strong conceptual understanding.</span>';
  } else if (percentage >= 60) {
    feedbackEl.innerHTML = '<span class="text-warning"><i class="fas fa-thumbs-up"></i> Good Effort! Review the explanations below to improve.</span>';
  } else {
    feedbackEl.innerHTML = '<span class="text-danger"><i class="fas fa-redo"></i> Keep practicing! Don\'t worry, review the concepts and try again.</span>';
  }

  // Answer Breakdown Review
  const reviewContainer = document.getElementById('quiz-review-list');
  let reviewHtml = '';

  currentQuiz.questions.forEach((q, idx) => {
    const chosen = userAnswers[idx];
    const isCorrect = chosen === q.correct;
    const letters = ['A', 'B', 'C', 'D'];

    reviewHtml += `
      <div class="card" style="padding: 1.25rem; margin-bottom: 1rem; border-left: 5px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-weight: 700; font-size: 0.9rem;">Question ${idx + 1}</span>
          <span class="badge ${isCorrect ? 'badge-success' : 'badge-danger'}">
            ${isCorrect ? '<i class="fas fa-check"></i> Correct' : '<i class="fas fa-times"></i> Incorrect'}
          </span>
        </div>
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">${escapeHtml(q.question)}</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.86rem; margin-bottom: 0.75rem;">
          <div style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
            <strong>Your Answer:</strong> ${chosen !== undefined ? letters[chosen] + ': ' + escapeHtml(q.options[chosen]) : 'Not answered'}
          </div>
          ${!isCorrect ? `<div style="color: var(--success);"><strong>Correct Answer:</strong> ${letters[q.correct]}: ${escapeHtml(q.options[q.correct])}</div>` : ''}
        </div>

        <div style="padding: 0.75rem; background-color: var(--bg-surface-subtle); border-radius: var(--radius-md); font-size: 0.82rem; color: var(--text-muted);">
          <strong><i class="fas fa-info-circle text-primary"></i> Explanation:</strong> ${escapeHtml(q.explanation)}
        </div>
      </div>
    `;
  });

  reviewContainer.innerHTML = reviewHtml;
}

window.exitQuiz = function() {
  clearInterval(quizTimerInterval);
  document.getElementById('quiz-play-screen').style.display = 'none';
  document.getElementById('quiz-result-screen').style.display = 'none';
  document.getElementById('quiz-select-screen').style.display = 'block';
};

function renderQuizHistory() {
  const container = document.getElementById('quiz-history-body');
  if (!container) return;

  const history = QuizService.getQuizHistory();
  if (history.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No quiz attempts yet. Choose a topic above to practice!</td>
      </tr>
    `;
    return;
  }

  let html = '';
  history.slice(0, 6).forEach(h => {
    const badgeClass = h.percentage >= 80 ? 'badge-success' : (h.percentage >= 60 ? 'badge-warning' : 'badge-danger');
    const dateFormatted = new Date(h.date).toLocaleDateString([], { month: 'short', day: 'numeric' });

    html += `
      <tr>
        <td style="font-weight: 700;">${escapeHtml(h.quizSubject)}</td>
        <td>${h.score} / ${h.totalQuestions}</td>
        <td><span class="badge ${badgeClass}">${h.percentage}%</span></td>
        <td style="color: var(--text-muted); font-size: 0.82rem;">${dateFormatted}</td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
