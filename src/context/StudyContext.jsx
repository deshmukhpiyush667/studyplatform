import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StorageService,
  NotesService,
  TasksService,
  PlannerService,
  MaterialsService,
  ResourcesService,
  GoalsService,
  TimerService,
  QuizService,
  GpaService,
  ProfileService,
  NotificationService
} from '../services/storage';

const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [profile, setProfile] = useState(() => ProfileService.getProfile());
  const [notes, setNotes] = useState(() => NotesService.getAll());
  const [tasks, setTasks] = useState(() => TasksService.getAll());
  const [schedule, setSchedule] = useState(() => PlannerService.getAll());
  const [materials, setMaterials] = useState(() => MaterialsService.getAll());
  const [resources, setResources] = useState(() => ResourcesService.getAll());
  const [goals, setGoals] = useState(() => GoalsService.getAll());
  const [quizzes, setQuizzes] = useState(() => QuizService.getAllQuizzes());
  const [quizHistory, setQuizHistory] = useState(() => QuizService.getQuizHistory());
  const [gpaData, setGpaData] = useState(() => GpaService.getGpaRecords());
  const [timerSessions, setTimerSessions] = useState(() => TimerService.getSessions());
  const [badges, setBadges] = useState(() => ProfileService.getBadges());
  const [notifications, setNotifications] = useState(() => NotificationService.getAll());
  const [toasts, setToasts] = useState([]);

  // Refresh all state from storage
  const refreshAll = () => {
    setProfile(ProfileService.getProfile());
    setNotes(NotesService.getAll());
    setTasks(TasksService.getAll());
    setSchedule(PlannerService.getAll());
    setMaterials(MaterialsService.getAll());
    setResources(ResourcesService.getAll());
    setGoals(GoalsService.getAll());
    setQuizzes(QuizService.getAllQuizzes());
    setQuizHistory(QuizService.getQuizHistory());
    setGpaData(GpaService.getGpaRecords());
    setTimerSessions(TimerService.getSessions());
    setBadges(ProfileService.evaluateBadges());
    setNotifications(NotificationService.getAll());
  };

  useEffect(() => {
    StorageService.init();
    refreshAll();
  }, []);

  // Toast Notification System
  const addToast = (message, type = 'info', duration = 3500) => {
    const id = 'toast_' + Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Notes Actions
  const addNote = (noteData) => {
    const newNote = NotesService.create(noteData);
    setNotes(NotesService.getAll());
    addToast('Note created successfully!', 'success');
    return newNote;
  };

  const updateNote = (id, updatedFields) => {
    const updated = NotesService.update(id, updatedFields);
    setNotes(NotesService.getAll());
    addToast('Note updated successfully!', 'success');
    return updated;
  };

  const deleteNote = (id) => {
    NotesService.delete(id);
    setNotes(NotesService.getAll());
    addToast('Note deleted', 'success');
  };

  const togglePinNote = (id) => {
    NotesService.togglePin(id);
    setNotes(NotesService.getAll());
  };

  const toggleFavoriteNote = (id) => {
    NotesService.toggleFavorite(id);
    setNotes(NotesService.getAll());
  };

  // Tasks Actions
  const addTask = (taskData) => {
    const newTask = TasksService.create(taskData);
    setTasks(TasksService.getAll());
    addToast('Task added successfully!', 'success');
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    const updated = TasksService.update(id, updatedFields);
    setTasks(TasksService.getAll());
    addToast('Task updated successfully!', 'success');
    return updated;
  };

  const deleteTask = (id) => {
    TasksService.delete(id);
    setTasks(TasksService.getAll());
    addToast('Task deleted', 'success');
  };

  const toggleTaskComplete = (id) => {
    const updated = TasksService.toggleComplete(id);
    setTasks(TasksService.getAll());
    setBadges(ProfileService.evaluateBadges());
    addToast(updated.completed ? 'Task completed! Great job 🎉' : 'Task marked as pending', 'success');
    return updated;
  };

  // Planner Actions
  const addSession = (sessionData) => {
    const newSession = PlannerService.create(sessionData);
    setSchedule(PlannerService.getAll());
    addToast('Study session scheduled!', 'success');
    return newSession;
  };

  const updateSession = (id, updatedFields) => {
    const updated = PlannerService.update(id, updatedFields);
    setSchedule(PlannerService.getAll());
    addToast('Study session updated!', 'success');
    return updated;
  };

  const deleteSession = (id) => {
    PlannerService.delete(id);
    setSchedule(PlannerService.getAll());
    addToast('Session deleted', 'success');
  };

  const toggleSessionDone = (id) => {
    const updated = PlannerService.toggleDone(id);
    setSchedule(PlannerService.getAll());
    if (updated.isDone) {
      setProfile(ProfileService.getProfile());
      setTimerSessions(TimerService.getSessions());
      setBadges(ProfileService.evaluateBadges());
      addToast('Session finished! Logged 1 hour study time.', 'success');
    } else {
      addToast('Session marked as pending', 'info');
    }
    return updated;
  };

  // Materials Actions
  const addMaterial = (matData) => {
    const newMat = MaterialsService.create(matData);
    setMaterials(MaterialsService.getAll());
    addToast('Study material added to library!', 'success');
    return newMat;
  };

  const deleteMaterial = (id) => {
    MaterialsService.delete(id);
    setMaterials(MaterialsService.getAll());
    addToast('Material deleted', 'success');
  };

  // Resources Actions
  const addResource = (resData) => {
    const newRes = ResourcesService.create(resData);
    setResources(ResourcesService.getAll());
    addToast('Learning resource saved!', 'success');
    return newRes;
  };

  const deleteResource = (id) => {
    ResourcesService.delete(id);
    setResources(ResourcesService.getAll());
    addToast('Resource bookmark removed', 'success');
  };

  // Goals Actions
  const addGoal = (goalData) => {
    const newGoal = GoalsService.create(goalData);
    setGoals(GoalsService.getAll());
    addToast('New study goal created!', 'success');
    return newGoal;
  };

  const updateGoal = (id, updatedFields) => {
    const updated = GoalsService.update(id, updatedFields);
    setGoals(GoalsService.getAll());
    setBadges(ProfileService.evaluateBadges());
    return updated;
  };

  const deleteGoal = (id) => {
    GoalsService.delete(id);
    setGoals(GoalsService.getAll());
    addToast('Goal deleted', 'success');
  };

  const toggleGoalMilestone = (goalId, milestoneIndex) => {
    const updated = GoalsService.toggleMilestone(goalId, milestoneIndex);
    setGoals(GoalsService.getAll());
    setBadges(ProfileService.evaluateBadges());
    return updated;
  };

  const quickCompleteGoal = (goalId) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    const nextState = !goal.completed;
    const milestones = (goal.milestones || []).map(m => ({ ...m, done: nextState }));
    GoalsService.update(goalId, {
      completed: nextState,
      progress: nextState ? 100 : 0,
      milestones
    });
    setGoals(GoalsService.getAll());
    setBadges(ProfileService.evaluateBadges());
    addToast(nextState ? 'Goal marked as 100% Completed! 🏆' : 'Goal reopened', 'success');
  };

  // Timer Actions
  const logTimerSession = (subject, durationMinutes) => {
    const newSession = TimerService.logSession(subject, durationMinutes);
    setTimerSessions(TimerService.getSessions());
    setProfile(ProfileService.getProfile());
    setBadges(ProfileService.evaluateBadges());
    addToast(`Pomodoro complete! 🎉 Logged ${durationMinutes} mins of focus for ${subject}`, 'success', 5000);
    return newSession;
  };

  // Quiz Actions
  const saveQuizResult = (record) => {
    const newRecord = QuizService.saveQuizResult(record);
    setQuizHistory(QuizService.getQuizHistory());
    setBadges(ProfileService.evaluateBadges());
    return newRecord;
  };

  // GPA Actions
  const saveGpaData = (data) => {
    GpaService.saveGpaRecords(data);
    setGpaData(GpaService.getGpaRecords());
    setBadges(ProfileService.evaluateBadges());
    addToast('GPA records saved successfully!', 'success');
  };

  // Profile Actions
  const updateProfile = (data) => {
    const updated = ProfileService.updateProfile(data);
    setProfile(updated);
    setBadges(ProfileService.evaluateBadges());
    addToast('Profile updated successfully!', 'success');
    return updated;
  };

  // Notifications Actions
  const markNotificationRead = (id) => {
    NotificationService.markAsRead(id);
    setNotifications(NotificationService.getAll());
  };

  const markAllNotificationsRead = () => {
    NotificationService.markAllAsRead();
    setNotifications(NotificationService.getAll());
    addToast('All notifications marked as read', 'success');
  };

  // System Resets & JSON Backup
  const resetToDefaults = () => {
    StorageService.resetToDefaults();
    refreshAll();
    addToast('Default demo data restored!', 'success');
  };

  const clearAllData = () => {
    StorageService.clearAll();
    refreshAll();
    addToast('All platform data has been cleared.', 'info');
  };

  const exportAllJSON = () => {
    return StorageService.exportAllJSON();
  };

  const importAllJSON = (jsonString) => {
    const res = StorageService.importAllJSON(jsonString);
    if (res.success) {
      refreshAll();
      addToast('Data imported successfully!', 'success');
    } else {
      addToast('Failed to import JSON file', 'error');
    }
    return res;
  };


  // Distinct subjects across notes, tasks, schedule
  const subjects = [
    'Computer Science',
    'Data Structures & Algorithms',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'Software Engineering',
    'Mathematics',
    'Python Programming'
  ];

  // Derived stats summary
  const stats = {
    studyHours: profile?.totalStudyHours || 32.5,
    tasksCompleted: tasks.filter(t => t.completed || t.status === 'completed').length,
    currentGpa: gpaData?.semesters && gpaData.semesters.length > 0 ? (gpaData.semesters[0].sgpa || gpaData.semesters[0].gpa || 3.82) : 3.82,
    studyStreak: profile?.studyStreak || 12
  };

  // Quizzes questions mapped by subject for QuizPage
  const quizCategories = quizzes.map(q => q.subject || q.title);
  const quizQuestions = {};
  quizzes.forEach(q => {
    const sub = q.subject || q.title;
    quizQuestions[sub] = (q.questions || []).map(item => ({
      question: item.question,
      options: item.options,
      correctAnswer: item.correct,
      explanation: item.explanation
    }));
  });

  // Aliases for parity across components
  const timetable = schedule;
  const toggleTaskStatus = toggleTaskComplete;
  const toggleSessionCompleted = toggleSessionDone;
  const saveTimerSession = (session) => logTimerSession(session.subject || 'General Study', session.duration || 25);
  const saveGpaSemester = (sem) => {
    const updatedSemesters = [
      {
        id: 'sem_' + Date.now(),
        semester: sem.semester,
        semesterName: sem.semester,
        scale: sem.scale,
        sgpa: sem.gpa,
        gpa: sem.gpa,
        credits: sem.credits,
        coursesCount: sem.coursesCount || 4,
        date: sem.date
      },
      ...(gpaData.semesters || [])
    ];
    saveGpaData({ ...gpaData, semesters: updatedSemesters });
  };
  const deleteGpaSemester = (semId) => {
    const updatedSemesters = (gpaData.semesters || []).filter(s => s.id !== semId);
    saveGpaData({ ...gpaData, semesters: updatedSemesters });
  };
  const refreshData = refreshAll;
  const toggleMilestone = toggleGoalMilestone;
  const updateGoalProgress = (id, progress) => updateGoal(id, { progress });

  return (
    <StudyContext.Provider
      value={{
        profile,
        notes,
        tasks,
        schedule,
        timetable,
        materials,
        resources,
        goals,
        quizzes,
        quizHistory,
        gpaData,
        timerSessions,
        badges,
        notifications,
        toasts,
        subjects,
        stats,
        quizCategories,
        quizQuestions,
        addToast,
        removeToast,
        addNote,
        updateNote,
        deleteNote,
        togglePinNote,
        toggleFavoriteNote,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        toggleTaskStatus,
        addSession,
        updateSession,
        deleteSession,
        toggleSessionDone,
        toggleSessionCompleted,
        addMaterial,
        deleteMaterial,
        addResource,
        deleteResource,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleGoalMilestone,
        toggleMilestone,
        updateGoalProgress,
        quickCompleteGoal,
        logTimerSession,
        saveTimerSession,
        saveQuizResult,
        saveGpaData,
        saveGpaSemester,
        deleteGpaSemester,
        updateProfile,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDefaults,
        clearAllData,
        exportAllJSON,
        importAllJSON,
        refreshData,
        refreshAll
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}

