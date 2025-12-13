import React, { useRef, useState, useEffect } from "react";
import { UpdateProductForm } from "./UpdateProductFrom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const ManageProducts = () => {
  const { user } = useAuth();
  const updateRef = useRef();
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  /* =========================
     Initial Load Products
  ========================== */
  const { isLoading, refetch } = useQuery({
    queryKey: ["manage-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage-products?email=${user.email}`
      );
      setFilteredProducts(res.data);
      return res.data;
    },
  });

  /* =========================
     Search Products
  ========================== */
  useEffect(() => {
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
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [searchText, axiosSecure, refetch]);

  /* =========================
     Update Modal
  ========================== */
  const handleUpdate = (id) => {
    console.log("Update product id:", id);
    updateRef.current.showModal();
  };

  /* =========================
     Delete Product
  ========================== */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-product/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1200,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">
        Manage Products
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="input input-bordered w-full md:w-1/2 mb-4 focus:outline-0 focus:outline-white focus-within:ring-1 focus-within:ring-blue-400"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100">
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
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-2xl font-bold text-blue-500  py-20">
                  No products found
                </td>
              </tr>
            )}

            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    className="w-12 h-12 rounded"
                    alt=""
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <span className="bg-green-100 px-3 py-1 rounded-full text-green-600">
                    {product.paymentOption}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="btn btn-sm bg-blue-100 text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm bg-red-100 text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <dialog ref={updateRef} className="modal">
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </button>
          </form>
          <UpdateProductForm />
        </div>
      </dialog>
    </div>
  );
};

export default ManageProducts;
