/**
 * StudyMate - Storage & Repository Service Layer (ES Module for React)
 * Architected for future migration to Java Spring Boot REST APIs (@RestController / @Service).
 */

import { STUDYMATE_MOCK_DATA } from './mockData.js';

export const STORAGE_KEYS = {
  STUDENT: 'studymate_student',
  NOTES: 'studymate_notes',
  TASKS: 'studymate_tasks',
  SCHEDULE: 'studymate_schedule',
  MATERIALS: 'studymate_materials',
  RESOURCES: 'studymate_resources',
  GOALS: 'studymate_goals',
  QUIZZES: 'studymate_quizzes',
  QUIZ_HISTORY: 'studymate_quiz_history',
  GPA: 'studymate_gpa',
  TIMER_SESSIONS: 'studymate_timer_sessions',
  BADGES: 'studymate_badges',
  NOTIFICATIONS: 'studymate_notifications',
  THEME: 'studymate_theme',
  AUTH: 'studymate_auth_user',
  SETTINGS: 'studymate_settings'
};

export const LocalStorageEngine = {
  isAvailable() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  },

  getItem(key) {
    try {
      if (this.isAvailable()) {
        return window.localStorage.getItem(key);
      }
      return null;
    } catch (e) {
      console.warn("Storage read error:", e);
      return null;
    }
  },

  setItem(key, value) {
    try {
      if (this.isAvailable()) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  },

  removeItem(key) {
    try {
      if (this.isAvailable()) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("Storage remove error:", e);
    }
  },

  clear() {
    try {
      if (this.isAvailable()) {
        window.localStorage.clear();
      }
    } catch (e) {
      console.warn("Storage clear error:", e);
    }
  }
};

export const StorageService = {
  init() {
    const existingStudent = LocalStorageEngine.getItem(STORAGE_KEYS.STUDENT);
    if (!existingStudent) {
      this.resetToDefaults();
    } else {
      // Auto-migrate if old demo user Alex Johnson is cached
      try {
        const student = JSON.parse(existingStudent);
        if (student.name === 'Alex Johnson') {
          student.name = 'Payal Deshmukh';
          student.email = 'payal.deshmukh@university.edu';
          student.avatar = 'PD';
          LocalStorageEngine.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
        }
      } catch (e) {}

      // Check and update quizzes to ensure 30+ questions per subject
      try {
        const rawQuizzes = LocalStorageEngine.getItem(STORAGE_KEYS.QUIZZES);
        const currentQuizzes = rawQuizzes ? JSON.parse(rawQuizzes) : [];
        const needsUpdate = currentQuizzes.length < 5 || (currentQuizzes[0] && currentQuizzes[0].questions.length < 20);
        if (needsUpdate) {
          LocalStorageEngine.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(STUDYMATE_MOCK_DATA.quizzes));
        }
      } catch (e) {}

      // Update auth session if it was Alex Johnson
      try {
        const rawAuth = LocalStorageEngine.getItem(STORAGE_KEYS.AUTH);
        if (rawAuth) {
          const authUser = JSON.parse(rawAuth);
          if (authUser.name === 'Alex Johnson') {
            authUser.name = 'Payal Deshmukh';
            authUser.email = 'payal.deshmukh@university.edu';
            LocalStorageEngine.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authUser));
          }
        }
      } catch (e) {}
    }
  },

  resetToDefaults() {
    const mock = STUDYMATE_MOCK_DATA;
    LocalStorageEngine.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(mock.student));
    LocalStorageEngine.setItem(STORAGE_KEYS.NOTES, JSON.stringify(mock.notes));
    LocalStorageEngine.setItem(STORAGE_KEYS.TASKS, JSON.stringify(mock.tasks));
    LocalStorageEngine.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(mock.schedule));
    LocalStorageEngine.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(mock.materials));
    LocalStorageEngine.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(mock.resources));
    LocalStorageEngine.setItem(STORAGE_KEYS.GOALS, JSON.stringify(mock.goals));
    LocalStorageEngine.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(mock.quizzes));
    LocalStorageEngine.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(mock.quizHistory));
    LocalStorageEngine.setItem(STORAGE_KEYS.GPA, JSON.stringify(mock.gpaRecords));
    LocalStorageEngine.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(mock.timerSessions));
    LocalStorageEngine.setItem(STORAGE_KEYS.BADGES, JSON.stringify(mock.badges));
    LocalStorageEngine.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mock.notifications));
    if (!LocalStorageEngine.getItem(STORAGE_KEYS.THEME)) {
      LocalStorageEngine.setItem(STORAGE_KEYS.THEME, 'light');
    }
  },

  clearAll() {
    LocalStorageEngine.clear();
  },

  exportAllJSON() {
    const backup = {
      exportDate: new Date().toISOString(),
      student: ProfileService.getProfile(),
      notes: NotesService.getAll(),
      tasks: TasksService.getAll(),
      schedule: PlannerService.getAll(),
      materials: MaterialsService.getAll(),
      resources: ResourcesService.getAll(),
      goals: GoalsService.getAll(),
      quizHistory: QuizService.getQuizHistory(),
      gpaRecords: GpaService.getGpaRecords(),
      timerSessions: TimerService.getSessions(),
      badges: ProfileService.getBadges()
    };
    return JSON.stringify(backup, null, 2);
  },

  importAllJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.student) LocalStorageEngine.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(data.student));
      if (data.notes) LocalStorageEngine.setItem(STORAGE_KEYS.NOTES, JSON.stringify(data.notes));
      if (data.tasks) LocalStorageEngine.setItem(STORAGE_KEYS.TASKS, JSON.stringify(data.tasks));
      if (data.schedule) LocalStorageEngine.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(data.schedule));
      if (data.materials) LocalStorageEngine.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(data.materials));
      if (data.resources) LocalStorageEngine.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(data.resources));
      if (data.goals) LocalStorageEngine.setItem(STORAGE_KEYS.GOALS, JSON.stringify(data.goals));
      if (data.quizHistory) LocalStorageEngine.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(data.quizHistory));
      if (data.gpaRecords) LocalStorageEngine.setItem(STORAGE_KEYS.GPA, JSON.stringify(data.gpaRecords));
      if (data.timerSessions) LocalStorageEngine.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(data.timerSessions));
      if (data.badges) LocalStorageEngine.setItem(STORAGE_KEYS.BADGES, JSON.stringify(data.badges));
      return { success: true };
    } catch (err) {
      console.error("Failed to import JSON:", err);
      return { success: false, error: err.message };
    }
  }
};

