import React from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";

const MyOrders = () => {
  const orders = [
    {
      id: "ORD-101",
      product: "Premium Shirt",
      quantity: 120,
      status: "Pending",
      payment: "Unpaid",
    },
    {
      id: "ORD-102",
      product: "Denim Jeans",
      quantity: 80,
      status: "Processing",
      payment: "Paid",
    },
    {
      id: "ORD-103",
      product: "Jacket",
      quantity: 50,
      status: "Delivered",
      payment: "Paid",
    },
  ];

  // cancel order
  const handleOrderCancel = () => {
    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order? You cannot undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep Order"
    }).then((result) => {
      if (result.isConfirmed) {

        // 👉 call API to cancel the order here

        Swal.fire({
          title: "Order Cancelled!",
          text: "Your order has been successfully cancelled.",
          icon: "success"
        });
      }
    });

  }
  return (
    <div>
      <h2 className="text-3xl text-blue-900 font-bold mb-6">My Orders</h2>

      <div className="overflow-x-auto rounded-xs shadow-2xl bg-white">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="hover">
                <th>{index + 1}</th>
                <td className="font-semibold">{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.payment}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="flex items-center gap-2">
                  {/* VIEW BUTTON */}
                  <button className="px-3 font-bold py-1 rounded-lg bg-blue-200 text-blue-500 hover:bg-blue-700 hover:text-white">
                    View
                  </button>

                  {/* CANCEL BUTTON (only active if status pending) */}
                  <button
                    onClick={handleOrderCancel}
                    disabled={order.status !== "Pending"}
                    className={`px-3 py-1 rounded-lg  
                      ${order.status === "Pending"
                        ? "bg-red-100 font-bold text-red-500 hover:bg-red-700 hover:text-white"
                        : "bg-gray-300 text-gray-500 font-bold cursor-not-allowed"
                      }`}
                  >
                    Cancel
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

export default MyOrders;
