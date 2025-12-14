import React from 'react';

const SectionTitle = ({ title, subtitle,description }) => {
  return (
    <div className="flex items-center flex-col mb-8">
      <h2 className="text-xl font-semibold border border-blue-500 dark:border-purple-600 dark:text-purple-600 text-blue-500 w-fit px-4 py-0.1 rounded-full bg-white dark:bg-[#191E2C]">{title}</h2>
      {subtitle && <p className="text-black dark:text-white  text-2xl mt-2">{subtitle}</p>}
      {description && <p className="text-gray-500 text-center mt-2 max-w-2xl">{description}</p>}
    </div>
  );
};

export default SectionTitle;
