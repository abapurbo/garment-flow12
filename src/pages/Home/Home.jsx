import React from 'react';
import Hero from './Hero';
import OurProducts from './OurProducts';
import HowItWorks from './HowItWorks';
import CustomerFeedback from './CustomerFeedback';
import AchievementsSection from './AchievementsSection';
import ProductsSection from './ProductsBrandsSection';

const Home = () => {
  return (
    <div className='bg-gray-50'>
      <Hero></Hero>
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback />
      <AchievementsSection />
      <ProductsSection />
    </div>
  );
};

export default Home;
