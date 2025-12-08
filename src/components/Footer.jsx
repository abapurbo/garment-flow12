import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold">Garment Flow</h3>
            <p>Your trusted clothing platform</p>
          </div>
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Contact</h3>
            <p>Email: info@garmentflow.com</p>
          </div>
        </div>
        <div className="border-t border-base-300 mt-8 pt-8 text-center">
          <p>&copy; 2025 Garment Flow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
