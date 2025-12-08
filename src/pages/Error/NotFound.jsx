import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card shadow-2xl bg-base-100">
        <div className="card-body text-center">
          <h2 className="card-title text-5xl font-bold">404</h2>
          <p className="text-xl py-4">Page Not Found</p>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
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

export default NotFound;
