import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Map from "./Map";
import Loading from "../../../components/Loading";

const TrackOrderTimeline = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  // fetch tracking
  useEffect(() => {
    if (!orderId || orderId.trim().length < 4) {
      setTrackingData([]);
      setError("");
      return;
    }

    setLoading(true);

    axiosSecure
      .get(`/buyer/trackOrders?searchTrackingId=${orderId}`)
      .then((res) => {
        setTrackingData(res.data.data || []);
        setError("");
      })
      .catch((err) => {
        setTrackingData([]);
        setError(err.response?.data?.message || "Order not found");
      })
      .finally(() => setLoading(false));
  }, [orderId, axiosSecure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* ---------- HEADER ---------- */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Track Your Order
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your tracking ID to see real-time order updates
          </p>
        </div>

        {/* ---------- INPUT ---------- */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="ORD-20251220-E9B915"
            className="w-full max-w-xl px-5 py-4 rounded-xl border
              border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-900
              text-gray-800 dark:text-white
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>

        {/* ---------- LOADING ---------- */}
        {loading && (
          <div className="flex flex-col items-center mt-16 text-gray-500">
          <Loading></Loading>
            <p className="mt-3">Tracking your order...</p>
          </div>
        )}

        {/* ---------- ERROR ---------- */}
        {!loading && error && (
          <p className="text-center text-red-500 font-medium mt-6">
            {error}
          </p>
        )}

        {/* ---------- DEFAULT EMPTY STATE ---------- */}
        {!loading && !error && trackingData.length === 0 && (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            <FaBox className="text-7xl mx-auto mb-5 opacity-40" />
            <p className="text-lg font-semibold">
              Track your order status
            </p>
            <p className="text-sm mt-1">
              Example: <span className="font-medium">ORD-20251220-E9B915</span>
            </p>
          </div>
        )}

        {/* ---------- TIMELINE ---------- */}
        {trackingData.length > 0 && (
          <>
            <div className="relative border-l-2 border-blue-500 ml-4 space-y-8">
              {trackingData.map((item, index) => {
                const date = new Date(item.createdAt);

                return (
                  <div key={index} className="relative pl-10">
                    {/* dot */}
                    <span className="absolute left-[-10px] top-2 w-5 h-5 rounded-full bg-blue-500"></span>

                    {/* card */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow">
                      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {item.status}
                      </h3>

                      {item.location && (
                        <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <FaMapMarkerAlt />
                          {item.location}
                        </p>
                      )}

                      <p className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                        <FaClock />
                        {date.toLocaleDateString()} ·{" "}
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------- MAP ---------- */}
            <div className="mt-12 rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <Map />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackOrderTimeline;
