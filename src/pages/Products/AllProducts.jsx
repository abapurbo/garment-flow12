import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import { FiSearch } from 'react-icons/fi';
import useFetchPrdoucts from '../../hooks/useFetchPrdoucts';
import Loading from '../../components/Loading';
import useAxiosPublic from '../../hooks/useAxiosPublic';
const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState('price')
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  console.log(sortOrder)
  console.log()
  const axiosPublic = useAxiosPublic()
  const limit = 6
  useEffect(() => {
    axiosPublic.get(`/all-product?limit=${limit}&skip=${currentPage * limit}&sortField=${sort}&order=${sortOrder}&search=${searchQuery}`)
      .then(data => {
        setProducts(data.data.products);
        setTotalProducts(data.data.total);
        const page = Math.ceil(data.data.total / limit);
        setTotalPage(page)
      })

  }, [currentPage, sortOrder, searchQuery])

  return (
    <div className="pt-34 pb-16 px-4 md:px-16 bg-gray-50 dark:bg-gray-900 min-h-screen container mx-auto">

      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3 relative inline-block">
          All Products
          <span className="block w-20 h-1 bg-blue-600 dark:bg-blue-400 mt-2 mx-auto rounded-full"></span>
        </h2>
        <p className="text-gray-800 dark:text-gray-300 text-lg">
          Explore our wide range of garments – from trendy fashion to classic essentials. Find the perfect fit for every style and occasion.
        </p>
      </div>

      {/* Search & Sort */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 px-10">
        <h1 className='text-2xl font-bold'>({totalProducts}) Products Found</h1>
        <div className='flex gap-12'>
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 text-xl" />
            <input
              type="text"
              placeholder="Search Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-full py-2 pl-10 pr-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-48">
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full select border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option selected disabled={true}>
                Sort by price
              </option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 mt-10  px-10">
        {products.length === 0 ? (
          <div className="col-span-3 text-center">
            <h1 className="text-2xl font-semibold py-20 text-blue-500 dark:text-purple-600 ">No Products Found</h1>
          </div>
        ) : (
          products.map((card) => (
            <ProductCard key={card._id} card={card} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn"
          disabled={currentPage <= 0} // disable if first page
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPage).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i)}
            key={i}
            className={`btn ${i === currentPage ? 'btn-primary' : ''}`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn"
          disabled={currentPage >= totalPage - 1} // disable if last page
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default AllProducts;
