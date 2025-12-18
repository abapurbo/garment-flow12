import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import { useRole } from "../../../hooks/useRole";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const { role, status } = useRole()
  const [previewImages, setPreviewImages] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // check role and status 
  const canAddProduct = user?.email && role === "manager" && status === "active";

  // form submit handler (disabled)
  const onSubmit = (data) => {
    if (!canAddProduct) return; // block any action
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImages(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg mt-10 
      bg-white shadow dark:bg-gray-800 dark:shadow-lg">
      <h2 className="text-3xl text-blue-500 dark:text-purple-400 text-center font-bold mb-6">
        Add Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

        {/* Product Name */}
        <div>
          <input
            type="text"
            placeholder="Product Name / Title"
            {...register("name")}
            disabled={!canAddProduct}
            className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          />
        </div>

        {/* Category */}
        <div>
          <select
            {...register("category")}
            disabled={!canAddProduct}
            className="w-full select select-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          >
            <option value="">Select Category</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Jacket">Jacket</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <textarea
            placeholder="Product Description"
            {...register("description")}
            disabled={!canAddProduct}
            className="w-full textarea textarea-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            placeholder="Price"
            {...register("price")}
            disabled={!canAddProduct}
            className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          />
        </div>

        {/* Available Quantity */}
        <div>
          <input
            type="number"
            placeholder="Available Quantity"
            {...register("availableQty")}
            disabled={!canAddProduct}
            className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          />
        </div>

        {/* Minimum Order Quantity */}
        <div>
          <input
            type="number"
            placeholder="Minimum Order Quantity (MOQ)"
            {...register("minOrderQty")}
            disabled={!canAddProduct}
            className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          />
        </div>

        {/* Payment Options */}
        <div>
          <select
            {...register("paymentOption")}
            disabled={!canAddProduct}
            className="w-full select select-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          >
            <option value="">Select Payment Option</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Stripe">Online Payment (Stripe)</option>
          </select>
        </div>

        {/* Images Upload */}
        <div className="col-span-2">
          <input
            type="file"
            multiple
            {...register("image")}
            onChange={handleImageChange}
            disabled={!canAddProduct}
            className="w-full file-input file-input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          />
          {previewImages && <div className="flex gap-2 mt-2 flex-wrap">
            <img src={previewImages} alt="preview" className="w-20 h-20 object-cover rounded" />
          </div>}
        </div>

        {/* Demo Video Link */}
        <div className="col-span-2">
          <input
            type="url"
            placeholder="Demo Video Link (optional)"
            {...register("demoLink")}
            disabled={!canAddProduct}
            className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50"
          />
        </div>

        {/* Show on Home Page */}
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            {...register("showOnHome")}
            disabled={!canAddProduct}
            className="checkbox checkbox-primary cursor-not-allowed opacity-50"
          />
          <span className="text-gray-900 dark:text-gray-100">Show on Home Page</span>
        </div>

        {/* Status Message */}
        {!canAddProduct && (
          <div className="col-span-2 mt-2">
            <p className="text-red-500 text-sm text-center">
              {role !== "manager" && "Only managers can add products."}
              {role === "manager" && status === "pending" &&
                "Your manager account is pending approval by admin."}
              {role === "manager" && status === "suspended" &&
                "Your account is suspended. Please check admin feedback in your profile."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
