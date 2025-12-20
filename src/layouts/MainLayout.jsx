import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../pages/Home/Hero';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
          <Navbar />
        

      {/* Page Content */}
      <main className="flex-grow dark:bg-gray-900">
        <Outlet />
      </main>

      <Footer />

      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
