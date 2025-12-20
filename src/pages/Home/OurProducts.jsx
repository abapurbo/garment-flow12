import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router';
import Loading from '../../components/Loading';
import useFetchProducts from '../../hooks/useFetchPrdoucts';

const OurProducts = () => {
  const { allProducts, isLoading } = useFetchProducts();
  return (
    <div
      className="
        py-12 md:px-16 px-6
        bg-white
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
      "
    >
      <SectionTitle
        title="Our Products"
        subtitle="Check out our newest arrivals – stylish, high-quality products crafted for modern living."
        description="Explore our diverse range of garments designed to meet your fashion needs with quality and style."
      />

      <div className="grid grid-cols-1  md:grid-cols-3 gap-10 mt-6 container mx-auto md:px-10">
        {isLoading ? (
          <div className="col-span-3">
            <Loading />
          </div>
        ) : allProducts.length === 0 ? (
          <div className="col-span-3 text-center">
            <h1 className="text-2xl font-semibold py-20 text-blue-500 dark:text-purple-600 ">No Products Found</h1>
          </div>
        ) : (
          allProducts.map((card) => (
            <ProductCard key={card._id} card={card} />
          ))
        )}
      </div>

      <Link to="/all-products">
        <button
          className="
            mt-10 mx-auto block cursor-pointer
            border border-blue-500 text-blue-500
            hover:bg-blue-700 hover:text-white
            dark:border-[#2B6FFF] dark:text-[#6FA3FF]
            dark:hover:bg-[#2B6FFF] dark:hover:text-white
            font-semibold py-2 px-8 rounded-full
            shadow-lg hover:shadow-xl transition-all duration-300
          "
        >
          All Products
        </button>
      </Link>
    </div>
  );
};

export default OurProducts;
