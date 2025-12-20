import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

export default function ViewDetails({ productId, trackingId }) {
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !trackingId) return;

    axiosSecure
      .get(`/orders/${productId}?trackingId=${trackingId}`)
      .then((res) => {
        setOrder(res.data.orderDetails);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId, trackingId, axiosSecure]);
  if (loading) return <Loading />;

  if (!order) {
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Order details not found
      </p>
    );
  }

  const {
    productName,
    quantity,
    amount,
    paymentMethod,
    tracking = [],
    createdAt,
  } = order;

  const currentStatus =
    tracking.length > 0 ? tracking[tracking.length - 1].status : "Pending";

  return (
    <div className="max-w-5xl mt-2  mx-auto p-6  bg-blue-50 dark:bg-gray-900 rounded-xl shadow-md dark:shadow-gray-800">
      {/* Header */}
      <h2 className="text-3xl font-bold text-blue-600 dark:text-purple-400 mb-6">
        Order Details
      </h2>

      {/* Order Info */}
      <div className="flex justify-between gap-2 mb-10">
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Product:</span> {productName}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {quantity}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span> ${amount}
          </p>
        </div>

        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Payment Method:</span>
            {paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Order Date:</span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
          <p className="flex items-center justify-left gap-1 ">
            <span className="font-semibold ">Current Status:</span>
            <span className="px-3  py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              {currentStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Tracking Timeline
        </h3>

        {tracking.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No tracking updates yet
          </p>
        ) : (
          <div className="relative border-l-2 border-blue-500 dark:border-purple-500 pl-6 space-y-8">
            {tracking.map((item, index) => {
              // Convert createdAt to readable date & time
              const dateObj = new Date(item.createdAt);
              const formattedDate = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY
              const formattedTime = dateObj.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              });

              return (
                <div key={index} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-500 dark:bg-purple-500"></span>

                  {/* Card */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
                    <p className="font-semibold text-blue-600 dark:text-purple-400">
                      {item.status}
                    </p>

                    {item.message && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.message}
                      </p>
                    )}

                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {formattedDate} at {formattedTime}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}
