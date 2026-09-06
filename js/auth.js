/**
 * StudyMate - Authentication & Session Management
 * Frontend demo auth using LocalStorage, architected for future JWT / OAuth Spring Boot backend.
 */

const AuthService = {
  getCurrentUser() {
    const raw = LocalStorageEngine.getItem(STORAGE_KEYS.AUTH);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    // Default fallback to student profile so app is immediately accessible
    const profile = ProfileService.getProfile();
    return {
      id: profile.id || "stu_101",
      name: profile.name || "Alex Johnson",
      email: profile.email || "alex.johnson@university.edu",
      role: "Student",
      isLoggedIn: true
    };
  },

  login(email, password, remember = true) {
    if (!email || !password) {
      return { success: false, message: "Please fill in both email and password." };
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
    window.location.href = "login.html";
  },

  checkPageAccess(isAuthPage = false) {
    const userRaw = LocalStorageEngine.getItem(STORAGE_KEYS.AUTH);
    if (!userRaw && !isAuthPage) {
      // Auto create demo session so first-time visitors can browse seamlessly
      this.useDemoAccount();
    }
  }
};

// Export for Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AuthService };
}
