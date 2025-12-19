import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRole } from "../../../hooks/useRole";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Dummy approved orders data
const dummyOrders = [
  { id: "ORD-101", user: "John Doe", product: "Premium Shirt", quantity: 10, approvedDate: "2025-12-10" },
  { id: "ORD-102", user: "Jane Smith", product: "Denim Jeans", quantity: 5, approvedDate: "2025-12-11" },
  { id: "ORD-103", user: "Mike Johnson", product: "Leather Jacket", quantity: 2, approvedDate: "2025-12-12" },
];

const ApprovedOrders = () => {
  const { role, status, roleLoading } = useRole();
  const { user, isLoading: userLoading } = useAuth();
  const [buyerEmail, setBuyerEmail] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const axiosSecure = useAxiosSecure();
  const tackModalRef = useRef()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['approved-orders-manager'],
    enabled: !roleLoading && !userLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-orders/manager`);
      return res.data
    }
  });
  // check if user can perform actions
  const canPerformActions = user?.email && role === "manager" && status === "approved";

  // const handleAddTracking = (tackingProduct) => {
  //   console.log(tackingProduct);
  //   if (!canPerformActions) return;

  //   Swal.fire({
  //     title: `Add Tracking for ${tackingProduct._id}`,
  //     html: `
  //       <input type="text" id="location" class="swal2-input" placeholder="Location">
  //       <input type="text" id="note" class="swal2-input" placeholder="Note">
  //       <input type="datetime-local" id="datetime" class="swal2-input">
  //       <select id="status" class="swal2-select">
  //         <option value="Cutting Completed">Cutting Completed</option>
  //         <option value="Sewing Started">Sewing Started</option>
  //         <option value="Finishing">Finishing</option>
  //         <option value="Packed">Packed</option>
  //         <option value="Out for Delivery">Out for Delivery</option>
  //       </select>
  //     `,
  //     showCancelButton: true,
  //     confirmButtonText: "Add Tracking",
  //   }).then((result) => {
  //     if (result.isConfirmed) {






  //       Swal.fire("Added!", `Tracking info for ${tackingProduct._id} added.`, "success");
  //     }
  //   });
  // };


  const openModal = () => {
    tackModalRef.current.showModal();
  }
  const closeModal = () => {
    tackModalRef.current.close();
  }

  const onSubmitTracking = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const status = form.status.value;
    const dateValue = form.date.value; // YYYY-MM-DD
    const timeValue = form.time.value; // HH:MM
    const notes = form.note.value;

    const combined = new Date(`${dateValue}T${timeValue}`);

    // const date = combined.toLocaleDateString('en-GB');
    // const time = combined.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const trackingInfo = {
      location,
      status,
      dateTime: combined.toISOString(),
      notes,
      trackingId,
      buyerEmail
    }

    axiosSecure.post('/trackings/order-update', trackingInfo)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Tracking Added!",
            text: "Tracking information has been added successfully.",
          });
          form.reset();
          closeModal();
        }
      });
  }
  // const handleAddTracking = (id) => {
  //   if (!canPerformActions) return;

  //   Swal.fire({
  //     title: `Add Tracking for ${id}`,
  //     html: `
  //     <input type="text" id="location" class="swal2-input" placeholder="Location">
  //     <input type="text" id="note" class="swal2-input" placeholder="Note">
  //     <input type="datetime-local" id="datetime" class="swal2-input">
  //     <select id="status" class="swal2-select">
  //       <option value="Cutting Completed">Cutting Completed</option>
  //       <option value="Sewing Started">Sewing Started</option>
  //       <option value="Finishing">Finishing</option>
  //       <option value="Packed">Packed</option>
  //       <option value="Out for Delivery">Out for Delivery</option>
  //     </select>
  //   `,
  //     showCancelButton: true,
  //     confirmButtonText: "Add Tracking",

  //     //Dark mode custom class
  //     customClass: {
  //       popup: 'swal2-dark-popup',
  //       title: 'swal2-dark-title',
  //       input: 'swal2-dark-input',
  //       select: 'swal2-dark-select',
  //       confirmButton: 'swal2-dark-btn',
  //       cancelButton: 'swal2-dark-btn'
  //     },
  //     buttonsStyling: false
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Added!", `Tracking info for ${id} added.`, "success");
  //     }
  //   });
  // };

  // const handleViewTracking = (id) => {
  //   console.log(id);
  //   if (!canPerformActions) return;

  //   Swal.fire(
  //     `Tracking for ${id}`,
  //     `Show timeline of product movement here.`,
  //     "info"
  //   );
  // };

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
                <td colSpan="7" className="text-center text-2xl dark:text-purple-600  py-4 text-blue-600">
                  No approved orders.
                </td>
              </tr>
            )}
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <th className="text-gray-900 dark:text-gray-100">{index + 1}</th>
                <td className="font-semibold text-gray-900 dark:text-gray-100">{order.trackingId.split('-').slice(0, 2).join('-')}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.userName}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.productName}</td>
                <td className="text-gray-800 dark:text-gray-200">{order.quantity}</td>
                <td className="text-gray-800 dark:text-gray-200">{new Date(order.approvedAt).toLocaleDateString('en-GB')}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      openModal()
                      setBuyerEmail(order.buyerEmail)
                      setTrackingId(order.trackingId)
                    }}
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
      {/* approbed tacking modal  */}

      {/* Modal */}
      <dialog id="tracking_modal" ref={tackModalRef} className="modal">
        <div className="modal-box max-w-2xl">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-600">
              📦 Add Tracking Update
            </h3>
            <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={onSubmitTracking}>
            {/* Location */}
            <div className="space-y-2">
              <label className="label font-semibold">Current Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Sewing Section - Line 3"
                className="input input-bordered w-full"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="label font-semibold">Production Status</label>
              <select
                name="status"
                className="select select-bordered w-full"
              >
                <option value="">Select Status</option>
                <option value="Cutting Completed">Cutting Completed</option>
                <option value="Sewing Started">Sewing Started</option>
                <option value="Finishing">Finishing</option>
                <option value="Packed">Packed</option>
                <option value="Out for Delivery">Out for Delivery</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="label font-semibold">Time</label>
                <input
                  type="time"
                  name="time"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="label font-semibold">Note</label>
              <textarea
                name="note"
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Additional tracking note..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-4 ">
              <button type="submit" className="btn btn-primary">
                Save Tracking
              </button>
              <button onClick={closeModal} className="btn btn-outline">Cancel</button>

            </div>

          </form>
        </div>
      </dialog>















    </div>
  );
};

export default ApprovedOrders;
