import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { FiLogIn, FiSettings, FiPackage } from 'react-icons/fi';

const HowItWorks = () => {
  return (
    <div className="py-12 px-16 bg-gray-50">
      <SectionTitle 
        title="How It Works" 
        subtitle="Garments Order & Production Tracker" 
        description="A step-by-step workflow to manage orders, production stages, and inventory efficiently in small and medium-sized garment factories." 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Step 1 */}
        <div className="card bg-gray-100 border border-gray-200 hover:border-transparent hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-2xl transform hover:scale-105">
          <div className="card-body text-center p-6">
            <div className="flex justify-center mb-4 text-blue-500">
              <FiLogIn size={40} />
            </div>
            <h3 className="card-title justify-center text-xl font-bold mb-2">Step 1</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Login and browse orders. Admins, managers, and workers can view their respective dashboards.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card bg-gray-100 border border-gray-200 hover:border-transparent hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-2xl transform hover:scale-105">
          <div className="card-body text-center p-6">
            <div className="flex justify-center mb-4 text-green-500">
              <FiSettings size={40} />
            </div>
            <h3 className="card-title justify-center text-xl font-bold mb-2">Step 2</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Manage production stages: Cutting, Sewing, and Finishing. Update status and assign tasks to workers.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card bg-gray-100 border border-gray-200 hover:border-transparent hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-2xl transform hover:scale-105">
          <div className="card-body text-center p-6">
            <div className="flex justify-center mb-4 text-purple-500">
              <FiPackage size={40} />
            </div>
            <h3 className="card-title justify-center text-xl font-bold mb-2">Step 3</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Track inventory, update stock, and ensure timely delivery of completed orders to buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
