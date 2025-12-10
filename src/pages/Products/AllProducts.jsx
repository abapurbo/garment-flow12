import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard'
import { FiSearch } from 'react-icons/fi';
const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState("");
  return (
    <div className="pt-34 pb-16 px-16 md:px-16 bg-gray-50 min-h-screen">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3 relative inline-block">
          All Products
          <span className="block w-20 h-1 bg-blue-600 mt-2 mx-auto rounded-full"></span>
        </h2>
        <p className="text-black text-lg">
          Explore our wide range of garments – from trendy fashion to classic essentials. Find the perfect fit for every style and occasion.
        </p>
      </div>
      {/* Search Field */}
      <div className="mb-10 flex justify-end  items-center">

        <div className='relative  w-86 right-55 '>
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search Product..."
            className="border border-gray-300 pl-12 pr-4 rounded-full py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <fieldset className="fieldset">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select rounded-xs border border-gray-300 py-2 w-48 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </fieldset>
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-10  gap-8 mt-10">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

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
