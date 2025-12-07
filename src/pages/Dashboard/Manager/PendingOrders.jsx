import React from 'react';

const PendingOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Pending Orders</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Pending orders will be mapped here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
