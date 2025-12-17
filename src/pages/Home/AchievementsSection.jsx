import React from "react";
import CountUp from "react-countup";
import { FaBoxOpen, FaUsers, FaTshirt, FaIndustry } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";

export default function AchievementsSection() {
  const stats = [
    {
      id: 1,
      icon: <FaBoxOpen size={40} className="text-green-600 dark:text-[#6FA3FF]" />,
      number: 1200,
      label: "Orders Processed",
    },
    {
      id: 2,
      icon: <FaUsers size={40} className="text-green-600 dark:text-[#6FA3FF]" />,
      number: 300,
      label: "Active Buyers",
    },
    {
      id: 3,
      icon: <FaTshirt size={40} className="text-green-600 dark:text-[#6FA3FF]" />,
      number: 150,
      label: "Products Available",
    },
    {
      id: 4,
      icon: <FaIndustry size={40} className="text-green-600 dark:text-[#6FA3FF]" />,
      number: 12,
      label: "Factories Tracked",
    },
  ];

  return (
    <section
      className="
    
        py-16
        bg-gray-50
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
      "
    >
      {/* Section Title */}
      <SectionTitle
        title="Our Achievements"
        subtitle="Driving Efficiency Across Garment Production & Supply Chain"
        description="We take pride in helping garment factories streamline their workflow. 
        Here are some key metrics demonstrating our impact, highlighting the efficiency, scale, and reliability of our platform."
      />

      {/* Statistics Grid */}
      <div className="grid container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-16 mt-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="
              bg-white dark:bg-[#1C1F2A]
              border border-transparent dark:border-[#2B2F3E]
              shadow-lg dark:shadow-[0_12px_30px_rgba(0,0,0,0.6)]
              rounded-2xl p-6
              flex flex-col items-center justify-center
              hover:shadow-2xl dark:hover:bg-[#202435]
              transition-all duration-300
            "
          >
            {/* Icon */}
            <div className="mb-4">{stat.icon}</div>

            {/* Animated Number */}
            <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-[#E6E8F0]">
              <CountUp
                start={0}
                end={stat?.number}
                duration={2}
                enableScrollSpy
              />
              {stat.id === 4 ? "" : "+"}
            </div>

            {/* Label */}
            <p className="text-gray-500 dark:text-[#9AA3B2] mt-2 text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
