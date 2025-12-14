import React from "react";

const BrandCard = ({ brand }) => {
  return (
    <div
      className="
        flex flex-col items-center ml-10 mx-auto
        w-48 h-50 p-3 text-center
        bg-white dark:bg-[#1C1F2A]
        border border-transparent dark:border-[#2B2F3E]
        shadow-md dark:shadow-[0_10px_25px_rgba(0,0,0,0.6)]
        rounded-lg
        transition-all duration-300
        hover:scale-105
      "
    >
      <img
        src={brand.logoURL}
        alt={brand.name}
        className="w-20 h-20 object-contain"
      />

      <h3 className="text-md font-semibold mb-1 text-gray-800 dark:text-[#E6E8F0]">
        {brand.name}
      </h3>

      <p className="text-blue-500 dark:text-[#6FA3FF] font-medium text-xs mb-1">
        {brand.tagline}
      </p>

      <p className="text-gray-600 dark:text-[#9AA3B2] text-xs">
        {brand.description}
      </p>
    </div>
  );
};

export default BrandCard;
