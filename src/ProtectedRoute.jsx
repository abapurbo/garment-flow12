import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './hooks/useAuth';
import Loading from './components/Loading';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation()

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname} />;
  }
  return children;
};

export default ProtectedRoute;




