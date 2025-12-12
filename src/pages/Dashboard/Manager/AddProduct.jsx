import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      availableQty: "",
      minOrderQty: "",
      demoLink: "",
      paymentOption: "",
      showOnHome: false,
    }
  });

  const [previewImages, setPreviewImages] = useState('');

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Product submitted (static version)");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImages(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-3xl text-blue-500 text-center  font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

        {/* Product Name */}
        <div>
          <input
            type="text"
            placeholder="Product Name / Title"
            {...register("name", { required: "Product name is required" })}
            className="w-full input input-bordered"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Description (col-span-2) */}
        <div className="col-span-2">
          <textarea
            placeholder="Product Description"
            {...register("description", { required: "Description is required" })}
            className="w-full textarea textarea-bordered"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            placeholder="Price"
            {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be > 0" } })}
            className="w-full input input-bordered"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Available Quantity */}
        <div>
          <input
            type="number"
            placeholder="Available Quantity"
            {...register("availableQty", { required: "Available quantity is required", min: 1 })}
            className="w-full input input-bordered"
          />
          {errors.availableQty && <p className="text-red-500 text-sm">{errors.availableQty.message}</p>}
        </div>

        {/* Minimum Order Quantity */}
        <div>
          <input
            type="number"
            placeholder="Minimum Order Quantity (MOQ)"
            {...register("minOrderQty", { required: "MOQ is required", min: 1 })}
            className="w-full input input-bordered"
          />
          {errors.minOrderQty && <p className="text-red-500 text-sm">{errors.minOrderQty.message}</p>}
        </div>

        {/* Payment Options */}
        <div>
          <select
            {...register("paymentOption", { required: "Payment option is required" })}
            className="w-full select select-bordered"
          >
            <option value="">Select Payment Option</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          {errors.paymentOption && <p className="text-red-500 text-sm">{errors.paymentOption.message}</p>}
        </div>

        {/* Images Upload (col-span-2) */}
        <div className="col-span-2">
          <input
            type="file"
            multiple
            {...register("images", { required: "At least one image is required" })}
            onChange={handleImageChange}
            className="w-full file-input file-input-bordered"
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}

          {/* Preview */}
          <div className="flex gap-2 mt-2 flex-wrap">

            {previewImages ? <img src={previewImages} alt="preview" className="w-20 h-20 object-cover rounded" /> : ''}
          </div>
        </div>

        {/* Demo Video Link (col-span-2) */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Demo Video Link (optional)"
            {...register("demoLink")}
            className="w-full input input-bordered"
          />
        </div>

        {/* Show on Home Page (col-span-2) */}
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            {...register("showOnHome")}
            className="checkbox"
          />
          <span>Show on Home Page</span>
        </div>

        {/* Submit (col-span-2) */}
        <div className="col-span-2">
          <button type="submit" className="btn btn-primary w-full mt-2">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
