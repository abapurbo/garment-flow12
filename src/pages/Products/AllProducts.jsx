import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Pagination from '../../components/Pagination';

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="py-12">
      <SectionTitle title="All Products" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products will be mapped here */}
      </div>
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
    </div>
  );
};

export default AllProducts;
