import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function TrackingView({ trackingId, closeModal }) {
    const axiosSecure = useAxiosSecure()
    const [tracking, setTracking] = useState([])
    // Sample tracking data
    // const tracking = [
    //     {
    //         status: "Cutting Completed",
    //         date: "2025-01-12",
    //         time: "10:30 AM",
    //         location: "Cutting Section",
    //         note: "Fabric cutting finished",
    //     },
    //     {
    //         status: "Sewing Started",
    //         date: "2025-01-14",
    //         time: "02:00 PM",
    //         location: "Line 3",
    //     },
    //     {
    //         status: "Finishing",
    //         date: "2025-01-16",
    //         time: "11:15 AM",
    //         location: "Finishing Unit",
    //     },
    // ];
    useEffect(() => {
        axiosSecure.get(`/trackings/${trackingId}`)
            .then(res => {
                setTracking(res.data)
            })
            .catch(err => console.log(err))

    }, [trackingId])

    return (
        <div className="p-6  max-w-xl mx-auto transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Tracking Timeline
                </h3>

            </div>

            {/* Timeline Items */}
            <div className="flex flex-col space-y-4">
                {tracking.map((item, index) => {
                    // Convert createdAt to readable date & time
                    const dateObj = new Date(item.createdAt);
                    const formattedDate = dateObj.toLocaleDateString("en-GB"); 
                    const formattedTime = dateObj.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    });

                    return (
                        <div key={index} className="flex items-start">
                            {/* Circle + Line */}
                            <div className="flex flex-col items-center mr-4">
                                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                                {index !== tracking.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-blue-300 dark:bg-blue-700"></div>
                                )}
                            </div>

                            {/* Card */}
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex-1 transition-colors">
                                <h4 className="text-blue-600 dark:text-blue-400 font-semibold">
                                    {item.status}
                                </h4>
                                <p className="text-gray-400 dark:text-gray-300 text-sm mt-1">
                                    {formattedDate} at {formattedTime}
                                </p>
                                {item.note && (
                                    <p className="text-gray-600 dark:text-gray-200 text-sm mt-1">
                                        {item.note}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}
