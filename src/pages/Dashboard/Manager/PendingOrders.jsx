import React, { useState } from "react";
import Swal from "sweetalert2";

// Dummy orders data
const dummyOrders = [
  {
    id: "ORD-101",
    user: "John Doe",
    product: "Premium Shirt",
    quantity: 10,
    orderDate: "2025-12-10",
    status: "Pending",
  },
  {
    id: "ORD-102",
    user: "Jane Smith",
    product: "Denim Jeans",
    quantity: 5,
    orderDate: "2025-12-11",
    status: "Pending",
  },
  {
    id: "ORD-103",
    user: "Mike Johnson",
    product: "Leather Jacket",
    quantity: 2,
    orderDate: "2025-12-12",
    status: "Pending",
  },
];

const PendingOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);

  // Approve order
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
            order.id === id
              ? { ...order, status: "Approved", approvedAt: new Date() }
              : order
          )
        );
        Swal.fire("Approved!", `Order ${id} has been approved.`, "success");
      }
    });
  };

  // Reject order
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

  // View order (placeholder)
  const handleView = (id) => {
    Swal.fire("View Order", `Redirecting to details of order ${id}`, "info");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center  font-bold text-blue-500 mb-6">Pending Orders</h2>

      <div className="overflow-x-auto rounded-lg shadow-2xl bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100">
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
                <td colSpan="7" className="text-center py-4">
                  No pending orders.
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
                <td>{order.orderDate}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleApprove(order.id)}
                    disabled={order.status !== "Pending"}
                    className={`btn btn-sm bg-green-100 rounded-2xl text-green-600 ${
                      order.status !== "Pending" && "cursor-not-allowed opacity-50"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(order.id)}
                    disabled={order.status !== "Pending"}
                    className={`btn btn-sm bg-red-200 rounded-2xl text-red-600 ${
                      order.status !== "Pending" && "cursor-not-allowed opacity-50"
                    }`}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleView(order.id)}
                    className="btn btn-sm bg-blue-100 text-blue-600 rounded-2xl"
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
