import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

export default function OrderDetails({ selectedOrderId }) {
  const axiosSecure = useAxiosSecure();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedOrderId) return;

    axiosSecure
      .get(`/buyer/order/details/${selectedOrderId}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedOrderId, axiosSecure]);

  if (loading) return <Loading />;

  if (!details) {
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Order details not found
      </p>
    );
  }

  const {
    trackingId,
    transactionId,
    userName,
    buyerEmail,
    productName,
    quantity,
    amount,
    currency,
    paymentStatus,
    paymentMethod,
    paidAt,
    orderDate,
    status,
    contactNumber,
    deliveryAddress,
    notes,
  } = details;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-800">
      {/* Header */}
      <h2 className="text-2xl font-bold text-blue-600 dark:text-purple-400 mb-6 text-center">
        Order Details
      </h2>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
        <div className="space-y-2">
          <p><span className="font-semibold">Order ID:</span> {trackingId}</p>
          <p><span className="font-semibold">Transaction ID:</span> {transactionId}</p>
          <p><span className="font-semibold">User Name:</span> {userName}</p>
          <p><span className="font-semibold">User Email:</span> {buyerEmail}</p>
          <p><span className="font-semibold">Product:</span> {productName}</p>
          <p><span className="font-semibold">Quantity:</span> {quantity}</p>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            {amount} {currency?.toUpperCase()}
          </p>
          <p><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
          <p><span className="font-semibold">Payment Status:</span> {paymentStatus}</p>
          <p><span className="font-semibold">Paid At:</span> {new Date(paidAt).toLocaleString()}</p>
          <p><span className="font-semibold">Order Date:</span> {new Date(orderDate).toLocaleString()}</p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold
                ${status === "Pending"
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                  : status === "Approved"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                }`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200 dark:border-gray-700" />

      {/* Extra Info */}
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-semibold">Contact Number:</span> {contactNumber}
        </p>
        <p>
          <span className="font-semibold">Delivery Address:</span> {deliveryAddress}
        </p>
        {notes && (
          <p>
            <span className="font-semibold">Additional Notes:</span> {notes}
          </p>
        )}
      </div>
    </div>
  );
}
