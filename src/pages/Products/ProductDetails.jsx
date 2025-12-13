import React, { useState } from "react";
import { FaStripe, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const ProductDetails = () => {
  const navigate = useNavigate();

  // Product Info
  const product = {
    name: "Short Straight Blazer",
    description:
      "This Premium Cotton T-Shirt is crafted for those who prioritize comfort, durability, and style in their everyday wear.",
    category: "Blazer",
    price: 350,
    quantity: 120,
    minOrder: 5,
    paymentOptions: "Cash on Delivery",
  };

  // User Info (Dummy)
  const user = {
    loggedIn: true,
    role: "buyer",
    name: "Apurbo Sarker",
  };

  const canOrder = user.loggedIn && user.role === "buyer";

  // Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahim Uddin",
      rating: 5,
      comment: "Excellent quality blazer. Highly recommended!",
    },
    {
      id: 2,
      name: "Karim Ahmed",
      rating: 4,
      comment: "Good fabric and fitting. Worth the price.",
    },
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });

  // Handlers
  const handleRedirectOrderForm = () => {
    if (!canOrder) return;
    navigate("/orderForm");
  };

  const handleRating = (value) => {
    setNewReview({ ...newReview, rating: value });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!newReview.rating || !newReview.comment) return;

    const reviewData = {
      id: Date.now(),
      name: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviews([reviewData, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
  };

  return (
    <div className="min-h-screen px-16 pt-16 md:pt-28 pb-16">
      {/* PRODUCT CARD */}
      <div className="max-w-6xl mx-auto bg-blue-50/70 backdrop-blur-xl border border-blue-100 rounded-xl p-10 flex gap-12">

        {/* IMAGE */}
        <div>
          <div className="rounded-2xl w-[400px] overflow-hidden shadow-xl bg-white">
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
            <h1 className="text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-lg">
                  <span className="font-bold">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-2xl text-blue-600 font-bold mt-2">
                  <span className="text-black font-bold">Price:</span> $
                  {product.price}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-md">
                <p className="text-lg">
                  <span className="font-bold">Available:</span>{" "}
                  {product.quantity}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Minimum Order:</span>{" "}
                  {product.minOrder}
                </p>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-xl font-semibold">
                <FaMoneyBillWave />
                Cash on Delivery
              </span>
            </div>
          </div>

          {/* ORDER BUTTON */}
          <button
            disabled={!canOrder}
            onClick={handleRedirectOrderForm}
            className={`w-full py-3 mt-6 text-lg font-semibold rounded-xl transition-all
              ${
                canOrder
                  ? "bg-blue-600 text-white hover:bg-blue-700"
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

      {/* PRODUCT DETAILS */}
      <div className="mt-10 max-w-6xl mx-auto bg-blue-50 border border-blue-200 p-8 rounded-xl">
        <h1 className="font-bold text-3xl mb-3">Product Details</h1>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-10 max-w-6xl mx-auto bg-white border border-blue-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        {/* Reviews List */}
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 rounded-xl bg-blue-50"
            >
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* ADD REVIEW */}
        {user.loggedIn && user.role === "buyer" && (
          <form onSubmit={handleSubmitReview} className="mt-8">
            <h3 className="text-xl font-semibold mb-3">
              Write a Review
            </h3>

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  onClick={() => handleRating(value)}
                  className={`cursor-pointer text-2xl ${
                    value <= newReview.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              required
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({
                  ...newReview,
                  comment: e.target.value,
                })
              }
              placeholder="Write your review..."
              className="w-full textarea textarea-bordered mb-4"
            />

            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
