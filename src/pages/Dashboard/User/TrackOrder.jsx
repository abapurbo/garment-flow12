import React, { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    // Track order logic
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Track Order</h2>
      <form onSubmit={handleTrack} className="form-control mt-6 max-w-md">
        <input
          type="text"
          placeholder="Enter Order ID"
          className="input input-bordered"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-4">
          Track
        </button>
      </form>
    </div>
  );
};

export default TrackOrder;
