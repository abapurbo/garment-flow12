import React from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  // const orders = [
  //   {
  //     id: "ORD-101",
  //     product: "Premium Shirt",
  //     quantity: 120,
  //     status: "Pending",
  //     payment: "Unpaid",
  //   },
  //   {
  //     id: "ORD-102",
  //     product: "Denim Jeans",
  //     quantity: 80,
  //     status: "Processing",
  //     payment: "Paid",
  //   },
  //   {
  //     id: "ORD-103",
  //     product: "Jacket",
  //     quantity: 50,
  //     status: "Delivered",
  //     payment: "Paid",
  //   },
  // ];
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['my-orders',],
    queryFn: async () => {
      const res = await axiosSecure.get('/buyer/my-orders');
      return res.data
    }
  })

  const handleOrderCancel = (id) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order? You cannot undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#7c3aed",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep Order",
    }).then((result) => {
      if (result.isConfirmed) {
        // cancel order
        axiosSecure.patch(`/buyer/cancel/order/${id}?email=${user?.email}`)
          .then(res => {
            console.log(res.data)
            if (res.data.success) {
               refetch()
            }
          })
        Swal.fire({
          title: "Order Cancelled!",
          text: "Your order has been successfully cancelled.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6 
        text-blue-900 dark:text-purple-400">
        My Orders
      </h2>

      <div className="overflow-x-auto rounded-xs shadow-2xl 
        bg-white dark:bg-gray-800">

        <table className="table">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="dark:text-gray-200">
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
              <tr
                key={order.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700
                  dark:text-gray-200"
              >
                <th>{index + 1}</th>
                <td className="font-semibold">{order.trackingId}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700 dark:bg-purple-900 dark:text-purple-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* PAYMENT BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="flex items-center gap-2">
                  {/* VIEW */}
                  <button
                    className="px-3 py-1 font-bold rounded-lg
                      bg-blue-200 text-blue-600
                      hover:bg-blue-700 hover:text-white
                      dark:bg-purple-700 dark:text-purple-100
                      dark:hover:bg-purple-600"
                  >
                    View
                  </button>

                  {/* CANCEL */}
                  <button
                    onClick={() => handleOrderCancel(order._id)}
                    disabled={order.status !== "Pending"}
                    className={`px-3 py-1 rounded-lg font-bold
                      ${order.status === "Pending"
                        ? "bg-red-100 text-red-500 hover:bg-red-700 hover:text-white dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-alloweddark:bg-gray-600 dark:text-gray-400"
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
