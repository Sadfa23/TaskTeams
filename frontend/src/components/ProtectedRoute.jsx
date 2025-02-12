// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Your authentication check
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }
  return element; // Render the element if authenticated
}

export default ProtectedRoute;