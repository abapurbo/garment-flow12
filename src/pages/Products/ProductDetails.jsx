import React, { useEffect, useState } from "react";
import { FaStripe, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GiStripedSun } from "react-icons/gi";
import { useRole } from "../../hooks/useRole";
import { useAuth } from "../../hooks/useAuth";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({})
  const { role, status } = useRole()
  const { user } = useAuth()
  const { name, category, price, paymentOption, image, minOrderQty, availableQty, description } = details || {}
  const axiosSecure = useAxiosSecure()
  useEffect(() => {
    axiosSecure.get(`/product-details/${id}`)
      .then(res => {
        setDetails(res.data)
      })
  }, [id])



  const canOrder = user?.email && role === "buyer" && status === 'approved';

  const handleOrder = () => {
    navigate(`/orderForm/${id}`)
  }



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

  return (
    <div className="min-h-screen  px-4 sm:px-6 md:px-16 pt-16 mt-14 md:pt-28 pb-16 bg-gray-50 dark:bg-gray-900">

      {/* PRODUCT CARD */}
      <div className="max-w-6xl mx-auto bg-blue-50/70 dark:bg-gray-800 backdrop-blur-xl border border-blue-100 dark:border-purple-500/30 rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12 text-gray-900 dark:text-gray-100">

        {/* IMAGE */}
        <div className="md:flex-shrink-0">
          <div className="rounded-2xl w-full md:w-[400px] overflow-hidden shadow-xl bg-white dark:bg-gray-700">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-64 md:h-[300px] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
              <div>
                <p className="text-lg">
                  <span className="font-bold">Category:</span>{" "} {category}
                </p>
                <p className="text-2xl sm:text-2xl text-blue-600 dark:text-purple-400 font-bold mt-2">
                  <span className="text-gray-900 dark:text-gray-100 font-bold">Price:</span>{" "} ${price}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-purple-900/30 border border-blue-200 dark:border-purple-500/30 rounded-xl p-4 shadow-md">
                <p className="text-lg">
                  <span className="font-bold">Available:</span> {availableQty}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Minimum Order:</span> {minOrderQty}
                </p>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl font-semibold">
                {paymentOption === 'Stripe' ? <GiStripedSun /> : <FaMoneyBillWave />} {paymentOption}
              </span>
            </div>
          </div>

          {/* ORDER BUTTON */}
          {/* <button
            disabled={!canOrder}
            onClick={() => handleOrder()}
            className={`w-full py-3 mt-6 text-lg font-semibold rounded-xl transition-all
          ${canOrder
                ? "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              }`}
          >
            {user?.email ? canOrder ? "Order Now" : "Order Not Allowed" : "Login to Order"}
          </button> */}


          {/* ORDER BUTTON */}
         <button disabled={!canOrder} onClick={() => handleOrder()} className={`w-full py-3 mt-6 text-lg font-semibold rounded-xl transition-all ${canOrder ? "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"}`} > {user?.email ? canOrder ? "Order Now" : "Order Not Allowed" : "Login to Order"} </button>

          {/* SHOW REASON IF ORDER NOT ALLOWED */}
          {user?.email && (!canOrder || role !== "buyer") && (
            <p className="mt-2 text-sm text-red-500">
              {status === "pending" && "You cannot place orders because your account is pending verification."}
              {status === "blocked" && "You cannot place orders because your account is blocked. Contact support."}
              {role === "manager" && "Managers cannot place orders."}
              {role === "admin" && "Admins cannot place orders."}
            </p>
          )}

        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="mt-8 md:mt-10 max-w-6xl mx-auto bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-purple-500/30 p-6 md:p-8 rounded-xl text-gray-800 dark:text-gray-200">
        <h1 className="font-bold text-2xl sm:text-3xl mb-3">Product Details</h1>
        <p className="text-justify">{description}</p>
      </div>

      {/* REVIEWS */}
      <div className="mt-8 md:mt-10 max-w-6xl mx-auto bg-white dark:bg-gray-800 border border-blue-200 dark:border-purple-500/30 p-6 md:p-8 rounded-xl shadow-lg text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Customer Reviews</h2>

        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-blue-200 dark:border-purple-500/30 p-4 rounded-xl bg-blue-50 dark:bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* ADD REVIEW */}
        {user?.loggedIn && role === "buyer" && (
          <form className="mt-6 md:mt-8">
            <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  onClick={() => setNewReview({ ...newReview, rating: value })}
                  className={`cursor-pointer text-2xl ${value <= newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            <textarea
              required
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write your review..."
              className="w-full textarea textarea-bordered mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <button className="px-6 py-2 bg-blue-600 dark:bg-purple-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-purple-700">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>

  );
};

export default ProductDetails;