export const NotesService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.NOTES);
    return raw ? JSON.parse(raw) : [];
  },

  getById(id) {
    const notes = this.getAll();
    return notes.find(n => n.id === id) || null;
  },

  create(noteData) {
    const notes = this.getAll();
    const newNote = {
      id: 'note_' + Date.now(),
      createdAt: new Date().toISOString(),
      isPinned: false,
      isFavorite: false,
      tags: [],
      ...noteData
    };
    notes.unshift(newNote);
    LocalStorageEngine.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return newNote;
  },

  update(id, updatedFields) {
    const notes = this.getAll();
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updatedFields, updatedAt: new Date().toISOString() };
      LocalStorageEngine.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      return notes[index];
    }
    return null;
  },

  delete(id) {
    let notes = this.getAll();
    notes = notes.filter(n => n.id !== id);
    LocalStorageEngine.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return true;
  },

  togglePin(id) {
    const note = this.getById(id);
    if (note) {
      return this.update(id, { isPinned: !note.isPinned });
    }
    return null;
  },

  toggleFavorite(id) {
    const note = this.getById(id);
    if (note) {
      return this.update(id, { isFavorite: !note.isFavorite });
    }
    return null;
  }
};

export const TasksService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.TASKS);
    return raw ? JSON.parse(raw) : [];
  },

  getById(id) {
    const tasks = this.getAll();
    return tasks.find(t => t.id === id) || null;
  },

  create(taskData) {
    const tasks = this.getAll();
    const newTask = {
      id: 'task_' + Date.now(),
      completed: false,
      priority: 'medium',
      ...taskData
    };
    tasks.unshift(newTask);
    LocalStorageEngine.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return newTask;
  },

  update(id, updatedFields) {
    const tasks = this.getAll();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedFields };
      LocalStorageEngine.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return tasks[index];
    }
    return null;
  },

  delete(id) {
    let tasks = this.getAll();
    tasks = tasks.filter(t => t.id !== id);
    LocalStorageEngine.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return true;
  },

  toggleComplete(id) {
    const task = this.getById(id);
    if (task) {
      const updated = this.update(id, { completed: !task.completed });
      if (updated.completed) {
        ProfileService.evaluateBadges();
      }
      return updated;
    }
    return null;
  },

  isOverdue(task) {
    if (task.completed || !task.dueDate) return false;
    const due = new Date(task.dueDate + (task.dueTime ? 'T' + task.dueTime : 'T23:59:59'));
    return due < new Date();
  }
};

