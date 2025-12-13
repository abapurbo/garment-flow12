import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const UpdateProductForm = ({ handleImageChange, previewImages }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const updatedProduct = {
      ...data,
      price: Number(data.price),
      availableQty: Number(data.availableQty),
      minOrderQty: Number(data.minOrderQty),
      showOnHome: data.showOnHome || false,
    };
    console.log("Updated Product:", updatedProduct);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[80vh] overflow-auto"
    >
      {/* Product Name */}
      <div>
        <input
          type="text"
          placeholder="Product Name / Title"
          {...register("name", { required: "Product name is required" })}
          className="w-full input input-bordered"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full select select-bordered"
        >
          <option value="">Select Category</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Jacket">Jacket</option>
          <option value="Accessories">Accessories</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="col-span-2">
        <textarea
          placeholder="Product Description"
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full textarea textarea-bordered"
          rows={3}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          placeholder="Price"
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be > 0" },
          })}
          className="w-full input input-bordered"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Available Quantity */}
      <div>
        <input
          type="number"
          placeholder="Available Quantity"
          {...register("availableQty", {
            required: "Available quantity is required",
            min: { value: 0, message: "Quantity cannot be negative" },
          })}
          className="w-full input input-bordered"
        />
        {errors.availableQty && (
          <p className="text-red-500 text-sm">{errors.availableQty.message}</p>
        )}
      </div>

      {/* Minimum Order Quantity */}
      <div>
        <input
          type="number"
          placeholder="Minimum Order Quantity (MOQ)"
          {...register("minOrderQty", {
            required: "MOQ is required",
            min: { value: 1, message: "MOQ must be > 0" },
          })}
          className="w-full input input-bordered"
        />
        {errors.minOrderQty && (
          <p className="text-red-500 text-sm">{errors.minOrderQty.message}</p>
        )}
      </div>

      {/* Payment Options */}
      <div>
        <select
          {...register("paymentOption", {
            required: "Payment option is required",
          })}
          className="w-full select select-bordered"
        >
          <option value="">Select Payment Option</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Stripe">Online Payment (Stripe)</option>
        </select>
        {errors.paymentOption && (
          <p className="text-red-500 text-sm">{errors.paymentOption.message}</p>
        )}
      </div>

      {/* Images Upload */}
      <div className="col-span-2">
        <input
          type="file"
          multiple
          {...register("image", { required: "At least one image is required" })}
          onChange={handleImageChange}
          className="w-full file-input file-input-bordered"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}

        {/* Preview */}
        {previewImages && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Demo Video Link */}
      <div className="col-span-2">
        <input
          type="url"
          placeholder="Demo Video Link (optional)"
          {...register("demoLink")}
          className="w-full input input-bordered"
        />
      </div>

      {/* Show on Home Page */}
      <div className="col-span-2 flex items-center gap-2">
        <input type="checkbox" {...register("showOnHome")} className="checkbox" />
        <span>Show on Home Page</span>
      </div>

      {/* Submit */}
      <div className="col-span-2">
        <button type="submit" className="btn btn-primary w-full mt-2">
          Update Product
        </button>
      </div>
    </form>
  );
};
