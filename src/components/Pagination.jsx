import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-10">

      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded-lg border transition 
          ${currentPage === 1
            ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-white dark:bg-gray-800 text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
          }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg border transition 
            ${currentPage === page
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white dark:bg-gray-800 text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
            }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-lg border transition 
          ${currentPage === totalPages
            ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-white dark:bg-gray-800 text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
          }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
