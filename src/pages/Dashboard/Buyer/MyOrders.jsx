import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import ViewDetails from "./ViewDetails";
import Loading from "../../../components/Loading";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectOrder, setSelectOrder] = useState({});
  const { user, isLoading: authLoading } = useAuth();
  const { role, status, roleLoading } = useRole();

  const viewModalRef = useRef();

  const isBuyerPending = role === "buyer" && status === "pending";

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["my-orders"],
    enabled: !authLoading && !roleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get("/buyer/my-orders");
      return res.data;
    },
  });

  const handleOrderCancel = (id) => {
    if (isBuyerPending) return;

    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#7c3aed",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep Order",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/buyer/cancel/order/${id}?email=${user?.email}`)
          .then((res) => {
            if (res.data.success) {
              refetch();
              Swal.fire("Cancelled!", "Order cancelled successfully.", "success");
            }
          });
      }
    });
  };

  const openModal = () => {
    if (isBuyerPending) return;
    viewModalRef.current.showModal();
  };

  const closeModal = () => {
    viewModalRef.current.close();
  };

  return (
    <div className="container mx-auto flex flex-col items-center ">
      {/* TITLE */}
      <div className="mt-12 md:mt-8 px-5">
        <h2 className="text-3xl font-bold mb-4 text-blue-900 dark:text-purple-400">
          My Orders
        </h2>

        {/* BUYER PENDING WARNING */}
        {status === "pending" && (
          <div className="mb-4 p-4 rounded-xl bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⚠️ Your account is <span className="font-semibold">pending approval</span>.
            You cannot perform any order actions until admin approval.
          </div>
        )}
      </div>

      <div className="overflow-x-auto w-[330px]    md:w-full rounded shadow-2xl bg-white dark:bg-gray-800">
        <table className="table min-w-[900px]">
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
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center h-52">
                  <Loading />
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-blue-500 dark:text-purple-600 text-2xl font-bold"
                >
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                  <th>{index + 1}</th>
                  <td className="font-semibold">{order.trackingId.split('-').slice(0,2).join('-')}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>

                  {/* ORDER STATUS */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : order.status === "Approved"
                            ? "bg-blue-100 text-blue-700 dark:bg-purple-900 dark:text-purple-300" : "bg-red-100 text-red-700 dark:bg-red-300 dark:text-red-600"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* PAYMENT */}
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

                  {/* ACTIONS */}
                  <td className="flex gap-2">
                    {/* VIEW */}
                    <button
                      onClick={() => {
                        openModal();
                        setSelectOrder(order);
                      }}
                      disabled={isBuyerPending}
                      className={`px-3 py-1 font-bold rounded-lg
                        ${isBuyerPending
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600"
                          : "bg-blue-200 text-blue-600 hover:bg-blue-700 hover:text-white dark:bg-purple-700 dark:text-purple-100"
                        }`}
                    >
                      View
                    </button>

                    {/* CANCEL */}
                    <button
                      onClick={() => handleOrderCancel(order._id)}
                      disabled={order.status !== "Pending" || isBuyerPending}
                      className={`px-3 py-1 rounded-lg font-bold
                        ${order.status === "Pending" && !isBuyerPending
                          ? "bg-red-100 text-red-500 hover:bg-red-700 hover:text-white dark:bg-red-900 dark:text-red-300"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                        }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW DETAILS MODAL */}
      <dialog ref={viewModalRef} className="modal">
        <div className="modal-box min-w-xl">
          <ViewDetails
            productId={selectOrder._id}
            trackingId={selectOrder.trackingId}
          />
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-1"
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default MyOrders;
