import React from 'react';

const MyOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">My Orders</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* User orders will be mapped here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
