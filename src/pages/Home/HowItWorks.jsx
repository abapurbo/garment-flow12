import React from 'react';
import SectionTitle from '../../components/SectionTitle';

const HowItWorks = () => {
  return (
    <div className="py-12 bg-base-100">
      <SectionTitle title="How It Works" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-200">
          <div className="card-body text-center">
            <h3 className="card-title justify-center">Step 1</h3>
            <p>Browse our collection</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body text-center">
            <h3 className="card-title justify-center">Step 2</h3>
            <p>Place your order</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body text-center">
            <h3 className="card-title justify-center">Step 3</h3>
            <p>Receive your items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
