import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/admin/login" replace />;

  if (adminOnly) {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.isAdmin) {
        return <Navigate to="/" replace />;
      }
    } catch {
      return <Navigate to="/admin/login" replace />;
    }
  }

  return children;
}
