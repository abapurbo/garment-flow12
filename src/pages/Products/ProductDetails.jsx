import React from 'react';
import { useParams } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="py-12">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src="https://via.placeholder.com/400" alt="Product" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Product Details</h2>
          <p>Product ID: {id}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
