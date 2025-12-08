import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../pages/Home/Hero';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Banner + Navbar Wrapper */}
      <div className="relative">

        {/* Navbar on top of Banner */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Hero Section Banner */}
      </div>

      {/* Page Content */}
      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>

      <Footer />

      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
