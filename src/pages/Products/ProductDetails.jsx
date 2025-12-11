import React from "react";
import { FaStripe } from "react-icons/fa";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();

  // 🔥 Fake Static JSON
  const product = {
    id: "1",
    name: "Premium Cotton T-Shirt",
    image: "https://i.ibb.co/0VZc6Ns/tshirt.jpg",
    description:
      "This Premium Cotton T-Shirt is crafted for those who prioritize comfort, durability, and style in their everyday wear. Made from high-quality, breathable soft cotton, this T-shirt delivers a lightweight yet premium feel that keeps you comfortable throughout the day. Whether you're going out for a casual walk, heading to work, or simply relaxing at home, this T-shirt ensures you always feel fresh and confident.",
    category: "T-Shirt",
    price: 350,
    quantity: 120,
    minOrder: 5,
    paymentOptions: ["Stripe Payment"],
  };

  // Fake logged-in user
  const user = {
    loggedIn: true,
    role: "User", // User | Admin | Manager
  };

  if (!product) return <p className="text-center py-20">Product Not Found</p>;

  const { name, image, description, category, price, quantity, minOrder } = product;

  // Order access rule
  const canOrder = user.loggedIn && user.role !== "Admin" && user.role !== "Manager";

  return (
    <div className="pt-32 px-4 md:px-12 pb-16 bg-blue-50 min-h-screen">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">

        {/* LEFT SIDE IMAGE */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="rounded-2xl w-full object-cover shadow-lg"
          />
          <span className="absolute top-4 left-4 bg-black text-white px-4 py-1 rounded-full text-sm shadow">
            Garments Collection
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          <h1 className="text-4xl font-bold text-gray-800">{name}</h1>

          <p className="text-gray-600 leading-relaxed">{description}</p>

          <div className="space-y-1">
            <p className="font-medium text-gray-700">
              <span className="font-bold">Category:</span> {category}
            </p>

            <p className="text-3xl font-bold text-green-600">
              {price} BDT
            </p>
          </div>

          {/* Quantity */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <p className="text-gray-700">
              <span className="font-semibold">Available Quantity:</span>{" "}
              {quantity}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Minimum Order:</span>{" "}
              {minOrder}
            </p>
          </div>

          {/* Stripe Payment Option */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Payment Method:</h3>

            <div className="flex gap-3  items-center">
              <span className="text-4xl text-blue-400 bg-blue-100 px-4  rounded-full">
                <FaStripe />
              </span>
              <span className="text-gray-800 font-medium">
                Stripe Secure Checkout
              </span>
            </div>
          </div>

          {/* ORDER BUTTON */}
          <button
            disabled={!canOrder}
            onClick={() => {
              if (canOrder) {
                alert("Booking Form Open"); // placeholder
              }
            }}
            className={`btn btn-primary w-full text-lg rounded-xl mt-3 transition ${!canOrder ? "btn-disabled cursor-not-allowed" : ""
              }`}
          >
            {user.loggedIn
              ? user.role === "Admin" || user.role === "Manager"
                ? "Order Not Allowed"
                : "Order Now"
              : "Login to Order"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
