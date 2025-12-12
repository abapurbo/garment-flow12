import React, { useState } from "react";
import { FaStripe, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router";

const ProductDetails = () => {
  const navigate = useNavigate();

  const product = {
    name: "Short Straight Blazer",
    description:
      "This Premium Cotton T-Shirt is crafted for those who prioritize comfort, durability, and style in their everyday wear.",
    category: "Blazer",
    price: 350,
    quantity: 120,
    minOrder: 5,
    paymentOptions:"Cash on Delivery"
  };

  const user = {
    loggedIn: true,
    role: "buyer",
  };

  const canOrder = user.loggedIn && user.role === "buyer";

  const handleRedirectOrderForm = () => {
    if (!canOrder) return;
    navigate("/orderForm", { state: { paymentMethod: selectedPayment } });
  };

  return (
    <div className="min-h-screen px-16 pt-16 md:pt-34 md:pb-16">
      <div className="max-w-6xl mx-auto bg-blue-50/70 backdrop-blur-xl border border-blue-100 hover:shadow-2xl rounded-xs p-10 flex gap-12">

        {/* IMAGE GALLERY */}
        <div className="space-y-2">
          <div className="rounded-2xl w-[400px] overflow-hidden shadow-xl border border-blue-100 bg-white/40 backdrop-blur-md">
            <img
              src="https://i.ibb.co/7t7wrMkb/istockphoto-1516524215-612x612-removebg-preview.png"
              alt={product.name}
              className="object-cover hover:scale-125 duration-1000 w-full h-[300px]"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-gray-700 text-lg">
                  <span className="text-black font-bold">Category:</span> {product.category}
                </p>

                <p className="text-2xl text-blue-600 font-bold mt-2">
                  <span className="text-black font-bold">Price:</span> ${product.price}
                </p>
              </div>

              <div className="bg-blue-50/60 backdrop-blur-lg border border-blue-200 rounded-xl p-4 shadow-md">
                <div className="flex gap-2 text-lg">
                  <p className="text-black font-bold">Available Quantity:</p>
                  <p className="text-gray-900 font-semibold">{product.quantity}</p>
                </div>

                <div className="flex gap-2 text-lg mt-1">
                  <p className="text-black font-bold">Minimum Order:</p>
                  <p className="text-gray-900 font-semibold">{product.minOrder}</p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="flex gap-4">

                <span
                  className='flex text-xs items-center bg-green-100 text-green-500 gap-2 px-4 py-2 rounded-xl font-semibold  transition-all duration-200'
                >
                  {product.paymentOptions === 'Stripe Payment' ? <FaStripe /> : <FaMoneyBillWave />}
                  Cash on Delivery
                </span>

              </div>
            </div>
          </div>

          {/* ORDER BUTTON */}
          <button
            disabled={!canOrder}
            onClick={handleRedirectOrderForm}
            className={`w-full py-3 mt-4 text-lg font-semibold rounded-xl transition-all duration-300 
              ${canOrder
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {user.loggedIn
              ? canOrder
                ? "Order Now"
                : "Order Not Allowed"
              : "Login to Order"}
          </button>
        </div>
      </div>

      {/* PRODUCT DETAILS SECTION */}
      <div className="mt-10 max-w-6xl mx-auto bg-blue-50/70 backdrop-blur-xl border border-blue-200 p-8 rounded-xs hover:shadow-2xl">
        <h1 className="text-black font-bold text-3xl mb-3">Product Details</h1>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
