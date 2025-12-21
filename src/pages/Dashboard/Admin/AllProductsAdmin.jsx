import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { UpdateProductAdmin } from "./UpdateProductAdmin";
import Swal from "sweetalert2";
const AllProductsAdmin = () => {
  const axiosSecure = useAxiosSecure()
  const updateRef = useRef();
  const [updateFrom, setUpdateFrom] = useState({});
  // Dummy Product Data (replace with backend API)


  const { data: products = [], refetch } = useQuery({
    queryKey: ['/all-products/admin'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-products/admin')
      return res.data;
    }
  })
  // useEffect(()=>{

  // },[])
  // handle modal
  const openModal = (product) => {
    updateRef.current.showModal();
    setUpdateFrom(product);

  }
  const closeModal = () => {
    updateRef.current.close()
  }

  // handle delete product
  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Confirm Delete",
      text: "This product will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete Product",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/product/admin/${productId}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted Successfully",
                text: "The product has been removed.",
                icon: "success",
              });
            }

          });
      }
    });
  };


  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-50 dark:bg-gray-900 ">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-purple-500 mb-6">
        All Products
      </h2>

      <div className="overflow-x-auto w-[340px]   md:w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition">
        <table className="table min-w-[800px] text-gray-900 dark:text-gray-100">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td>{index + 1}</td>

                {/* Image */}
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-md border border-gray-300 dark:border-gray-600 object-cover"
                  />
                </td>

                {/* Product Name */}
                <td className="font-medium">{product.name}</td>

                {/* Price */}
                <td className="text-green-600 dark:text-green-400 font-semibold">
                  ${product.price}
                </td>

                {/* Category */}
                <td>{product.category}</td>

                {/* Created By */}
                <td>{new Date(product.createdAt).toLocaleDateString('en-GB')}</td>

                {/* Show on Home Toggle */}
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={product.showOnHome}
                  />
                  
                </td>

                {/* Action Buttons */}
                <td className="flex gap-3 justify-center">
                  {/* Update */}
                  <button onClick={() => openModal(product)} className="btn text-[16px] bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition">
                    <FaEdit />
                  </button>

                  {/* Delete */}
                  <button onClick={() => handleDeleteProduct(product._id)} className="btn text-[16px] bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition">
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Update Modal */}
      <dialog ref={updateRef} className="modal">
        <div className="modal-box max-w-3xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </button>
          </form>
          <UpdateProductAdmin updateFrom={updateFrom} handleCloseModal={closeModal} refetch={refetch} />
        </div>
      </dialog>
    </div>
  );
};

export default AllProductsAdmin;
