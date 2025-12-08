import React from 'react';
import { Link } from 'react-router';

const NotAllowed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card shadow-2xl bg-base-100">
        <div className="card-body text-center">
          <h2 className="card-title text-3xl text-red-600">Access Denied</h2>
          <p className="py-4">You don't have permission to access this page.</p>
          <div className="card-actions justify-center">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
