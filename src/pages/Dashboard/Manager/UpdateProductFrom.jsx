import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const UpdateProductForm = ({ updateFrom }) => {
  const [previewImages, setPreviewImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      minOrderQty: "",
      availableQty: "",
      category: "",
      description: "",
      paymentOption: "",
      demoLink: "",
      showOnHome: false,
    },
  });

  /* =========================
     Reset form when data comes
  ========================== */
  useEffect(() => {
    if (updateFrom) {
      reset({
        name: updateFrom.name,
        price: updateFrom.price,
        minOrderQty: updateFrom.minOrderQty,
        availableQty: updateFrom.availableQty,
        category: updateFrom.category,
        description: updateFrom.description,
        paymentOption: updateFrom.paymentOption,
        image:updateFrom.image,
        demoLink: updateFrom.demoLink || "",
        showOnHome: updateFrom.showOnHome || false,
      });

      // existing image preview
      if (updateFrom.image) {
        setPreviewImages(updateFrom.image);
      }
    }
  }, [updateFrom, reset]);

  /* =========================
     Handle new image preview
  ========================== */
  const handleImagePreview = (e) => {
    const files =e.target.files[0];
    console.log(files)
    const previews = URL.createObjectURL(files)
    setPreviewImages(previews);
  };

  /* =========================
     Submit
  ========================== */
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
      {/* Name */}
      <input
        {...register("name", { required: "Product name is required" })}
        placeholder="Product Name"
        className="input input-bordered"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      {/* Category */}
      <select
        {...register("category", { required: "Category is required" })}
        className="select select-bordered"
      >
        <option value="">Select Category</option>
        <option value="Shirt">Shirt</option>
        <option value="Pant">Pant</option>
        <option value="Jacket">Jacket</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Description */}
    <div className="col-span-2">
        <textarea
        {...register("description", { required: "Description is required" })}
        placeholder="Description"
        rows={3}
        className="textarea textarea-bordered w-full"
      />
    </div>

      {/* Price */}
      <input
        type="number"
        {...register("price", { required: "Price required" })}
        placeholder="Price"
        className="input input-bordered"
      />

      {/* Available Qty */}
      <input
        type="number"
        {...register("availableQty", { required: true })}
        placeholder="Available Quantity"
        className="input input-bordered"
      />

      {/* MOQ */}
      <input
        type="number"
        {...register("minOrderQty", { required: true })}
        placeholder="Minimum Order Quantity"
        className="input input-bordered"
      />

      {/* Payment */}
      <select
        {...register("paymentOption", { required: true })}
        className="select select-bordered"
      >
        <option value="">Select Payment</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Stripe">Stripe</option>
      </select>

      {/* Images */}
      <div className="col-span-2">
        <input
          type="file"
          defaultValue={updateFrom.image}
          {...register("image")}
          onChange={handleImagePreview}
          className="file-input file-input-bordered w-full"
        />

        {/* Preview Images */}
        {previewImages && (
          <div className="flex gap-3 mt-3 flex-wrap">
            
              <img
                src={previewImages}
                alt="preview"
                className="w-20 h-20 rounded object-cover border"
              />
          
          </div>
        )}
      </div>

      {/* Demo Link */}
      <div className=" col-span-2">
        <input
          type="url"
          {...register("demoLink")}
          placeholder="Demo video link"
          className="input input-bordered w-full"
        />
      </div>

      {/* Show On Home */}
      <div className="col-span-2 flex items-center gap-2">
        <input type="checkbox" {...register("showOnHome")} className="checkbox" />
        <span>Show on Home Page</span>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary col-span-2">
        Update Product
      </button>
    </form>
  );
};
