import React from "react";
import { Link, useLocation } from "react-router";

export default function ProductCard({ card }) {
  const {_id, name, price, image, description, category, availableQty } = card || {}
  const location = useLocation();

  return (
    <div
      className="
        card w-full
        bg-white dark:bg-[#1C1F2A]
        border border-gray-200 dark:border-[#2B2F3E]
        shadow-2xl
        hover:scale-105
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
        dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]
        transition-all duration-500 ease-out
        rounded-xs overflow-hidden mx-auto
      "
    >
      {/* Product Image */}
      <div className="relative min-h-48 max-h-58 overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="w-full  h-full object-contain transition-transform duration-500 hover:scale-120"
        />

        {/* New Badge
        {location?.pathname === "/" && (
          <span
            className="
              absolute top-2 left-2
              bg-blue-100 text-blue-600
              dark:bg-[#2B6FFF]/20 dark:text-[#6FA3FF]
              text-xs font-semibold px-2 py-1 rounded-full shadow
            "
          >
            New
          </span>
        )} */}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2
          className="
            card-title text-lg font-semibold
            text-gray-800 dark:text-[#E6E8F0]
            mb-1 hover:text-blue-600 dark:hover:text-[#6FA3FF]
            transition-colors
          "
        >
          {name}
        </h2>

        <p
          className="
            text-[13px] w-fit px-3 py-1 rounded-full mb-2
            bg-blue-50 text-blue-400
            dark:bg-[#2B2F3E] dark:text-[#9AA3B2]
          "
        >
          <span className="font-semibold text-gray-700 dark:text-[#C9CDD8]">
            Category:
          </span>{" "}
          {category}
        </p>

        {/* Short Description */}
        <p className="text-black dark:text-[#B5BBC9] text-[14px] mb-3 leading-snug line-clamp-2">
          {description}
        </p>

        {/* Price & Stock */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-blue-800 dark:text-[#6FA3FF] font-bold text-sm">
            <span className="text-gray-800 dark:text-[#C9CDD8]">Price:</span>{" "}
            ${price}
          </p>

          <p
            className="
              bg-blue-100 text-blue-800
              dark:bg-[#2B2F3E] dark:text-[#9AE6B4]
              px-3 py-1 rounded-full text-sm
            "
          >
            <span className="font-semibold">Available:</span> {availableQty} pcs
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <Link to={`/details/${_id}`}>
        <button
          className="
          w-full text-sm font-medium py-2 cursor-pointer
          bg-blue-500 text-white
          hover:bg-blue-700
          dark:bg-[#2B6FFF] dark:hover:bg-[#1F55E0]
          shadow hover:shadow-lg transition-all duration-300
        "
        >
          View Details
        </button>
      </Link>
    </div>
  );
}
