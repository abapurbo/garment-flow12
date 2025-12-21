import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductViewDetails from "./ProductViewDetails";
import { useRole } from "../../../hooks/useRole";
import Loading from "../../../components/Loading";

const AllOrdersAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectOrder, setSelectOrder] = useState({});
  const viewModalRef = useRef()
  const { roleloading } = useRole()
  // Fetch all orders for admin
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["allOrdersAdmin"],
    enabled: !roleloading,
    queryFn: async () => {
      const res = await axiosSecure.get("/all-orders/admin");
      return res.data;
    },
  });

  // Search + Status Filter logic
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus
      ? order.status === filterStatus
      : true;

    const matchesSearch = searchTerm
      ? order.trackingId?.toLowerCase().includes(searchTerm) ||
      order.buyerEmail?.toLowerCase().includes(searchTerm) ||
      order.productName?.toLowerCase().includes(searchTerm)
      : true;

    return matchesStatus && matchesSearch;
  });

  // View order details
  const openModal = () => {
    viewModalRef.current.showModal();
  }
  const closeModal = () => {
    viewModalRef.current.close()
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 dark:bg-gray-900">
      <div className="mt-12 md:mt-8 w-full px-6">
        <h2 className="text-3xl font-bold text-center text-blue-500 dark:text-purple-600 mb-6">
          All Orders
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Search by Order ID / User Email / Product"
            className="input input-bordered w-full sm:w-1/2"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />

          <select
            className="select select-bordered w-full sm:w-1/4"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

      </div>
      {/* Orders Table */}
      <div className="overflow-x-auto w-[340px]   md:w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <table className="table min-w-[800px]">
          <thead className="bg-gray-200 dark:bg-gray-700">
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
              <tr key={order._id}>
                <td className="font-semibold">{order.trackingId.split('-').slice(0,2).join('-')}</td>
                <td>{order.buyerEmail}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectOrder(order)
                      openModal()
                    }}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center  dark:text-purple-600 text-2xl font-bold  text-blue-500 py-10">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <dialog ref={viewModalRef} className="modal ">
        <div className="modal-box min-w-3xl">
          <ProductViewDetails
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

export default AllOrdersAdmin;
