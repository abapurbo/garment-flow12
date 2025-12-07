import React from 'react';
import SectionTitle from '../../components/SectionTitle';

const OurProducts = () => {
  return (
    <div className="py-12">
      <SectionTitle title="Our Products" subtitle="Explore our collection" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products will be displayed here */}
      </div>
    </div>
  );
};

export default OurProducts;