export const PlannerService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.SCHEDULE);
    return raw ? JSON.parse(raw) : [];
  },

  create(sessionData) {
    const sessions = this.getAll();
    const newSession = {
      id: 'sched_' + Date.now(),
      isDone: false,
      priority: 'medium',
      ...sessionData
    };
    sessions.push(newSession);
    LocalStorageEngine.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(sessions));
    return newSession;
  },

  update(id, updatedFields) {
    const sessions = this.getAll();
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updatedFields };
      LocalStorageEngine.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(sessions));
      return sessions[index];
    }
    return null;
  },

  delete(id) {
    let sessions = this.getAll();
    sessions = sessions.filter(s => s.id !== id);
    LocalStorageEngine.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(sessions));
    return true;
  },

  toggleDone(id) {
    const sessions = this.getAll();
    const session = sessions.find(s => s.id === id);
    if (session) {
      session.isDone = !session.isDone;
      LocalStorageEngine.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(sessions));
      if (session.isDone) {
        TimerService.logSession(session.subject, 60);
      }
      return session;
    }
    return null;
  }
};

export const MaterialsService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.MATERIALS);
    return raw ? JSON.parse(raw) : [];
  },

  create(materialData) {
    const materials = this.getAll();
    const newMat = {
      id: 'mat_' + Date.now(),
      uploadedDate: new Date().toISOString().split('T')[0],
      tags: [],
      ...materialData
    };
    materials.unshift(newMat);
    LocalStorageEngine.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
    return newMat;
  },

  delete(id) {
    let materials = this.getAll();
    materials = materials.filter(m => m.id !== id);
    LocalStorageEngine.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
    return true;
  }
};

export const ResourcesService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.RESOURCES);
    return raw ? JSON.parse(raw) : [];
  },

  create(resourceData) {
    const resources = this.getAll();
    const newRes = {
      id: 'res_' + Date.now(),
      ...resourceData
    };
    resources.unshift(newRes);
    LocalStorageEngine.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    return newRes;
  },

  delete(id) {
    let resources = this.getAll();
    resources = resources.filter(r => r.id !== id);
    LocalStorageEngine.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    return true;
  }
};

export const GoalsService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.GOALS);
    return raw ? JSON.parse(raw) : [];
  },

  create(goalData) {
    const goals = this.getAll();
    const newGoal = {
      id: 'goal_' + Date.now(),
      progress: 0,
      completed: false,
      milestones: [],
      ...goalData
    };
    goals.unshift(newGoal);
    LocalStorageEngine.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    return newGoal;
  },

  update(id, updatedFields) {
    const goals = this.getAll();
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updatedFields };
      LocalStorageEngine.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
      return goals[index];
    }
    return null;
  },

  delete(id) {
    let goals = this.getAll();
    goals = goals.filter(g => g.id !== id);
    LocalStorageEngine.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    return true;
  },

  toggleMilestone(goalId, milestoneIndex) {
    const goals = this.getAll();
    const goal = goals.find(g => g.id === goalId);
    if (goal && goal.milestones && goal.milestones[milestoneIndex]) {
      goal.milestones[milestoneIndex].done = !goal.milestones[milestoneIndex].done;
      const doneCount = goal.milestones.filter(m => m.done).length;
      goal.progress = Math.round((doneCount / goal.milestones.length) * 100);
      goal.completed = goal.progress === 100;
      LocalStorageEngine.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
      ProfileService.evaluateBadges();
      return goal;
    }
    return null;
  }
};

