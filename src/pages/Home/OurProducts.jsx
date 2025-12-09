import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard';

const OurProducts = () => {
  return (
    <div className="py-12 px-16">
      {/* Latest Products Section Title */}
      <SectionTitle 
        title="Our Products" 
        subtitle="Check out our newest arrivals – stylish, high-quality products crafted for modern living." 
        description="Explore our diverse range of garments designed to meet your fashion needs with quality and style."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Products will be displayed here */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default OurProducts;
