import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router';

const OurProducts = () => {
  return (
    <div
      className="
        py-12 px-16
        bg-white
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
      "
    >
      {/* Latest Products Section Title */}
      <SectionTitle
        title="Our Products"
        subtitle="Check out our newest arrivals – stylish, high-quality products crafted for modern living."
        description="Explore our diverse range of garments designed to meet your fashion needs with quality and style."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

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
        <Link to="/all-products">All Products</Link>
      </button>
    </div>
  );
};

export default OurProducts;