export const TimerService = {
  getSessions() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.TIMER_SESSIONS);
    return raw ? JSON.parse(raw) : [];
  },

  logSession(subject, durationMinutes) {
    const sessions = this.getSessions();
    const newSession = {
      id: 'ts_' + Date.now(),
      subject: subject || 'General Study',
      durationMinutes: durationMinutes || 25,
      date: new Date().toISOString()
    };
    sessions.unshift(newSession);
    LocalStorageEngine.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(sessions));

    const profile = ProfileService.getProfile();
    const addedHours = Math.round((durationMinutes / 60) * 10) / 10;
    profile.totalStudyHours = Math.round((profile.totalStudyHours + addedHours) * 10) / 10;
    profile.todayStudyHours = Math.round((profile.todayStudyHours + addedHours) * 10) / 10;
    ProfileService.updateProfile(profile);
    ProfileService.evaluateBadges();

    return newSession;
  },

  getTotalHours() {
    const profile = ProfileService.getProfile();
    return profile.totalStudyHours || 0;
  }
};

export const QuizService = {
  getAllQuizzes() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.QUIZZES);
    return raw ? JSON.parse(raw) : STUDYMATE_MOCK_DATA.quizzes;
  },

  getQuizById(id) {
    const quizzes = this.getAllQuizzes();
    return quizzes.find(q => q.id === id) || null;
  },

  getQuizHistory() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    return raw ? JSON.parse(raw) : [];
  },

  saveQuizResult(record) {
    const history = this.getQuizHistory();
    const newRecord = {
      id: 'qh_' + Date.now(),
      date: new Date().toISOString(),
      ...record
    };
    history.unshift(newRecord);
    LocalStorageEngine.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
    ProfileService.evaluateBadges();
    return newRecord;
  }
};

export const GpaService = {
  getGpaRecords() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.GPA);
    return raw ? JSON.parse(raw) : { scale: '4.0', semesters: [], currentCourses: [] };
  },

  saveGpaRecords(data) {
    LocalStorageEngine.setItem(STORAGE_KEYS.GPA, JSON.stringify(data));
    ProfileService.evaluateBadges();
  },

  gradeToPoints(grade, scale) {
    const g = (grade || '').trim().toUpperCase();
    if (scale === '10.0') {
      const map10 = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'P': 4, 'F': 0 };
      return map10[g] !== undefined ? map10[g] : 8.0;
    }
    const map4 = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    };
    return map4[g] !== undefined ? map4[g] : 3.0;
  },

  calculateGpa(courses, scale = '4.0') {
    if (!courses || courses.length === 0) return { gpa: 0, totalCredits: 0, percentage: 0, classification: 'N/A' };
    let totalCreditPoints = 0;
    let totalCredits = 0;
    let totalMarks = 0;
    let marksCount = 0;

    courses.forEach(c => {
      const cred = parseFloat(c.credits) || 0;
      const pts = c.points !== undefined ? parseFloat(c.points) : this.gradeToPoints(c.grade, scale);
      totalCreditPoints += pts * cred;
      totalCredits += cred;
      if (c.marks !== undefined && c.marks !== '') {
        totalMarks += parseFloat(c.marks);
        marksCount++;
      }
    });

    const gpa = totalCredits > 0 ? Math.round((totalCreditPoints / totalCredits) * 100) / 100 : 0;
    const avgMarks = marksCount > 0 ? Math.round((totalMarks / marksCount) * 10) / 10 : (scale === '4.0' ? Math.round((gpa / 4.0) * 100) : Math.round(gpa * 9.5));

    let classification = "Good Standing";
    if (scale === '4.0') {
      if (gpa >= 3.8) classification = "Summa Cum Laude / Distinction";
      else if (gpa >= 3.5) classification = "Magna Cum Laude / High Honors";
      else if (gpa >= 3.0) classification = "First Class / Honors";
      else if (gpa < 2.0) classification = "Academic Warning";
    } else {
      if (gpa >= 9.0) classification = "First Class with Distinction";
      else if (gpa >= 7.5) classification = "First Class";
      else if (gpa >= 6.0) classification = "Second Class";
    }

    return { gpa, totalCredits, percentage: avgMarks, classification };
  }
};

