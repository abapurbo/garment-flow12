import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../pages/Home/Hero';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Banner + Navbar Wrapper */}
      <div className="relative">

        {/* Navbar on top of Banner */}
        <div className="absolute border-2  top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Hero Section Banner */}
        <Hero />
      </div>

      {/* Page Content */}
      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
