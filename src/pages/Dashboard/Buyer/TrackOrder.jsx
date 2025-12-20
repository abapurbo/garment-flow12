import React, { useState } from "react";
import { FaBox, FaBoxOpen, FaTruck, FaMotorcycle, FaClock } from "react-icons/fa";
import Map from "./Map";

const staticTrackingData = [
  {
    status: "Cutting Completed",
    dateTime: "2025-12-17 09:00 AM",
    location: "Cutting Section, Gazipur",
    icon: <FaBox className="text-white" />,
    color: "bg-red-500",
  },
  {
    status: "Sewing Started",
    dateTime: "2025-12-17 11:00 AM",
    location: "Sewing Unit, Gazipur",
    icon: <FaBoxOpen className="text-white" />,
    color: "bg-yellow-400",
  },
  {
    status: "Finishing",
    dateTime: "2025-12-17 02:00 PM",
    location: "Finishing Unit, Gazipur",
    icon: <FaTruck className="text-white" />,
    color: "bg-green-400",
  },
  {
    status: "Packed",
    dateTime: "2025-12-17 04:00 PM",
    location: "Warehouse, Gazipur",
    icon: <FaMotorcycle className="text-white" />,
    color: "bg-teal-400",
  },
  {
    status: "Shipped / Out for Delivery",
    dateTime: "2025-12-17 06:00 PM",
    location: "Delivery Center, Gazipur",
    icon: <FaClock className="text-white" />,
    color: "bg-blue-500",
  },
];

const TrackOrderTimeline = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState([]);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) return;
    setTrackingData(staticTrackingData);
  };

  return (
    <div className="min-h-screen px-6  bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
          Track Your Order
        </h2>

        {/* Order ID Input */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="Enter Order ID"
            className="input input-bordered w-full sm:w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white transition-all duration-300"
          >
            Track
          </button>
        </form>

        {/* Timeline */}
        {trackingData.length > 0 && (
          <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8 p-4">
            {trackingData.map((step, index) => {
              const isLatest = index === trackingData.length - 1;
              return (
                <div key={index} className="flex flex-col items-center text-center relative">
                  {/* Connector Line */}
                  {index < trackingData.length - 1 && (
                    <div className="absolute md:top-12 md:left-12 w-1 md:w-24 h-24 border-l-2 md:border-l-0 md:border-t-2 border-gray-300 dark:border-gray-600"></div>
                  )}

                  {/* Circle Icon */}
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 shadow-lg ${step.color} transition-transform hover:scale-110`}>
                    <span className="text-4xl">{step.icon}</span>
                  </div>

                  {/* Status */}
                  <h3 className={`font-semibold text-lg mb-1 ${isLatest ? "text-gray-800 dark:text-gray-100" : "text-gray-600 dark:text-gray-300"}`}>
                    {step.status}
                  </h3>

                  {/* Date & Location */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.dateTime}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{step.location}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Map Placeholder */}
        {trackingData.length > 0 && (
          <div className="mt-12   h-[400px] rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300 shadow-inner">
            {/* static map */}
            <Map></Map>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderTimeline;
