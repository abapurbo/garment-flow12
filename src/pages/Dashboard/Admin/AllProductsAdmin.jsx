import React from "react";
import { FaEdit, } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const AllProductsAdmin = () => {
  // Dummy Product Data (replace with backend API)
  const products = [
    {
      _id: 1,
      name: "Short Straight Blazer",
      price: 1200,
      category: "Blazer",
      createdBy: "Manager Rahim",
      image: "https://via.placeholder.com/60",
      showOnHome: true,
    },
    {
      _id: 2,
      name: "Premium T-Shirt",
      price: 650,
      category: "T-Shirt",
      createdBy: "Manager Karim",
      image: "https://via.placeholder.com/60",
      showOnHome: false,
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-3xl text-blue-500  font-bold mb-6">All Products</h2>

      <div className="overflow-x-auto rounded-xs border border-base-content/10 bg-base-100 shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price </th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="hover">
                <td>{index + 1}</td>

                {/* Image */}
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-md border"
                  />
                </td>

                {/* Product Name */}
                <td className="font-semibold">{product.name}</td>

                {/* Price */}
                <td className="text-primary font-bold">${product.price}</td>

                {/* Category */}
                <td>{product.category}</td>

                {/* Created By */}
                <td>{product.createdBy}</td>

                {/* Show on Home Toggle */}
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked={product.showOnHome}
                  />
                </td>

                {/* Action Buttons */}
                <td className="flex gap-3 justify-center">
                  {/* Update */}
                  <button
                    className="btn bg-green-50 text-xl text-green-500"
                  >
                    <FaEdit /> 
                  </button>

                  {/* Delete */}
                  <button
                    className="text-red-700 font-extrabold  text-xl btn bg-red-100"
                  >
                    <IoTrashOutline />
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

export default AllProductsAdmin;
