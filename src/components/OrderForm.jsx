import React from "react";
import { useForm } from "react-hook-form";

export default function OrderForm() {
  // Static JSON data for demo
  const user = {
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
  };

  const product = {
    title: "Awesome Product",
    price: 50,
    availableQuantity: 100,
    minQuantity: 1,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      quantity: product.minQuantity,
      contactNumber: "",
      deliveryAddress: "",
      notes: "",
    },
  });

  const quantity = watch("quantity");
  const orderPrice = quantity * product.price;

  const onSubmit = (data) => {
    const orderData = {
      email: user.email,
      productTitle: product.title,
      price: product.price,
      orderPrice,
      ...data,
    };
    console.log("Order Submitted:", orderData);
    alert("Order submitted! Check console for data.");
  };

  return (
    <div className="pt-34 pb-16 bg-gray-50">
      <div className="max-w-5xl mx-auto p-8 bg-white hover:shadow-2xl  rounded-xs border border-gray-200">
        <h2 className="text-4xl font-bold text-blue-500 mb-10 text-center">Order Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Product Title */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Product Title</label>
            <input
              type="text"
              value={product.title}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Price / Payment Info</label>
            <input
              type="text"
              value={`$${product.price}`}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Order Quantity */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Order Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: product.minQuantity, message: `Minimum quantity is ${product.minQuantity}` },
                max: { value: product.availableQuantity, message: `Maximum quantity is ${product.availableQuantity}` },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.quantity && <p className="text-red-500 mt-1">{errors.quantity.message}</p>}
            <small className="text-gray-500">Min: {product.minQuantity}, Max: {product.availableQuantity}</small>
          </div>

          {/* Order Price */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Order Price</label>
            <input
              type="text"
              value={`$${orderPrice}`}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-blue-400 font-semibold mb-2">Contact Number</label>
            <input
              type="text"
              {...register("contactNumber", { required: "Contact Number is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.contactNumber && <p className="text-red-500 mt-1">{errors.contactNumber.message}</p>}
          </div>

          {/* Delivery Address */}
          <div className="col-span-2">
            <label className="block text-blue-400 font-semibold mb-2">Delivery Address</label>
            <textarea
              {...register("deliveryAddress", { required: "Delivery Address is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={1}
            />
            {errors.deliveryAddress && <p className="text-red-500 mt-1">{errors.deliveryAddress.message}</p>}
          </div>

          {/* Additional Notes */}
          <div className="col-span-2">
            <label className="block text-blue-400 font-semibold mb-2">Additional Notes / Instructions</label>
            <textarea
              {...register("notes")}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={1}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
