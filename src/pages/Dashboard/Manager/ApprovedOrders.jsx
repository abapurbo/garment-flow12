import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";
import { useAuth } from "../../../hooks/useAuth";

// Dummy approved orders data
const dummyOrders = [
  { id: "ORD-101", user: "John Doe", product: "Premium Shirt", quantity: 10, approvedDate: "2025-12-10" },
  { id: "ORD-102", user: "Jane Smith", product: "Denim Jeans", quantity: 5, approvedDate: "2025-12-11" },
  { id: "ORD-103", user: "Mike Johnson", product: "Leather Jacket", quantity: 2, approvedDate: "2025-12-12" },
];

const ApprovedOrders = () => {
  const [orders] = useState(dummyOrders);
  const { role, status } = useRole();
  const { user } = useAuth();

  // check if user can perform actions
  const canPerformActions = user?.email && role === "manager" && status === "active";

  const handleAddTracking = (id) => {
    if (!canPerformActions) return;

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
      }
    });
  };

  const handleViewTracking = (id) => {
    if (!canPerformActions) return;

    Swal.fire(
      `Tracking for ${id}`,
      `Show timeline of product movement here.`,
      "info"
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-purple-400 mb-6">
        Approved Orders
      </h2>

      {/* STATUS ALERT */}
      {!canPerformActions && (
        <div className="mb-4 p-4 rounded-xl bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-center">
          {status === "pending" && (
            <>⚠️ Your account is <span className="font-semibold">pending approval</span>. You cannot perform any order actions until admin approval.</>
          )}
          {status === "suspended" && (
            <>🚫 Your account has been <span className="font-semibold">suspended</span>. Please check the suspend reason in your profile.</>
          )}
          {role !== "manager" && status === "active" && (
            <>❌ Only managers can perform order actions.</>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-2xl bg-white dark:bg-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-700 dark:text-gray-200">
                  No approved orders.
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
                <td className="text-gray-800 dark:text-gray-200">{order.approvedDate}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleAddTracking(order.id)}
                    disabled={!canPerformActions}
                    className={`btn btn-sm rounded-2xl bg-blue-100 text-blue-600 dark:bg-purple-700 dark:text-white hover:dark:bg-purple-600 hover:bg-blue-200 ${!canPerformActions ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    Add Tracking
                  </button>
                  <button
                    onClick={() => handleViewTracking(order.id)}
                    disabled={!canPerformActions}
                    className={`btn btn-sm rounded-2xl bg-green-100 text-green-600 dark:bg-purple-600 dark:text-white hover:dark:bg-purple-500 hover:bg-green-200 ${!canPerformActions ? "cursor-not-allowed opacity-50" : ""}`}
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
