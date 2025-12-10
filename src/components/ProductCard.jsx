import React from "react";
import { useLocation } from "react-router";

export default function ProductCard() {
  const location = useLocation()
  return (
    <div className="card w-full bg-white shadow-2xl 
      hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
      transition-all duration-500 ease-out 
      rounded-xs overflow-hidden mx-auto">

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src="https://i.ibb.co/7t7wrMkb/istockphoto-1516524215-612x612-removebg-preview.png"
          alt="Stylish Sneakers"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* New Badge */}
        <span className={location?.pathname === '/' && 'absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full z-30 shadow'}>
          {
            location?.pathname === '/' ? 'New' : ''
          }
        </span>
      </div>


      {/* Product Details */}
      <div className="p-4">
        <h2 className="card-title text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
          Stylish Sneakers
        </h2>

        <p className="text-[15px] bg-blue-50 w-fit px-2 rounded-full text-blue-400  mb-2"><span className=" font-bold">Category:</span> Shoes</p>

        {/* Short Description */}
        <p className="text-black text-[14px] mb-3 leading-snug line-clamp-2">
          Premium quality stylish sneakers designed for comfort and durability,
          perfect for outdoor activities.
        </p>

        {/* Price & Stock */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-blue-800 font-bold text-sm">
            <span className="text-gray-800">Price:</span> $79.99
          </p>
          <p className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            <span className="font-semibold ">Available:</span> 20 pcs
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <button className="w-full  text-sm font-medium cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 shadow hover:shadow-lg transition-all duration-300">
        View Details
      </button>
    </div>
  );
}
