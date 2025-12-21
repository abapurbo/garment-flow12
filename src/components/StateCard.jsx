import React from "react";

const StatCard = ({ icon, value, label, iconColor }) => (
    <div >
        <div className="bg-blue-50 h-full dark:bg-purple-700 rounded-[4px] shadow p-5 flex flex-col items-center">
            <div className={`text-4xl ${iconColor}`}>{icon}</div>
            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{value}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{label}</p>
        </div>
    </div>
);

export default StatCard;
