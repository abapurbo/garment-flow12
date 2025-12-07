import React from 'react';
import { useRole } from '../hooks/useRole';
import LoadingSpinner from './LoadingSpinner';

const ProtectedManager = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (role !== 'manager') {
    return <div className="text-center text-red-600">Access Denied</div>;
  }

  return children;
};

export default ProtectedManager;
