import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from '../components/Loading'
import Swal from "sweetalert2";

export default function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  // ----------------------------
  // Fetch product
  // ----------------------------
  useEffect(() => {
    axiosSecure.get(`/product-details/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const minQty = product.minOrderQty || 0;
  const availableQty = product.availableQty || 0;
  const quantity = Number(watch("quantity")) || 0;
  const orderPrice = quantity * (product.price || 0);

  const isOutOfStock = availableQty < minQty;

  // ----------------------------
  // Submit
  // ----------------------------
  const onSubmit = async (data) => {
    const qty = Number(data.quantity);

    if (qty < minQty) {
      toast.error(`Minimum order quantity is ${minQty}`);
      return;
    }

    if (qty > availableQty) {
      toast.error(`Only ${availableQty} items available`);
      return;
    }

    const orderData = {
      userName: data.firstName + ' ' + data.lastName,
      email: user.email,
      productId: id,
      quantity: qty,
      amount: orderPrice,
      paymentMethod: product.paymentOption,
      contactNumber: data.contactNumber,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
    };

    try {
      // ----------------------------
      // Stripe Payment
      // ----------------------------
      if (product.paymentOption === "Stripe") {
        const paymentInfo = {
          cost: orderPrice,
          productId: product._id,
          buyerEmail: user.email,
          productName: product.name,
          userName: data.firstName + ' ' + data.lastName,
          quantity: qty,
          deliveryAddress: data.deliveryAddress,
          notes: data.notes,
          contactNumber: data.contactNumber
        };

        Swal.fire({
          title: "Confirm Your Order",
          html: `
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${qty}</p>
            <p><strong>Total:</strong> $${orderPrice}</p>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Proceed to Payment",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const stripeRes = await axiosSecure.post(
              "/payment-checkout-session",
              paymentInfo
            );

            Swal.fire({
              title: "Redirecting...",
              text: "You are being redirected to secure payment",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });

            window.location.assign(stripeRes.data.url);
          }
        });
      }

      // ----------------------------
      // Cash On Delivery
      // ----------------------------
      else {
        Swal.fire({
          title: "Confirm Order",
          html: `
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${qty}</p>
            <p><strong>Total:</strong> $${orderPrice}</p>
            <p><strong>Payment:</strong> Cash on Delivery</p>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Place Order",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const orderRes = await axiosSecure.post("/orders/cod", orderData);

            toast.success(orderRes.data.message);
            reset();
            navigate("/dashboard/my-orders");

            Swal.fire({
              title: "Order Placed!",
              text: "Your order has been placed successfully.",
              icon: "success",
            });
          }
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  if (loading) return <Loading />;


  return (
    <div className="pt-34 pb-16 px-4  bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto md:p-8 p-6 bg-white dark:bg-gray-800 hover:shadow-2xl rounded-xs border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-blue-500 dark:text-purple-400 mb-10 text-center">
          Order Form
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Email */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
          </div>

          {/* Product Title */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Product Title
            </label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
          </div>

          {/* Price */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Payment Info
            </label>
            <input
              type="text"
              value={`${product.paymentOption}`}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
          </div>

          {/* First Name */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">Order Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: product.minOrderQty,
                  message: `Minimum order quantity is ${product.minOrderQty}`,
                },
                max: {
                  value: product.availableQty,
                  message: `Maximum available quantity is ${product.availableQty}`,
                },
              })}
              disabled={isOutOfStock}

              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
            {errors.quantity && (
              <p className="text-red-500 mt-1">
                {errors.quantity.message}
              </p>
            )}
            <small className="text-gray-500">
              Min: {minQty}, Available: {availableQty}
            </small>
          </div>
          {/* Order Price */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Order Price
            </label>
            <input
              type="text"
              value={`$${orderPrice}`}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
          </div>

          {/* Contact Number */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              {...register("contactNumber", { required: "Contact Number is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            />
            {errors.contactNumber && (
              <p className="text-red-500 mt-1">{errors.contactNumber.message}</p>
            )}
          </div>

          {/* Delivery Address */}
          <div className="col-span-2 ">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Delivery Address
            </label>
            <textarea
              {...register("deliveryAddress", { required: "Delivery Address is required" })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
              rows={1}
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 mt-1">{errors.deliveryAddress.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="block text-blue-400 dark:text-purple-300 font-semibold mb-2">
              Additional Notes / Instructions
            </label>
            <textarea
              {...register("notes")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
              rows={1}
            />
          </div>

          {/* Submit Button */}
          {/* Submit */}
          <div className="relative  col-span-2 ">
            <button
              type="submit"
              disabled={isOutOfStock}
              className={`w-full py-3 text-white rounded ${isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700 duration-1000"
                }`}
            >
              {isOutOfStock ? "Out of Stock" : "Submit Order"}
            </button>

            {/* Tooltip */}
            {isOutOfStock && (
              <span className="absolute text-[8px] top-0 right-0 mt-1 mr-2 bg-red-500 text-white md:text-sm px-2 py-1 rounded shadow-lg">
                Remaining quantity is below minimum order limit
              </span>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
