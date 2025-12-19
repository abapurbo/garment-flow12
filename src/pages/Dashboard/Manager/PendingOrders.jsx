import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { set } from "react-hook-form";
import OrderDetails from "./OrderDetails";


const PendingOrders = () => {
  const axiosSecure = useAxiosSecure()
  const { roleLoading } = useRole()
  const [selectedOrderId, setSelectedOrderId] = useState()
  const viewModalRef = useRef()


  const { data: pendingOrders = [], isLoading, refetch } = useQuery({
    queryKey: ['pending-orders-manager'],
    enabled: !roleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-orders/manager`);
      return res.data
    }
  })


  // role & status from hook
  const { role, status } = useRole();

  // permission check
  const canManageOrders = role === "manager" && status === "approved";

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
        axiosSecure.patch(`/approved-order/${id}`)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Approved!",
                text: `Order ${id} has been approved.`,
              });
            }
            refetch(); // React Query refetch
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while approving the order.",
            });
            console.error(err);
          });
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
        axiosSecure.patch(`/reject-order/${id}`)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Rejected!",
                text: `Order ${id} has been rejected.`,
              });
            }
            refetch(); // React Query refetch
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while rejecting the order.",
            });
            console.error(err);
          });
      }
    });
  };
  const openModal = () => {
    viewModalRef.current.showModal();
  }
  const closeModal = () => {
    viewModalRef.current.close();
  }

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
            {pendingOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-blue-600 dark:text-purple-600 font-bold text-2xl py-12 py-4">No pending orders.</td>
              </tr>
            )}

            {pendingOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <th>{index + 1}</th>
                <td className="font-semibold">{order.trackingId.split('-').slice(0, 2).join('-')}</td>
                <td>{order.userName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td>
                <td className="flex gap-2">
                  {/* Approve */}
                  <button
                    onClick={() => handleApprove(order._id)}
                    disabled={!canManageOrders || order.status !== "Pending"}
                    className={`btn btn-sm rounded-2xl ${!canManageOrders || order.status !== "Pending" ? "cursor-not-allowed opacity-50 bg-green-200 text-green-600" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
                  >
                    Approve
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => handleReject(order._id)}
                    disabled={!canManageOrders || order.status !== "Pending"}
                    className={`btn btn-sm rounded-2xl ${!canManageOrders || order.status !== "Pending" ? "cursor-not-allowed opacity-50 bg-red-200 text-red-600" : "bg-red-200 text-red-600 hover:bg-red-300"}`}
                  >
                    Reject
                  </button>

                  {/* View */}
                  <button
                    onClick={() => {
                      openModal()
                      setSelectedOrderId(order._id)
                    }}
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
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" ref={viewModalRef} className="modal ">
        <div className="modal-box min-w-3xl">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <OrderDetails selectedOrderId={selectedOrderId}></OrderDetails>
        </div>
      </dialog>
    </div>
  );
};

export default PendingOrders;
