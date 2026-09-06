/**
 * StudyMate - Student Profile & Achievements Controller
 * Profile details editor, academic stats, achievement badges calculation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProfileModule();
});

function initProfileModule() {
  ProfileService.evaluateBadges();
  renderProfileInfo();
  renderProfileStats();
  renderBadgesGrid();
  setupEditProfileModal();
}

function renderProfileInfo() {
  const profile = ProfileService.getProfile();

  const nameEl = document.getElementById('prof-name');
  const emailEl = document.getElementById('prof-email');
  const courseEl = document.getElementById('prof-course');
  const collegeEl = document.getElementById('prof-college');
  const semEl = document.getElementById('prof-semester');
  const avatarEl = document.getElementById('prof-avatar-text');
  const bioEl = document.getElementById('prof-bio');
  const joinedEl = document.getElementById('prof-joined');

  if (nameEl) nameEl.textContent = profile.name || 'Payal Deshmukh';
  if (emailEl) emailEl.textContent = profile.email || 'payal.deshmukh@university.edu';
  if (courseEl) courseEl.textContent = profile.course || 'B.Tech Computer Science';
  if (collegeEl) collegeEl.textContent = profile.college || 'Institute of Technology & Engineering';
  if (semEl) semEl.textContent = profile.semester || 'Semester 6';
  if (avatarEl) avatarEl.textContent = profile.avatar || 'PD';
  if (bioEl) bioEl.textContent = profile.bio || 'Organized and goal-oriented student.';
  if (joinedEl) joinedEl.textContent = profile.joinedDate ? `Joined ${profile.joinedDate}` : 'Member since 2025';
}

function renderProfileStats() {
  const profile = ProfileService.getProfile();
  const tasks = TasksService.getAll();
  const completedTasks = tasks.filter(t => t.completed).length;
  const goals = GoalsService.getAll();
  const completedGoals = goals.filter(g => g.completed).length;
  const quizHistory = QuizService.getQuizHistory();

  const gpaData = GpaService.getGpaRecords();
  const currentGpa = gpaData.semesters && gpaData.semesters.length > 0 ? gpaData.semesters[0].sgpa : 3.82;

  const hoursEl = document.getElementById('prof-stat-hours');
  const tasksEl = document.getElementById('prof-stat-tasks');
  const streakEl = document.getElementById('prof-stat-streak');
  const goalsEl = document.getElementById('prof-stat-goals');
  const gpaEl = document.getElementById('prof-stat-gpa');
  const quizEl = document.getElementById('prof-stat-quizzes');

  if (hoursEl) hoursEl.textContent = `${profile.totalStudyHours || 0}h`;
  if (tasksEl) tasksEl.textContent = completedTasks;
  if (streakEl) streakEl.textContent = `${profile.studyStreak || 1}d`;
  if (goalsEl) goalsEl.textContent = completedGoals;
  if (gpaEl) gpaEl.textContent = currentGpa.toFixed(2);
  if (quizEl) quizEl.textContent = quizHistory.length;
}

function renderBadgesGrid() {
  const container = document.getElementById('profile-badges-grid');
  if (!container) return;

  const badges = ProfileService.getBadges();
  const unlockedCount = badges.filter(b => b.unlocked).length;

  const countBadge = document.getElementById('prof-unlocked-badge-count');
  if (countBadge) countBadge.textContent = `${unlockedCount} / ${badges.length} Unlocked`;

  let html = '';
  badges.forEach(b => {
    html += `
      <div class="achievement-card ${b.unlocked ? '' : 'locked'}">
        <div class="achievement-icon" style="background-color: ${b.unlocked ? b.color + '22' : 'var(--bg-surface-subtle)'}; color: ${b.unlocked ? b.color : 'var(--text-subtle)'};">
          <i class="fas ${b.icon}"></i>
        </div>
        <h4 style="font-size: 0.98rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">${b.title}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.75rem;">${b.desc}</p>
        <div>
          ${b.unlocked ? `<span class="badge badge-success"><i class="fas fa-check"></i> Unlocked</span>` : `<span class="badge badge-secondary"><i class="fas fa-lock"></i> Locked</span>`}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function setupEditProfileModal() {
  const editBtn = document.getElementById('edit-profile-btn');
  let modal = document.getElementById('profile-edit-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'profile-edit-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-user-edit text-primary"></i> Edit Student Profile</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')"><i class="fas fa-times"></i></button>
        </div>
        <form id="profile-edit-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" class="form-control" id="form-prof-name" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" class="form-control" id="form-prof-email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Semester / Year</label>
                <input type="text" class="form-control" id="form-prof-semester" placeholder="e.g. Semester 6">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Degree / Course *</label>
              <input type="text" class="form-control" id="form-prof-course" required>
            </div>
            <div class="form-group">
              <label class="form-label">University / College</label>
              <input type="text" class="form-control" id="form-prof-college">
            </div>
            <div class="form-group">
              <label class="form-label">Personal Bio / Study Philosophy</label>
              <textarea class="form-control" id="form-prof-bio" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('profile-edit-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-prof-name').value.trim();
      const email = document.getElementById('form-prof-email').value.trim();
      const semester = document.getElementById('form-prof-semester').value.trim();
      const course = document.getElementById('form-prof-course').value.trim();
      const college = document.getElementById('form-prof-college').value.trim();
      const bio = document.getElementById('form-prof-bio').value.trim();

      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "AJ";

      ProfileService.updateProfile({
        name,
        email,
        semester,
        course,
        college,
        bio,
        avatar: initials
      });

      StudyMate.toast('Profile updated successfully!', 'success');
      modal.classList.remove('active');
      renderProfileInfo();
      StudyMate.updateUserUI();
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const p = ProfileService.getProfile();
      document.getElementById('form-prof-name').value = p.name || '';
      document.getElementById('form-prof-email').value = p.email || '';
      document.getElementById('form-prof-semester').value = p.semester || '';
      document.getElementById('form-prof-course').value = p.course || '';
      document.getElementById('form-prof-college').value = p.college || '';
      document.getElementById('form-prof-bio').value = p.bio || '';
      modal.classList.add('active');
    });
  }
}
