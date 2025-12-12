import React, { useState } from "react";
import Swal from "sweetalert2";

const AllOrdersAdmin = () => {
  const [orders, setOrders] = useState([
    { id: "ORD001", user: "Cy Ganderton", product: "Blazer", quantity: 3, status: "Pending" },
    { id: "ORD002", user: "Hart Hagerty", product: "T-Shirt", quantity: 5, status: "Approved" },
    { id: "ORD003", user: "Brice Swyre", product: "Jeans", quantity: 2, status: "Rejected" },
  ]);

  const [filterStatus, setFilterStatus] = useState("");
  const filteredOrders = filterStatus ? orders.filter(o => o.status === filterStatus) : orders;

  const handleViewOrder = (order) => {
    Swal.fire({
      title: `Order Details: ${order.id}`,
      html: `
        <p><strong>User:</strong> ${order.user}</p>
        <p><strong>Product:</strong> ${order.product}</p>
        <p><strong>Quantity:</strong> ${order.quantity}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p>Tracking info: Lorem ipsum dolor sit amet.</p>
      `,
      icon: "info",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 shadow-2xl font-roboto">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">All Orders</h2>

      {/* Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by User or Product..."
          className="input input-bordered w-1/3"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setFilterStatus(""); // Reset filter when searching
            setOrders(orders.filter(order => 
              order.user.toLowerCase().includes(value) || 
              order.product.toLowerCase().includes(value)
            ));
          }}
        />
        <select
          className="select select-bordered w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl hover:shadow-xl">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>{order.user}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-white font-semibold ${
                    order.status === "Pending" ? "bg-yellow-500" :
                    order.status === "Approved" ? "bg-green-500" :
                    "bg-red-500"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrdersAdmin;
  