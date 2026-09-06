/**
 * StudyMate - Progress & Analytics Controller
 * In-depth Chart.js visualizations, productivity scoring, study trends, subject mastery.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProgressModule();
});

let weeklyHoursChart = null;
let subjectDoughnutChart = null;
let taskTrendChart = null;
let quizPerformanceChart = null;

function initProgressModule() {
  renderProgressStats();
  renderProgressCharts();
  renderSubjectMasteryTable();
}

function renderProgressStats() {
  const profile = ProfileService.getProfile();
  const tasks = TasksService.getAll();
  const goals = GoalsService.getAll();
  const quizzes = QuizService.getQuizHistory();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.completed).length;
  const goalRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // Productivity Score Calculation (out of 100)
  // 35% task rate + 25% goal rate + 20% streak (capped at 15 days) + 20% quiz avg
  const streakPts = Math.min((profile.studyStreak || 1) / 15, 1) * 20;
  let quizAvg = 80;
  if (quizzes.length > 0) {
    const totalScore = quizzes.reduce((sum, q) => sum + (q.percentage || 0), 0);
    quizAvg = Math.round(totalScore / quizzes.length);
  }
  const quizPts = (quizAvg / 100) * 20;
  const productivityScore = Math.round((taskRate * 0.35) + (goalRate * 0.25) + streakPts + quizPts);

  const elHours = document.getElementById('stat-total-hours');
  const elStreak = document.getElementById('stat-streak');
  const elTasks = document.getElementById('stat-task-rate');
  const elScore = document.getElementById('stat-prod-score');
  const elScoreBar = document.getElementById('prod-score-bar');

  if (elHours) elHours.textContent = `${profile.totalStudyHours || 0} hrs`;
  if (elStreak) elStreak.textContent = `${profile.studyStreak || 1} Days`;
  if (elTasks) elTasks.textContent = `${taskRate}%`;
  if (elScore) elScore.textContent = `${productivityScore} / 100`;
  if (elScoreBar) elScoreBar.style.width = `${productivityScore}%`;
}

function renderProgressCharts() {
  if (typeof Chart === 'undefined') return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

  // 1. Weekly Study Hours Bar Chart
  const weeklyCanvas = document.getElementById('weeklyStudyBarChart');
  if (weeklyCanvas) {
    if (weeklyHoursChart) weeklyHoursChart.destroy();
    weeklyHoursChart = new Chart(weeklyCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Study Hours',
          data: [4.5, 3.8, 5.2, 4.0, 6.5, 7.0, 3.5],
          backgroundColor: '#4f46e5',
          borderRadius: 8,
          barThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor, font: { weight: 600 } } },
          y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => v + 'h' }, beginAtZero: true }
        }
      }
    });
  }

  // 2. Subject Distribution Doughnut
  const distCanvas = document.getElementById('subjectDoughnutChart');
  if (distCanvas) {
    if (subjectDoughnutChart) subjectDoughnutChart.destroy();
    subjectDoughnutChart = new Chart(distCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Operating Systems', 'DBMS', 'Algorithms', 'Computer Networks', 'Machine Learning'],
        datasets: [{
          data: [35, 28, 22, 10, 5],
          backgroundColor: ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } }
        }
      }
    });
  }

  // 3. Task Completion Trend Line Chart
  const taskTrendCanvas = document.getElementById('taskTrendLineChart');
  if (taskTrendCanvas) {
    if (taskTrendChart) taskTrendChart.destroy();
    taskTrendChart = new Chart(taskTrendCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Completed Tasks',
            data: [12, 18, 15, 24],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointBackgroundColor: '#10b981'
          },
          {
            label: 'Total Assigned',
            data: [14, 20, 18, 26],
            borderColor: '#6366f1',
            borderDash: [5, 5],
            fill: false,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: '#6366f1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: textColor } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor } },
          y: { grid: { color: gridColor }, ticks: { color: textColor }, beginAtZero: true }
        }
      }
    });
  }

  // 4. Quiz Accuracy Chart
  const quizCanvas = document.getElementById('quizAccuracyChart');
  if (quizCanvas) {
    if (quizPerformanceChart) quizPerformanceChart.destroy();
    quizPerformanceChart = new Chart(quizCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Data Structures', 'Operating Systems', 'DBMS', 'Web Dev', 'Networks'],
        datasets: [{
          label: 'Accuracy %',
          data: [85, 100, 90, 75, 80],
          backgroundColor: '#06b6d4',
          borderRadius: 6,
          barThickness: 20
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => v + '%' }, max: 100, beginAtZero: true },
          y: { grid: { display: false }, ticks: { color: textColor, font: { weight: 600 } } }
        }
      }
    });
  }
}

function renderSubjectMasteryTable() {
  const container = document.getElementById('subject-mastery-body');
  if (!container) return;

  const subjects = [
    { name: 'Operating Systems', hours: 44.5, tasks: '8/9', mastery: 88, status: 'Advanced' },
    { name: 'DBMS', hours: 38.0, tasks: '6/7', mastery: 85, status: 'Advanced' },
    { name: 'Data Structures & Algorithms', hours: 32.5, tasks: '12/15', mastery: 80, status: 'Proficient' },
    { name: 'Computer Networks', hours: 16.0, tasks: '4/5', mastery: 72, status: 'Intermediate' },
    { name: 'Machine Learning', hours: 11.5, tasks: '3/4', mastery: 65, status: 'Intermediate' }
  ];

  let html = '';
  subjects.forEach(s => {
    html += `
      <tr>
        <td style="font-weight: 700;">${s.name}</td>
        <td>${s.hours} hrs</td>
        <td>${s.tasks}</td>
        <td style="min-width: 140px;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="progress-bar-container" style="flex: 1;">
              <div class="progress-bar-fill" style="width: ${s.mastery}%;"></div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700;">${s.mastery}%</span>
          </div>
        </td>
        <td><span class="badge ${s.status === 'Advanced' ? 'badge-success' : 'badge-primary'}">${s.status}</span></td>
      </tr>
    `;
  });

  container.innerHTML = html;
}
