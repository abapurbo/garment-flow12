import React, { useRef, useState, useEffect } from "react";
import { UpdateProductForm } from "./UpdateProductFrom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { useRole } from "../../../hooks/useRole";

const ManageProducts = () => {
  const { user } = useAuth();
  const { role, status } = useRole();
  const canManageProducts = role === "manager" && status === "active"; // permission check

  const updateRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [updateFrom, setUpdateFrom] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  /* =========================
     Initial Load Products
  ========================== */
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manage-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manage-products?email=${user.email}`);
      setFilteredProducts(res.data);
      return res.data;
    },
  });

  /* =========================
     Search Products
     (disabled for all non-authorized users)
  ========================== */
  useEffect(() => {
    if (!canManageProducts) return; // search blocked
    const delay = setTimeout(() => {
      if (searchText.trim() === "") {
        refetch();
      } else {
        axiosSecure
          .get(`/search-products?searchText=${searchText}`)
          .then((res) => {
            setFilteredProducts(res.data);
          });
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [searchText, axiosSecure, refetch, canManageProducts]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-900 dark:text-purple-400 mb-6">
        Manage Products
      </h2>

      {/* STATUS ALERTS */}
      {!canManageProducts && (
        <>
          {status === "pending" && (
            <div className="mb-4 p-4 rounded-xl bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              ⚠️ Your account is <span className="font-semibold">pending approval</span>. You cannot perform any product actions until admin approval.
            </div>
          )}
          {status === "suspended" && (
            <div className="mb-4 p-4 rounded-xl bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              🚫 Your account has been <span className="font-semibold">suspended</span>. Please check the suspend reason in your profile.
            </div>
          )}
          {status !== "pending" && status !== "suspended" && (
            <div className="mb-4 p-4 rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              ⚠️ You do not have permission to manage products.
            </div>
          )}
        </>
      )}

      {/* Search Input (disabled for all) */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="input input-bordered w-full md:w-1/2 mb-4 cursor-not-allowed opacity-50 bg-gray-200 dark:bg-gray-700 text-gray-500"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        disabled={true}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-2xl font-bold text-blue-500 dark:text-purple-400 py-20">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={product._id} className="text-gray-900 dark:text-gray-100">
                  <td>{index + 1}</td>
                  <td>
                    <img src={product.image} className="w-12 h-12 rounded" alt="" />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className="bg-green-100 dark:bg-green-700 px-3 py-1 rounded-full text-green-600 dark:text-white">
                      {product.paymentOption}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      disabled={true}
                      className="btn btn-sm bg-blue-100 text-blue-600 dark:bg-purple-100 dark:text-purple-600 cursor-not-allowed opacity-50"
                    >
                      <FaEdit />
                    </button>
                    <button
                      disabled={true}
                      className="btn btn-sm bg-red-100 text-red-600 dark:bg-red-200 dark:text-red-700 cursor-not-allowed opacity-50"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal (never opens) */}
      <dialog ref={updateRef} className="modal">
        <div className="modal-box max-w-3xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
          </form>
          <UpdateProductForm updateFrom={updateFrom} handleCloseModal={() => {}} refetch={refetch} />
        </div>
      </dialog>
    </div>
  );
};

export default ManageProducts;
