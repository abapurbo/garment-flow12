import React from 'react';
import SectionTitle from '../../components/SectionTitle';

const Feedback = () => {
  return (
    <div className="py-12">
      <SectionTitle title="Customer Feedback" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>"Great quality products!"</p>
            <p className="text-sm text-gray-600">- Customer 1</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>"Fast delivery!"</p>
            <p className="text-sm text-gray-600">- Customer 2</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>"Excellent service!"</p>
            <p className="text-sm text-gray-600">- Customer 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
