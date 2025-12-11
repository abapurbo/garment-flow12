import React from "react";
import CountUp from "react-countup";
import { FaBoxOpen, FaUsers, FaTshirt, FaIndustry } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle"; // Adjust path as needed

export default function AchievementsSection() {
  const stats = [
    {
      id: 1,
      icon: <FaBoxOpen size={40} className="text-green-600" />,
      number: 1200,
      label: "Orders Processed",
    },
    {
      id: 2,
      icon: <FaUsers size={40} className="text-green-600" />,
      number: 300,
      label: "Active Buyers",
    },
    {
      id: 3,
      icon: <FaTshirt size={40} className="text-green-600" />,
      number: 150,
      label: "Products Available",
    },
    {
      id: 4,
      icon: <FaIndustry size={40} className="text-green-600" />,
      number: 12,
      label: "Factories Tracked",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      {/* Section Title */}
      <SectionTitle
        title="Our Achievements"
        subtitle="Driving Efficiency Across Garment Production & Supply Chain"
        description="We take pride in helping garment factories streamline their workflow. 
                     Here are some key metrics demonstrating our impact, highlighting the efficiency, scale, and reliability of our platform."
      />

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-16 mt-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="mb-4">{stat.icon}</div>

            {/* Animated Number */}
            <div className="text-3xl md:text-4xl font-bold text-gray-800">
              <CountUp start={0} end={stat?.number} duration={2} enableScrollSpy />
              {stat.id === 4 ? "" : "+"}
            </div>

            {/* Label */}
            <p className="text-gray-500 mt-2 text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
