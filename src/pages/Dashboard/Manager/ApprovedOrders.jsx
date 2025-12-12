import React, { useState } from "react";
import Swal from "sweetalert2";

// Dummy approved orders data
const dummyOrders = [
  {
    id: "ORD-101",
    user: "John Doe",
    product: "Premium Shirt",
    quantity: 10,
    approvedDate: "2025-12-10",
  },
  {
    id: "ORD-102",
    user: "Jane Smith",
    product: "Denim Jeans",
    quantity: 5,
    approvedDate: "2025-12-11",
  },
  {
    id: "ORD-103",
    user: "Mike Johnson",
    product: "Leather Jacket",
    quantity: 2,
    approvedDate: "2025-12-12",
  },
];

const ApprovedOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);

  // Add tracking update (placeholder modal)
  const handleAddTracking = (id) => {
    Swal.fire({
      title: `Add Tracking for ${id}`,
      html: `
        <input type="text" id="location" class="swal2-input" placeholder="Location">
        <input type="text" id="note" class="swal2-input" placeholder="Note">
        <input type="datetime-local" id="datetime" class="swal2-input">
        <select id="status" class="swal2-select">
          <option value="Cutting Completed">Cutting Completed</option>
          <option value="Sewing Started">Sewing Started</option>
          <option value="Finishing">Finishing</option>
          <option value="QC Checked">QC Checked</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Add Tracking",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Added!", `Tracking info for ${id} added.`, "success");
        // 👉 Here you can call API to save tracking info
      }
    });
  };

  // View tracking (placeholder modal)
  const handleViewTracking = (id) => {
    Swal.fire(
      `Tracking for ${id}`,
      `Show timeline of product movement here.`,
      "info"
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Approved Orders</h2>

      <div className="overflow-x-auto rounded-lg shadow-2xl bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No approved orders.
                </td>
              </tr>
            )}
            {orders.map((order, index) => (
              <tr key={order.id} className="hover">
                <th>{index + 1}</th>
                <td className="font-semibold">{order.id}</td>
                <td>{order.user}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.approvedDate}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleAddTracking(order.id)}
                    className="btn btn-sm bg-blue-100 rounded-2xl text-blue-600"
                  >
                    Add Tracking
                  </button>
                  <button
                    onClick={() => handleViewTracking(order.id)}
                    className="btn btn-sm bg-green-100 text-green-600 rounded-2xl"
                  >
                    View Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedOrders;
