import React from "react";

const BrandCard = ({ brand }) => {
  return (
    <div className="flex flex-col items-center ml-10 bg-white shadow-md rounded-lg p-3 text-center w-48 h-50 mx-auto">
      <img
        src={brand.logoURL}
        alt={brand.name}
        className="w-20 object-contain h-20 "
      />
      <h3 className="text-md font-semibold mb-1">{brand.name}</h3>
      <p className="text-blue-500 font-medium text-xs mb-1">{brand.tagline}</p>
      <p className="text-gray-600 text-xs">{brand.description}</p>
    </div>
  );
};

export default BrandCard;
