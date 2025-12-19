import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import error from "../../assets/lottie/Error-404.json";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="max-w-md w-full  rounded-2xl p-6 sm:p-8 text-center">
        
        {/* Animation */}
        <div className="w-72 mx-auto">
          <Lottie animationData={error} loop={true} />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-primary mt-4">
          404 - Page Not Found
        </h1>
        <p className="text-base-content/70 mt-3">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action */}
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-primary btn-wide transition-transform duration-200 hover:scale-105"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
