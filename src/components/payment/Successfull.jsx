import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

export default function Successfull() {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({  
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        {/* Success Icon */}
        <FaCheckCircle className="text-green-500 mx-auto text-6xl mb-4" />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Payment Successful!
        </h1>

        {/* Info */}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Thank you for your purchase.
        </p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {paymentInfo.transactionId || "Loading..."}
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Tracking ID:</span>{" "}
            {paymentInfo.trackingId || "Loading..."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            My Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
