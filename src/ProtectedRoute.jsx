import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-allowed" />;
  }

  return children;
};

export default ProtectedRoute;
