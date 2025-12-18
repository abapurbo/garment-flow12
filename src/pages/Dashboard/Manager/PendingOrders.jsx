import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";

// Dummy orders data
const dummyOrders = [
  { id: "ORD-101", user: "John Doe", product: "Premium Shirt", quantity: 10, orderDate: "2025-12-10", status: "Pending" },
  { id: "ORD-102", user: "Jane Smith", product: "Denim Jeans", quantity: 5, orderDate: "2025-12-11", status: "Pending" },
  { id: "ORD-103", user: "Mike Johnson", product: "Leather Jacket", quantity: 2, orderDate: "2025-12-12", status: "Pending" },
];

const PendingOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);

  // role & status from hook
  const { role, status } = useRole();

  // permission check
  const canManageOrders = role === "manager" && status === "active";

  const handleApprove = (id) => {
    if (!canManageOrders) return;

    Swal.fire({
      title: "Approve Order?",
      text: "This order will be approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
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
    if (!canManageOrders) return;

    Swal.fire({
      title: "Reject Order?",
      text: "This order will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
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
    if (!canManageOrders) return; // View button disabled for non-active managers
    Swal.fire("View Order", `Redirecting to details of order ${id}`, "info");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold text-blue-500 dark:text-purple-400 mb-4">
        Pending Orders
      </h2>

      {/* STATUS ALERTS */}
      {!canManageOrders && (
        <>
          {status === "pending" && (
            <div className="mb-4 p-4 rounded-xl bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              ⚠️ Your account is <span className="font-semibold">pending approval</span>. You cannot perform any order actions until admin approval.
            </div>
          )}
          {status === "suspended" && (
            <div className="mb-4 p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              🚫 Your account has been <span className="font-semibold">suspended</span>. Please check the suspend reason in your profile.
            </div>
          )}
        </>
      )}

      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
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
                <td colSpan="7" className="text-center py-4">No pending orders.</td>
              </tr>
            )}

            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <th>{index + 1}</th>
                <td className="font-semibold">{order.id}</td>
                <td>{order.user}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.orderDate}</td>
                <td className="flex gap-2">
                  {/* Approve */}
                  <button
                    onClick={() => handleApprove(order.id)}
                    disabled={!canManageOrders || order.status !== "Pending"}
                    className={`btn btn-sm rounded-2xl ${!canManageOrders || order.status !== "Pending" ? "cursor-not-allowed opacity-50 bg-green-200 text-green-600" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
                  >
                    Approve
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => handleReject(order.id)}
                    disabled={!canManageOrders || order.status !== "Pending"}
                    className={`btn btn-sm rounded-2xl ${!canManageOrders || order.status !== "Pending" ? "cursor-not-allowed opacity-50 bg-red-200 text-red-600" : "bg-red-200 text-red-600 hover:bg-red-300"}`}
                  >
                    Reject
                  </button>

                  {/* View */}
                  <button
                    onClick={() => handleView(order.id)}
                    disabled={!canManageOrders}
                    className={`btn btn-sm rounded-2xl ${!canManageOrders ? "cursor-not-allowed opacity-50 bg-blue-200 text-blue-600" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
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
