import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { FiSearch } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../components/Loading';
import '../../components/NavbarStyles.css'
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  const axiosPublic = useAxiosPublic();
  const limit = 6;

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(
        `/all-product?limit=${limit}&skip=${currentPage * limit}&sortField=${sort}&order=${sortOrder}&search=${searchQuery}`
      )
      .then((data) => {
        setProducts(data.data.products);
        setTotalProducts(data.data.total);
        const page = Math.ceil(data.data.total / limit);
        setTotalPage(page);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Loading false after fetch
  }, [currentPage, sortOrder, searchQuery]);

  return (
    <div className="pt-34 pb-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 min-h-screen ">

      <div className='container mx-auto'>
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-purple-600 mb-3 relative inline-block">
            All Products
            <span className="block w-20 h-1 bg-blue-600 dark:bg-purple-600 mt-2 mx-auto rounded-full"></span>
          </h2>
          <p className="text-gray-800 dark:text-gray-300 text-lg">
            Explore our wide range of garments – from trendy fashion to classic essentials. Find the perfect fit for every style and occasion.
          </p>
        </div>

        {/* Search & Sort */}
        <div className="mb-10 all-product-search flex flex-col md:flex-row lg:justify-between  items-center gap-4  md:px-10 ">
          <h1 className="text-2xl text-blue-500  dark:text-purple-600 font-bold">
            ({totalProducts}) Products Found
          </h1>

          <div className="flex search-container  items-center justify-center md:flex-row flex-col  w-full md:gap-12 gap-4 ">
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
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full select border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled>Sort by price</option>
                <option value="asc">Low → High</option>
                <option value="desc">High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid  all-products grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 ">
          {loading ? (
            <div className="col-span-3 text-center py-20">
              <h1 className="text-2xl font-semibold text-blue-500 dark:text-purple-600">
                <Loading></Loading>
              </h1>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-3 text-center">
              <h1 className="text-2xl font-semibold py-20 text-blue-500 dark:text-purple-600">
                No Products Found
              </h1>
            </div>
          ) : (
            products.map((card) => <ProductCard key={card._id} card={card} />)
          )}
        </div>

        {/* Pagination */}
        {products.length > 0 && !loading && (
          <div className="mt-12 flex justify-center gap-2 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 0}
              className="px-4 py-2 rounded-lg font-semibold transition bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-purple-100 dark:text-purple-700 dark:hover:bg-purple-600 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {[...Array(totalPage).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${i === currentPage
                    ? 'bg-blue-600 text-white dark:bg-purple-600'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-purple-50 dark:text-purple-700 dark:hover:bg-purple-600 dark:hover:text-white'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPage - 1}
              className="px-4 py-2 rounded-lg font-semibold transition bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-purple-100 dark:text-purple-700 dark:hover:bg-purple-600 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