export const ProfileService = {
  getProfile() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.STUDENT);
    return raw ? JSON.parse(raw) : STUDYMATE_MOCK_DATA.student;
  },

  updateProfile(data) {
    const current = this.getProfile();
    const updated = { ...current, ...data };
    LocalStorageEngine.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(updated));
    return updated;
  },

  getBadges() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.BADGES);
    return raw ? JSON.parse(raw) : STUDYMATE_MOCK_DATA.badges;
  },

  evaluateBadges() {
    const badges = this.getBadges();
    const profile = this.getProfile();
    const tasks = TasksService.getAll();
    const completedTasks = tasks.filter(t => t.completed).length;
    const timerSessions = TimerService.getSessions();
    const quizHistory = QuizService.getQuizHistory();
    const goals = GoalsService.getAll();
    const completedGoals = goals.filter(g => g.completed).length;

    let updatedAny = false;

    badges.forEach(b => {
      let shouldUnlock = b.unlocked;

      if (b.id === 'b_streak7' && profile.studyStreak >= 7) shouldUnlock = true;
      if (b.id === 'b_taskmaster' && completedTasks >= 5) shouldUnlock = true;
      if (b.id === 'b_pomo' && timerSessions.length >= 5) shouldUnlock = true;
      if (b.id === 'b_quizace' && quizHistory.some(q => q.percentage === 100)) shouldUnlock = true;
      if (b.id === 'b_century' && profile.totalStudyHours >= 100) shouldUnlock = true;
      if (b.id === 'b_goalcrush' && completedGoals >= 1) shouldUnlock = true;

      if (shouldUnlock && !b.unlocked) {
        b.unlocked = true;
        b.unlockedAt = new Date().toISOString().split('T')[0];
        updatedAny = true;
      }
    });

    if (updatedAny) {
      LocalStorageEngine.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    }
    return badges;
  }
};

export const NotificationService = {
  getAll() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : STUDYMATE_MOCK_DATA.notifications;
  },

  markAsRead(id) {
    const list = this.getAll();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      LocalStorageEngine.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    }
    return list;
  },

  markAllAsRead() {
    const list = this.getAll();
    list.forEach(n => n.read = true);
    LocalStorageEngine.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return list;
  }
};

export const ThemeService = {
  getTheme() {
    return LocalStorageEngine.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    LocalStorageEngine.setItem(STORAGE_KEYS.THEME, theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
};

export const AuthService = {
  getCurrentUser() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.AUTH);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    const profile = ProfileService.getProfile();
    return {
      id: profile.id || "stu_101",
      name: profile.name || "Payal Deshmukh",
      email: profile.email || "payal.deshmukh@university.edu",
      role: "Student",
      isLoggedIn: true
    };
  },

  login(email, password) {
    if (!email || !password) {
      return { success: false, message: "Please enter both email and password." };
    }
    const profile = ProfileService.getProfile();
    const userSession = {
      id: profile.id,
      name: profile.name,
      email: email.trim().toLowerCase(),
      role: "Student",
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    LocalStorageEngine.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userSession));
    return { success: true, user: userSession };
  },

  register(studentData) {
    if (!studentData.name || !studentData.email || !studentData.password) {
      return { success: false, message: "Name, email, and password are required." };
    }

    const initials = studentData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "ST";
    const newProfile = {
      id: "stu_" + Date.now(),
      name: studentData.name.trim(),
      email: studentData.email.trim().toLowerCase(),
      avatar: initials,
      course: studentData.course || "Computer Science & Engineering",
      college: studentData.college || "University Institute of Technology",
      semester: studentData.semester || "Semester 1",
      academicYear: "2026 - 2027",
      studyStreak: 1,
      totalStudyHours: 0,
      todayStudyHours: 0,
      bio: "New student on StudyMate ready to organize, plan, and achieve academic goals!",
      joinedDate: new Date().toISOString().split('T')[0]
    };

    ProfileService.updateProfile(newProfile);

    const session = {
      id: newProfile.id,
      name: newProfile.name,
      email: newProfile.email,
      role: "Student",
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    LocalStorageEngine.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));

    return { success: true, user: session };
  },

  useDemoAccount() {
    StorageService.resetToDefaults();
    const profile = ProfileService.getProfile();
    const session = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: "Student",
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    LocalStorageEngine.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
    return session;
  },

  logout() {
    LocalStorageEngine.removeItem(STORAGE_KEYS.AUTH);
  }
};
