import React, { useState } from "react";
import { FaBox, FaBoxOpen, FaTruck, FaMotorcycle, FaClock } from "react-icons/fa";

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
    <div className="min-h-screen p-6 bg-white  rounded-xs shadow-2xl dark:dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Track Your Order
        </h2>

        {/* Order ID Input */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Enter Order ID"
            className="input input-bordered w-full sm:w-1/2"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Track
          </button>
        </form>

        {/* Timeline */}
        {staticTrackingData.length > 0 && (
          <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center  p-3 gap-8">
            {staticTrackingData.map((step, index) => {
              const isLatest = index === staticTrackingData.length - 1;
              return (
                <div key={index} className="flex flex-col  items-center text-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-2 ${step.color}`}>
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <h3 className={`font-semibold ${isLatest ? "text-gray-800 dark:text-gray-100" : "text-gray-600 dark:text-gray-300"}`}>
                    {step.status}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.dateTime}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.location}</p>
                  {index < trackingData.length - 1 && (
                    <div className="hidden md:block h-1 bg-gray-300 dark:bg-gray-600 w-full mt-4"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Map Placeholder */}
        {trackingData.length > 0 && (
          <div className="mt-12 h-64 rounded-xl bg-gray-200 dark:bg-purple-800 flex items-center justify-center text-gray-500 dark:text-gray-300">
            Map Section (Skipped)
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderTimeline;
