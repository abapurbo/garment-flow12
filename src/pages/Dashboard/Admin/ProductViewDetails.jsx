import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

export default function ProductViewDetails({ productId, trackingId }) {
    const axiosSecure = useAxiosSecure();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId || !trackingId) return;

        axiosSecure
            .get(`/orders/details/${productId}?trackingId=${trackingId}`)
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
        transactionId,
        userName,
        contactNumber,
        buyerEmail,
        productName,
        quantity,
        amount,
        paymentStatus,
        paidAt,
        orderDate,
        status,
        notes,
        deliveryAddress,
        paymentMethod,
        trackingId: orderTrackingId,
        cancelledAt,
        tracking = [],
        createdAt,
    } = order || {};

    const currentStatus =
        tracking.length > 0 ? tracking[tracking.length - 1].status : status || "Pending";

    return (
        <div className="mt-6 mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-gray-800">
            {/* Header */}
            <h2 className="text-3xl font-bold text-blue-600 text-center dark:text-purple-400 mb-6">
                Product Order Details
            </h2>

            {/* Order Info */}
            <div className="flex justify-between gap-4 mb-10">
                <div className="space-y-2 text-gray-700 dark:text-gray-300 b">

                    <p>

                        <span className="font-semibold">User Email:</span> {userName}
                    </p>
                    <p>

                        <span className="font-semibold">User Email:</span> {buyerEmail}
                    </p>
                    <p>

                        <span className="font-semibold">User Email:</span> {contactNumber}
                    </p>
                    <p>
                        <span className="font-semibold">Product:</span> {productName}
                    </p>
                    <p>
                        <span className="font-semibold">Quantity:</span> {quantity}
                    </p>
                    <p>
                        <span className="font-semibold">Total Price:</span> ${amount}
                    </p>
                    <p><span className="font-semibold">Notes:</span> {notes}</p>
                    <p><span className="font-semibold">Delivery Address:</span> {deliveryAddress}</p>
                </div>

                <div className="space-y-2 text-gray-700 dark:text-gray-300 ">
                    <p>
                        <span className="font-semibold">Transaction ID:</span> {transactionId}
                    </p>
                    <p>
                        <span className="font-semibold">Order ID:</span> {orderTrackingId}
                    </p>
                    <p>
                        <span className="font-semibold">Payment Status:</span> {paymentStatus}
                    </p>
                    <p>
                        <span className="font-semibold">Payment Method:</span> {paymentMethod}
                    </p>
                    <p>
                        <span className="font-semibold">Paid At:</span> {paidAt ? new Date(paidAt).toLocaleString() : "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Order Date:</span> {orderDate ? new Date(orderDate).toLocaleString() : "N/A"}
                    </p>
                    {status === "Cancelled" && cancelledAt && (
                        <p className="text-red-600 dark:text-red-400">
                            <span className="font-semibold">Cancelled At:</span> {new Date(cancelledAt).toLocaleString()}
                        </p>
                    )}
                    <p className="flex items-center gap-2">
                        <span className="font-semibold">Current Status:</span>
                        <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold ${currentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                : currentStatus === "Approved"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                    : currentStatus === "Cancelled"
                                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                        >
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
                    <p className="text-gray-500 dark:text-gray-400">No tracking updates yet</p>
                ) : (
                    <div className="relative border-l-2 border-blue-500 dark:border-purple-500 pl-6 space-y-6">
                        {tracking.map((item, index) => (
                            <div key={index} className="relative">
                                {/* Dot */}
                                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-500 dark:bg-purple-500"></span>

                                {/* Card */}
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
                                    <p className="font-semibold text-blue-600 dark:text-purple-400">
                                        {item.status}
                                    </p>
                                    {item.message && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.message}</p>
                                    )}
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
