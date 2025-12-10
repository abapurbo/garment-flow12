import React, { useState } from 'react';
import Pagination from '../../components/Pagination';

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="pt-34 pb-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3 relative inline-block">
          All Products
          <span className="block w-20 h-1 bg-blue-600 mt-2 mx-auto rounded-full"></span>
        </h2>
        <p className="text-gray-600 text-lg">
          Explore our wide range of garments – from trendy fashion to classic essentials. Find the perfect fit for every style and occasion.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {/* Example Product Card */}
        {/* Replace this with your actual product map */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col group">
          <div className="h-56 w-full overflow-hidden rounded-lg mb-4">
            <img
              src="https://via.placeholder.com/300x300"
              alt="Product"
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-lg mb-1 text-gray-800 group-hover:text-blue-600 transition-colors">
            Product Name
          </h3>
          <p className="text-gray-500 mb-2">Category</p>
          <p className="font-bold text-blue-600 mb-4">$49.99</p>
          <button className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllProducts;
