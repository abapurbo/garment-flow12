import React from 'react';
import Hero from './Hero';
import OurProducts from './OurProducts';
import HowItWorks from './HowItWorks';
import Feedback from './Feedback';
import ExtraSection1 from './ExtraSection1';

const Home = () => {
  return (
    <div className='bg-gray-50'>
      <Hero></Hero>
      <OurProducts />
      <HowItWorks />
      <Feedback />
      <ExtraSection1 />
    </div>
  );
};

export default Home;
