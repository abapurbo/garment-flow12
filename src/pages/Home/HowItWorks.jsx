import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle';
import { FiLogIn, FiSettings, FiPackage } from 'react-icons/fi';

/* Animation Variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HowItWorks = () => {
  return (
    <motion.div
      className="
        py-12 lg:px-16 md:px-10 px-6
        bg-gray-50
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
      "
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <motion.div variants={itemVariants}>
        <SectionTitle
          title="How It Works"
          subtitle="Garments Order & Production Tracker"
          description="A step-by-step workflow to manage orders, production stages, and inventory efficiently in small and medium-sized garment factories."
        />
      </motion.div>

      {/* Steps */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 container mx-auto gap-8 mt-10"
        variants={containerVariants}
      >
        {/* Step 1 */}
        <motion.div variants={itemVariants} className="card bg-gray-100 border border-gray-200
          dark:bg-[#1C1F2A] dark:border-[#2B2F3E]
          hover:border-transparent hover:bg-white
          dark:hover:bg-[#202435]
          hover:shadow-2xl transition-all duration-500
          rounded-2xl transform hover:scale-105">
          <div className="card-body text-center p-6">
            <div className="flex justify-center mb-4 text-blue-500">
              <FiLogIn size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <p className="text-sm">
              Login and browse orders. Admins, managers, and workers can view dashboards.
            </p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} className="card bg-gray-100 border border-gray-200
          dark:bg-[#1C1F2A] dark:border-[#2B2F3E]
          hover:border-transparent hover:bg-white
          dark:hover:bg-[#202435]
          hover:shadow-2xl transition-all duration-500
          rounded-2xl transform hover:scale-105">
          <div className="card-body text-center p-6">
            <div className="flex justify-center mb-4 text-green-500">
              <FiSettings size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Step 2</h3>
            <p className="text-sm">
              Manage production stages and assign tasks efficiently.
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div variants={itemVariants} className="card bg-gray-100 border border-gray-200
          dark:bg-[#1C1F2A] dark:border-[#2B2F3E]
          hover:border-transparent hover:bg-white
          dark:hover:bg-[#202435]
          hover:shadow-2xl transition-all duration-500
          rounded-2xl transform hover:scale-105">
          <div className="card-body text-center p-6">
            <div className="flex justify-center mb-4 text-purple-500">
              <FiPackage size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <p className="text-sm">
              Track inventory and ensure timely delivery.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;
