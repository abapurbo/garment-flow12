import Lottie from "lottie-react";
import { Link } from "react-router";
import error from "../../assets/lottie/error.json";

const Forbidden = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-red-50 to-red-100
      dark:from-gray-900 dark:to-gray-800
      "
    >
      <div
        className="max-w-md w-full text-center rounded-3xl p-6 sm:p-8
         
        "
      >
        {/* Animation */}
        <div className="w-64 mx-auto">
          <Lottie animationData={error} loop />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold mt-4 text-red-600 dark:text-red-400">
          403 – Access Forbidden
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base">
          You don’t have permission to access this page.
          <br />
          Please contact the administrator if you believe this is an error.
        </p>

        {/* Action */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl font-semibold
            bg-blue-500 hover:bg-blue-600
            dark:bg-purple-600 dark:hover:bg-purple-700
            text-white shadow-lg transition-all duration-300
            hover:scale-105"
          >
            ⬅ Go to Home
          </Link>

          
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
