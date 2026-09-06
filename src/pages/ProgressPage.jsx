import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useStudy } from '../context/StudyContext';

export default function ProgressPage() {
  const { stats, subjects, tasks, timerSessions, quizHistory } = useStudy();

  const studyHoursChartRef = useRef(null);
  const subjectMasteryChartRef = useRef(null);
  const taskCompletionChartRef = useRef(null);
  const quizScoresChartRef = useRef(null);

  const studyHoursChartInstance = useRef(null);
  const subjectMasteryChartInstance = useRef(null);
  const taskCompletionChartInstance = useRef(null);
  const quizScoresChartInstance = useRef(null);

  useEffect(() => {
    // 1. Weekly Study Hours Bar Chart
    if (studyHoursChartRef.current) {
      if (studyHoursChartInstance.current) studyHoursChartInstance.current.destroy();
      studyHoursChartInstance.current = new Chart(studyHoursChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Study Hours',
            data: [3.5, 4.2, 5.0, 3.8, 6.0, 4.5, 5.5],
            backgroundColor: 'rgba(79, 70, 229, 0.8)',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 2. Subject Mastery Radar Chart
    if (subjectMasteryChartRef.current) {
      if (subjectMasteryChartInstance.current) subjectMasteryChartInstance.current.destroy();
      subjectMasteryChartInstance.current = new Chart(subjectMasteryChartRef.current, {
        type: 'radar',
        data: {
          labels: ['Computer Science', 'Mathematics', 'Software Eng.', 'Database Systems', 'Physics'],
          datasets: [{
            label: 'Mastery Level (%)',
            data: [92, 78, 88, 84, 72],
            backgroundColor: 'rgba(6, 182, 212, 0.25)',
            borderColor: 'rgb(6, 182, 212)',
            pointBackgroundColor: 'rgb(6, 182, 212)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(6, 182, 212)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: { stepSize: 20 }
            }
          }
        }
      });
    }

    // 3. Task Status Doughnut Chart
    if (taskCompletionChartRef.current) {
      if (taskCompletionChartInstance.current) taskCompletionChartInstance.current.destroy();
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const pendingTasks = tasks.filter(t => t.status !== 'completed').length;

      taskCompletionChartInstance.current = new Chart(taskCompletionChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Pending / In Progress'],
          datasets: [{
            data: [completedTasks || 12, pendingTasks || 4],
            backgroundColor: ['#10b981', '#f59e0b']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    // 4. Quiz Performance Line Chart
    if (quizScoresChartRef.current) {
      if (quizScoresChartInstance.current) quizScoresChartInstance.current.destroy();
      const recentQuizzes = quizHistory.slice(0, 6).reverse();
      const labels = recentQuizzes.length > 0 ? recentQuizzes.map(q => q.subject || 'Quiz') : ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];
      const data = recentQuizzes.length > 0 ? recentQuizzes.map(q => q.score) : [80, 85, 90, 95];

      quizScoresChartInstance.current = new Chart(quizScoresChartRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Score (%)',
            data,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    }

    return () => {
      if (studyHoursChartInstance.current) studyHoursChartInstance.current.destroy();
      if (subjectMasteryChartInstance.current) subjectMasteryChartInstance.current.destroy();
      if (taskCompletionChartInstance.current) taskCompletionChartInstance.current.destroy();
      if (quizScoresChartInstance.current) quizScoresChartInstance.current.destroy();
    };
  }, [tasks, quizHistory]);

  const productivityScore = 88;

  return (
    <div className="progress-page">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Analytics & Progress Insights</h2>
        <p className="text-muted">In-depth performance analytics, study time distribution, and academic metrics</p>
      </div>

      {/* Top Highlights Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon icon-primary"><i className="fas fa-stopwatch"></i></div>
          <div className="stat-info">
            <h3>{stats.studyHours || '32.5'} hrs</h3>
            <p>Total Focus Time</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-success"><i className="fas fa-chart-pie"></i></div>
          <div className="stat-info">
            <h3>{productivityScore}%</h3>
            <p>Productivity Index</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-warning"><i className="fas fa-tasks"></i></div>
          <div className="stat-info">
            <h3>{stats.tasksCompleted || '18'}</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-info"><i className="fas fa-graduation-cap"></i></div>
          <div className="stat-info">
            <h3>{stats.currentGpa || '3.88'}</h3>
            <p>Cumulative GPA</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Weekly Hours */}
        <div className="card">
          <div className="card-header">
            <h3>Weekly Focus Hours</h3>
          </div>
          <div className="card-body" style={{ height: '300px' }}>
            <canvas ref={studyHoursChartRef}></canvas>
          </div>
        </div>

        {/* Subject Mastery Radar */}
        <div className="card">
          <div className="card-header">
            <h3>Subject Proficiency Radar</h3>
          </div>
          <div className="card-body" style={{ height: '300px' }}>
            <canvas ref={subjectMasteryChartRef}></canvas>
          </div>
        </div>

        {/* Task Completion Doughnut */}
        <div className="card">
          <div className="card-header">
            <h3>Task Completion Status</h3>
          </div>
          <div className="card-body" style={{ height: '280px' }}>
            <canvas ref={taskCompletionChartRef}></canvas>
          </div>
        </div>

        {/* Quiz Scores Trend */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Quiz Trends</h3>
          </div>
          <div className="card-body" style={{ height: '280px' }}>
            <canvas ref={quizScoresChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Subject Mastery Table */}
      <div className="card">
        <div className="card-header">
          <h3>Subject Breakdown & Study Milestones</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Hours Logged</th>
                  <th>Tasks Done</th>
                  <th>Quiz Avg</th>
                  <th>Mastery</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Computer Science</strong></td>
                  <td>14.5 hrs</td>
                  <td>8 / 9</td>
                  <td>92%</td>
                  <td>
                    <div className="progress-bar-bg" style={{ height: '6px', width: '120px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '92%', background: 'var(--primary)' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>Mathematics</strong></td>
                  <td>8.0 hrs</td>
                  <td>4 / 5</td>
                  <td>78%</td>
                  <td>
                    <div className="progress-bar-bg" style={{ height: '6px', width: '120px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '78%', background: 'var(--warning)' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>Software Engineering</strong></td>
                  <td>6.0 hrs</td>
                  <td>5 / 5</td>
                  <td>88%</td>
                  <td>
                    <div className="progress-bar-bg" style={{ height: '6px', width: '120px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '88%', background: 'var(--success)' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>Database Systems</strong></td>
                  <td>4.0 hrs</td>
                  <td>3 / 4</td>
                  <td>84%</td>
                  <td>
                    <div className="progress-bar-bg" style={{ height: '6px', width: '120px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '84%', background: 'var(--info)' }}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
