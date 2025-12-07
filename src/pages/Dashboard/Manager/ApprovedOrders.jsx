import React from 'react';

const ApprovedOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Approved Orders</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Approved orders will be mapped here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedOrders;
