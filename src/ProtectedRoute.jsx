import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './hooks/useAuth';
import Loading from './components/Loading';

const ProtectedRoute = ({ children}) => {
  const { user, isLoading } = useAuth();
 
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;




