import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TestTaking from './components/TestTaking';
import NavodayaMockTest from './components/NavodayaMockTest';
import NavodayaResultDetail from './components/NavodayaResultDetail';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles?: ('admin' | 'student')[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Main App Component
const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? 
            (user?.role === 'admin' ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Navigate to="/student/dashboard" replace />
            ) : 
            <Login />
          } 
        />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/student/test/:testId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <TestTaking />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/navodaya-mock-test" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <NavodayaMockTest />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/navodaya-result/:resultId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <NavodayaResultDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// App Component with Auth Provider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 