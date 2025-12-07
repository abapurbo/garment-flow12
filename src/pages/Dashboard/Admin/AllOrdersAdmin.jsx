import React from 'react';

const AllOrdersAdmin = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">All Orders</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Orders will be mapped here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrdersAdmin;
