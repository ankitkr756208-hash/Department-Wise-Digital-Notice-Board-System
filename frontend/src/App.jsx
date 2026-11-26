import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NoticeProvider } from './context/NoticeContext';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import HODDashboard from './pages/HODDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AllNoticesPage from './pages/AllNoticesPage';
import NoticeDetailsPage from './pages/NoticeDetailsPage';
import ProfilePage from './pages/ProfilePage';

// Smart redirect for /dashboard based on current user role
function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/dashboard/${user.role || 'student'}`} replace />;
}

// 404 Not Found Page
function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <span className="text-4xl font-extrabold text-blue-600 block mb-2">404</span>
        <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The requested page or notice does not exist in the digital directory.
        </p>
        <a
          href="/"
          className="inline-flex px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
        >
          Return to Portal Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <NoticeProvider>
            <Routes>
              {/* Public Unauthenticated Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Main Authenticated / Portal Layout */}
              <Route element={<MainLayout />}>
                {/* Notice Board Explorer */}
                <Route path="/notices" element={<AllNoticesPage />} />
                <Route path="/notices/:id" element={<NoticeDetailsPage />} />

                {/* Dashboard Smart Redirection */}
                <Route path="/dashboard" element={<DashboardRedirect />} />

                {/* Role-Based Protected Dashboards */}
                <Route
                  path="/dashboard/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/hod"
                  element={
                    <ProtectedRoute allowedRoles={['hod', 'admin']}>
                      <HODDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/faculty"
                  element={
                    <ProtectedRoute allowedRoles={['faculty', 'hod', 'admin']}>
                      <FacultyDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/student"
                  element={
                    <ProtectedRoute allowedRoles={['student', 'faculty', 'hod', 'admin']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Profile & Settings */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Fallback within Layout */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </NoticeProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
