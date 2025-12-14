import React, { useState } from "react";
import Swal from "sweetalert2";

// Dummy orders data
const dummyOrders = [
  { id: "ORD-101", user: "John Doe", product: "Premium Shirt", quantity: 10, orderDate: "2025-12-10", status: "Pending" },
  { id: "ORD-102", user: "Jane Smith", product: "Denim Jeans", quantity: 5, orderDate: "2025-12-11", status: "Pending" },
  { id: "ORD-103", user: "Mike Johnson", product: "Leather Jacket", quantity: 2, orderDate: "2025-12-12", status: "Pending" },
];

const PendingOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Order?",
      text: "This order will be approved.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: "Approved", approvedAt: new Date() } : order
          )
        );
        Swal.fire("Approved!", `Order ${id} has been approved.`, "success");
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Order?",
      text: "This order will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: "Rejected" } : order
          )
        );
        Swal.fire("Rejected!", `Order ${id} has been rejected.`, "success");
      }
    });
  };

  const handleView = (id) => {
    Swal.fire("View Order", `Redirecting to details of order ${id}`, "info");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold text-blue-500 dark:text-purple-400 mb-6">
        Pending Orders
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-2xl bg-white dark:bg-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-700 dark:text-gray-200">
                  No pending orders.
                </td>
              </tr>
            )}
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <th className="text-gray-900 dark:text-gray-100">{index + 1}</th>
                <td className="font-semibold text-gray-900 dark:text-gray-100">{order.id}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.user}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.product}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.quantity}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.orderDate}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleApprove(order.id)}
                    disabled={order.status !== "Pending"}
                    className={`btn btn-sm rounded-2xl ${
                      order.status !== "Pending"
                        ? "cursor-not-allowed opacity-50 bg-green-200 text-green-600 dark:bg-green-700 dark:text-green-300"
                        : "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300 hover:dark:bg-green-600 hover:bg-green-200"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(order.id)}
                    disabled={order.status !== "Pending"}
                    className={`btn btn-sm rounded-2xl ${
                      order.status !== "Pending"
                        ? "cursor-not-allowed opacity-50 bg-red-200 text-red-600 dark:bg-red-700 dark:text-red-300"
                        : "bg-red-200 text-red-600 dark:bg-red-700 dark:text-red-300 hover:dark:bg-red-600 hover:bg-red-300"
                    }`}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleView(order.id)}
                    className="btn btn-sm rounded-2xl bg-blue-100 text-blue-600 dark:bg-purple-700 dark:text-purple-300 hover:dark:bg-purple-600 hover:bg-blue-200"
                  >
                    View
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

export default PendingOrders;
