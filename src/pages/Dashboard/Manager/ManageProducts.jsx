import React, { useRef, useState } from "react";
import { UpdateProductForm } from "./UpdateProductFrom";
import Swal from "sweetalert2";
const dummyProducts = [
  {
    id: 1,
    name: "Blue Shirt",
    price: 25,
    stock: 50,
    paymentOption: "Cash on Delivery",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Leather Jacket",
    price: 120,
    stock: 10,
    paymentOption: "PayFirst",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Jeans Pant",
    price: 40,
    stock: 30,
    paymentOption: "Cash on Delivery",
    image: "https://via.placeholder.com/50",
  },
];

const ManageProducts = () => {
  const [search, setSearch] = useState("");
  const updateRef = useRef()
  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  //  update product modale handle
  const handleUpdate = (id) => {
    updateRef.current.showModal()
    console.log("Update product id:", id);
  };

// const handleDelete = (id) => {
//   Swal.fire({
//     title: "Are you sure you want to delete this product?",
//     text: "This action cannot be undone!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes, delete it!",
//     cancelButtonText: "Cancel"
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         "Deleted!",
//         "The product has been removed successfully.",
//         "success"
//       );
//     }
//   });
// };

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure you want to delete this product?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: false, // Cancel button on left, confirm on right
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform delete logic here
      Swal.fire({
        title: "Deleted!",
        text: "The product has been removed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        position: "top-center",
        toast: true
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your product is safe.",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
        position: "top-center",
        toast: true
      });
    }
  });
};






  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Manage Products</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg shadow-2xl bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Option</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><span className="bg-green-100 text-green-600 font-semibold px-3 rounded-full py-1">{product.paymentOption}</span></td>
                <td>{product.stock}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* update products modal */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" ref={updateRef} className="modal">
        <div className="modal-box max-w-3xl relative">

          {/* Close button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-blue-500 text-center text-xl mb-4">Update Product</h3>

          {/* React Hook Form starts */}
          <UpdateProductForm />
        </div>
      </dialog>
    </div>
  );
};

export default ManageProducts;
