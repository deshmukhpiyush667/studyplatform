/**
 * StudyMate - Pomodoro Focus Timer Controller
 * Full Pomodoro interval engine, SVG circular ring, audio tone, subject tagging, session logging.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTimerModule();
});

let timerInterval = null;
let timerState = 'idle'; // 'idle', 'running', 'paused'
let currentMode = 'pomodoro'; // 'pomodoro', 'shortBreak', 'longBreak'
let totalSeconds = 25 * 60;
let remainingSeconds = 25 * 60;
let sessionsCountToday = 0;

// Settings presets in minutes
let timerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15
};

const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 130; // Radius = 130

function initTimerModule() {
  loadCustomSettings();
  setupTimerControls();
  renderSubjectDropdown();
  renderSessionHistory();
  updateTimerDisplay();
  setMode('pomodoro');
}

function loadCustomSettings() {
  const raw = LocalStorageEngine.getItem('studymate_timer_settings');
  if (raw) {
    try {
      timerSettings = { ...timerSettings, ...JSON.parse(raw) };
    } catch (e) {}
  }
}

function renderSubjectDropdown() {
  const select = document.getElementById('timer-subject-select');
  if (!select) return;

  const notes = NotesService.getAll();
  const tasks = TasksService.getAll();
  const subjects = Array.from(new Set([...notes.map(n => n.subject), ...tasks.map(t => t.subject)])).filter(Boolean);

  let html = '<option value="General Study">General Focus / Study</option>';
  subjects.forEach(s => {
    html += `<option value="${s}">${s}</option>`;
  });
  select.innerHTML = html;
}

function setupTimerControls() {
  const mainBtn = document.getElementById('timer-main-btn');
  const resetBtn = document.getElementById('timer-reset-btn');
  const settingsBtn = document.getElementById('timer-settings-btn');

  if (mainBtn) {
    mainBtn.addEventListener('click', toggleTimer);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetTimer);
  }

  // Mode Buttons
  const modeBtns = document.querySelectorAll('.timer-mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setMode(btn.dataset.mode);
    });
  });

  // Settings Modal
  if (settingsBtn) {
    settingsBtn.addEventListener('click', openSettingsModal);
  }
}

function setMode(mode) {
  if (timerState === 'running') {
    clearInterval(timerInterval);
    timerState = 'idle';
  }

  currentMode = mode;
  totalSeconds = timerSettings[mode] * 60;
  remainingSeconds = totalSeconds;

  const labelEl = document.getElementById('timer-status-label');
  if (labelEl) {
    if (mode === 'pomodoro') labelEl.textContent = 'Focus Session';
    else if (mode === 'shortBreak') labelEl.textContent = 'Short Break';
    else if (mode === 'longBreak') labelEl.textContent = 'Long Break';
  }

  const mainBtn = document.getElementById('timer-main-btn');
  if (mainBtn) {
    mainBtn.innerHTML = '<i class="fas fa-play"></i>';
  }

  updateTimerDisplay();
}

function toggleTimer() {
  const mainBtn = document.getElementById('timer-main-btn');

  if (timerState === 'running') {
    // Pause
    clearInterval(timerInterval);
    timerState = 'paused';
    if (mainBtn) mainBtn.innerHTML = '<i class="fas fa-play"></i>';
    StudyMate.toast('Timer paused', 'info', 1500);
  } else {
    // Start or Resume
    timerState = 'running';
    if (mainBtn) mainBtn.innerHTML = '<i class="fas fa-pause"></i>';

    timerInterval = setInterval(() => {
      remainingSeconds--;
      updateTimerDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        handleTimerComplete();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerState = 'idle';
  remainingSeconds = totalSeconds;

  const mainBtn = document.getElementById('timer-main-btn');
  if (mainBtn) mainBtn.innerHTML = '<i class="fas fa-play"></i>';

  document.title = 'StudyMate - Study Focus Timer';
  updateTimerDisplay();
  StudyMate.toast('Timer reset', 'info', 1500);
}

function updateTimerDisplay() {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const timeEl = document.getElementById('timer-display-time');
  if (timeEl) {
    timeEl.textContent = timeFormatted;
  }

  // Update browser tab title
  if (timerState === 'running') {
    document.title = `(${timeFormatted}) StudyMate Focus`;
  }

  // Update SVG Progress Ring
  const progressCircle = document.getElementById('timer-progress-ring');
  if (progressCircle) {
    const fraction = remainingSeconds / totalSeconds;
    const offset = CIRCLE_CIRCUMFERENCE * (1 - fraction);
    progressCircle.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;
    progressCircle.style.strokeDashoffset = offset;
  }
}

function handleTimerComplete() {
  timerState = 'idle';
  const mainBtn = document.getElementById('timer-main-btn');
  if (mainBtn) mainBtn.innerHTML = '<i class="fas fa-play"></i>';

  playCompletionTone();

  if (currentMode === 'pomodoro') {
    sessionsCountToday++;
    const subjectEl = document.getElementById('timer-subject-select');
    const selectedSubject = subjectEl ? subjectEl.value : 'General Study';
    const duration = timerSettings.pomodoro;

    TimerService.logSession(selectedSubject, duration);
    StudyMate.toast(`Pomodoro complete! 🎉 Logged ${duration} mins of focus for ${selectedSubject}`, 'success', 5000);

    renderSessionHistory();

    // Auto prompt break
    StudyMate.confirm({
      title: "Focus Session Finished!",
      message: `Outstanding work! You finished a ${duration}-minute study block. Would you like to start a 5-minute break?`,
      confirmText: "Start 5m Break",
      cancelText: "Stay on Focus",
      onConfirm: () => {
        const breakBtn = document.querySelector('[data-mode="shortBreak"]');
        if (breakBtn) breakBtn.click();
        toggleTimer();
      }
    });
  } else {
    StudyMate.toast('Break finished! Ready to resume studying? ⚡', 'info', 4000);
  }

  setMode(currentMode);
}

function renderSessionHistory() {
  const container = document.getElementById('timer-history-list');
  if (!container) return;

  const sessions = TimerService.getSessions();
  const countTodayEl = document.getElementById('timer-today-count');
  const totalHoursEl = document.getElementById('timer-total-hours');

  if (countTodayEl) countTodayEl.textContent = sessions.length;
  if (totalHoursEl) totalHoursEl.textContent = `${TimerService.getTotalHours()} hrs`;

  if (sessions.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">No study sessions logged yet today. Hit Start to begin your first session!</td>
      </tr>
    `;
    return;
  }

  let html = '';
  sessions.slice(0, 8).forEach(s => {
    const timeFormatted = new Date(s.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateFormatted = new Date(s.date).toLocaleDateString([], { month: 'short', day: 'numeric' });

    html += `
      <tr>
        <td style="font-weight: 700;">${escapeHtml(s.subject)}</td>
        <td><span class="badge badge-primary">${s.durationMinutes} min</span></td>
        <td>${timeFormatted}, ${dateFormatted}</td>
        <td><span class="badge badge-success"><i class="fas fa-check"></i> Logged</span></td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

// Gentle Web Audio API Chime
function playCompletionTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.5);
    });
  } catch (e) {
    console.log("Audio not supported or permitted:", e);
  }
}

function openSettingsModal() {
  let modal = document.getElementById('timer-settings-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'timer-settings-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-sliders-h text-primary"></i> Timer Settings</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="timer-settings-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Focus Interval (Minutes)</label>
              <input type="number" class="form-control" id="sett-pomodoro" min="1" max="120" value="${timerSettings.pomodoro}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Short Break (Minutes)</label>
              <input type="number" class="form-control" id="sett-short-break" min="1" max="30" value="${timerSettings.shortBreak}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Long Break (Minutes)</label>
              <input type="number" class="form-control" id="sett-long-break" min="1" max="60" value="${timerSettings.longBreak}" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Settings</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('timer-settings-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      timerSettings.pomodoro = parseInt(document.getElementById('sett-pomodoro').value) || 25;
      timerSettings.shortBreak = parseInt(document.getElementById('sett-short-break').value) || 5;
      timerSettings.longBreak = parseInt(document.getElementById('sett-long-break').value) || 15;

      LocalStorageEngine.setItem('studymate_timer_settings', JSON.stringify(timerSettings));
      StudyMate.toast('Timer settings updated!', 'success');
      modal.classList.remove('active');
      setMode(currentMode);
    });
  }

  document.getElementById('sett-pomodoro').value = timerSettings.pomodoro;
  document.getElementById('sett-short-break').value = timerSettings.shortBreak;
  document.getElementById('sett-long-break').value = timerSettings.longBreak;
  modal.classList.add('active');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
