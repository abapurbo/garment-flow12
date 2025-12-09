import React from 'react';
import Hero from './Hero';
import OurProducts from './OurProducts';
import HowItWorks from './HowItWorks';
import ExtraSection1 from './ExtraSection1';
import CustomerFeedback from './CustomerFeedback';

const Home = () => {
  return (
    <div className='bg-gray-50'>
      <Hero></Hero>
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback />
      <ExtraSection1 />
    </div>
  );
};

export default Home;
