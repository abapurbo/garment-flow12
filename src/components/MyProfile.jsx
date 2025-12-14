import React from "react";
import { FaShoppingCart, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function MyProfile() {
    const user = {
        name: "Apurbo Sarker",
        email: "apurbo@example.com",
        role: "Buyer",
        status: "Active",
        totalOrders: 32,
        pendingOrders: 5,
        completedOrders: 25,
        cancelledOrders: 2,
        image: "https://i.ibb.co/YQ0Z6f7/profile.jpg",
    };

    return (
        <div className="min-h-screen mt-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-start p-6 font-urbanist">
            <div className="relative bg-white dark:bg-gray-800 flex flex-col items-center shadow-xl rounded-2xl p-8 w-full max-w-4xl">

                {/* Role Badge */}
                <p className="absolute right-6 top-6 bg-blue-100 dark:bg-purple-700 text-blue-700 dark:text-purple-300 px-4 py-1 rounded-full text-sm font-medium shadow">
                    {user.role}
                </p>

                {/* Profile Image */}
                <div className="absolute -top-16 flex justify-center w-full">
                    <img
                        src={user.image}
                        alt="Profile"
                        className="w-46 h-46 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
                    />
                </div>

                {/* User Details */}
                <div className="mt-24 flex flex-col items-center gap-3 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{user.email}</p>

                    {/* Status */}
                    <p className={`mt-2 text-sm font-semibold w-fit px-4 py-1 rounded-full shadow ${
                        user.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-emerald-700 dark:text-emerald-200"
                            : "bg-red-100 text-red-700 dark:bg-rose-700 dark:text-rose-200"
                    }`}>
                        Status: {user.status}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button className="bg-blue-50 dark:bg-purple-700 hover:bg-blue-600 dark:hover:bg-purple-600 hover:text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg">
                            Edit Profile
                        </button>
                        <button className="bg-red-50 dark:bg-rose-700 hover:bg-red-600 dark:hover:bg-rose-600 hover:text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg">
                            Logout
                        </button>
                    </div>

                    {/* Orders Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full">
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px]   shadow p-5 flex flex-col items-center">
                            <FaShoppingCart className="text-4xl text-blue-600 dark:text-purple-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{user.totalOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Total Orders</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px] shadow p-5 flex flex-col items-center">
                            <FaClock className="text-4xl text-yellow-500 dark:text-amber-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{user.pendingOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Pending Orders</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px]  shadow p-5 flex flex-col items-center">
                            <FaCheckCircle className="text-4xl text-green-600 dark:text-emerald-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{user.completedOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Completed Orders</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px]  shadow p-5 flex flex-col items-center">
                            <FaTimesCircle className="text-4xl text-red-600 dark:text-rose-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{user.cancelledOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Cancelled Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
