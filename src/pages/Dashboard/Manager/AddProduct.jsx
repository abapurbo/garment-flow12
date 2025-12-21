import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import axios from "axios";
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
  const canAddProduct = user?.email && role === "manager" && status === "approved";


  const onSubmit = (data) => {
    const image = data.image[0]

    const formData = new FormData();
    formData.append('image', image);
    const IMG_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imag_api_key}`

    axios.post(IMG_API_URL, formData)
      .then(res => {
        let imageURL = res.data.data.url
        const displayName = user?.displayName
        const newData = { ...data, image: imageURL, displayName }

        axiosSecure.post('/add-product', newData)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Product added successfully!",
                showConfirmButton: false,
                timer: 1500
              });
              reset()
              setPreviewImages('')
            }
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImages(URL.createObjectURL(file));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto p-6  rounded-lg mt-10 
      bg-white shadow dark:bg-gray-800 dark:shadow-lg">
        <h2 className="text-3xl text-blue-500 dark:text-purple-400 text-center font-bold mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid add-container md:grid-cols-2 grid-cols-1 gap-4">

          {/* Product Name */}
          <div className="col-span-2 md:col-span-1" >
            <input
              disabled={!canAddProduct}
              type="text"
              placeholder="Product Name / Title"
              {...register("name", { required: "Product name is required" })}
              className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Category */}
          <div className="col-span-2 md:col-span-1" >
            <select
              disabled={!canAddProduct}
              {...register("category", { required: "Category is required" })}
              className="w-full select select-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Description */}
          <div className="col-span-2 " >
            <textarea
              disabled={!canAddProduct}
              placeholder="Product Description"
              {...register("description", { required: "Description is required" })}
              className="w-full textarea textarea-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div className="col-span-2 md:col-span-1" >
            <input
              disabled={!canAddProduct}
              type="number"
              placeholder="Price"
              {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be > 0" } })}
              className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* Available Quantity */}
          <div className="col-span-2 md:col-span-1" >
            <input
              disabled={!canAddProduct}
              type="number"
              placeholder="Available Quantity"
              {...register("availableQty", { required: "Available quantity is required", min: 1 })}
              className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            {errors.availableQty && <p className="text-red-500 text-sm">{errors.availableQty.message}</p>}
          </div>

          {/* Minimum Order Quantity */}
          <div className="col-span-2 md:col-span-1" >
            <input
              disabled={!canAddProduct}
              type="number"
              placeholder="Minimum Order Quantity (MOQ)"
              {...register("minOrderQty", { required: "MOQ is required", min: 1 })}
              className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            {errors.minOrderQty && <p className="text-red-500 text-sm">{errors.minOrderQty.message}</p>}
          </div>

          {/* Payment Options */}
          <div className="col-span-2 md:col-span-1" >
            <select
              disabled={!canAddProduct}
              {...register("paymentOption", { required: "Payment option is required" })}
              className="w-full select select-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Payment Option</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Stripe">Online Payment (Stripe)</option>
            </select>
            {errors.paymentOption && <p className="text-red-500 text-sm">{errors.paymentOption.message}</p>}
          </div>

          {/* Images Upload */}
          <div className="col-span-2">
            <input
              disabled={!canAddProduct}
              type="file"
              multiple
              {...register("image", { required: "At least one image is required" })}
              onChange={handleImageChange}
              className="w-full file-input file-input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

            {/* Preview */}
            {
              previewImages && <div className="flex gap-2  border w-fit  rounded-xl mt-2 flex-wrap">
                {previewImages && <img src={previewImages} alt="preview" className="w-20 h-20 object-cover rounded" />}
              </div>
            }
          </div>

          {/* Demo Video Link */}
          <div className="col-span-2">
            <input
              disabled={!canAddProduct}
              type="url"
              placeholder="Demo Video Link (optional)"
              {...register("demoLink")}
              className="w-full input input-bordered bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Show on Home Page */}
          <div className="col-span-2 flex items-center gap-2">
            <input
              disabled={!canAddProduct}
              type="checkbox"
              {...register("showOnHome")}
              className="checkbox checkbox-primary"
            />
            <span className="text-gray-900 dark:text-gray-100">Show on Home Page</span>
          </div>

          {/* Submit Button */}
          {canAddProduct ? (
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full btn dark:bg-purple-600 bg-blue-600"
              >
                Add Product
              </button>
            </div>
          ) : (
            <div className="col-span-2 mt-2">
              <p className="text-red-500 text-sm text-center font-medium">
                {role !== "manager" && "Only managers are allowed to add products."}

                {role === "manager" && status === "pending" &&
                  "Your manager account is pending approval. Please wait for admin approval."}

                {role === "manager" && status === "suspended" &&
                  "Your account has been suspended. Please check admin feedback in your profile."}
              </p>
            </div>
          )}


        </form>
      </div>
    </div>
  );
};

export default AddProduct;
