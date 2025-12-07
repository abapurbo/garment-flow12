import React from 'react';

const AllProductsAdmin = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">All Products</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Products will be mapped here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsAdmin;
