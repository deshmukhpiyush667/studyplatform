import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Context
import AppLayout from './components/layout/AppLayout';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotesPage from './pages/NotesPage';
import TasksPage from './pages/TasksPage';
import PlannerPage from './pages/PlannerPage';
import MaterialsPage from './pages/MaterialsPage';
import ResourcesPage from './pages/ResourcesPage';
import GoalsPage from './pages/GoalsPage';
import ProgressPage from './pages/ProgressPage';
import TimerPage from './pages/TimerPage';
import QuizPage from './pages/QuizPage';
import GpaPage from './pages/GpaPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Wrapper (Optional check, or accessible for demo)
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  // If not logged in, allow demo access or redirect to login. We provide demo auto-login or redirect.
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Main App Routes with AppLayout (Direct paths: /dashboard, /notes, etc.) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/gpa" element={<GpaPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Support /app prefix as well */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/notes" element={<NotesPage />} />
        <Route path="/app/tasks" element={<TasksPage />} />
        <Route path="/app/planner" element={<PlannerPage />} />
        <Route path="/app/materials" element={<MaterialsPage />} />
        <Route path="/app/resources" element={<ResourcesPage />} />
        <Route path="/app/goals" element={<GoalsPage />} />
        <Route path="/app/progress" element={<ProgressPage />} />
        <Route path="/app/timer" element={<TimerPage />} />
        <Route path="/app/quiz" element={<QuizPage />} />
        <Route path="/app/gpa" element={<GpaPage />} />
        <Route path="/app/profile" element={<ProfilePage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

