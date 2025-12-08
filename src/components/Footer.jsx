import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/logo/logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-blue-100 to-white text-blue-900 pt-16 pb-8">

      {/* Main Footer Container */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Company Info */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-12" />
            <span className="text-2xl font-bold text-blue-900">
              Garment<span className="text-blue-500">Flow</span>
            </span>
          </Link>

          <p className="mt-4 text-blue-700 leading-relaxed">
            Smart solution for garments order & production management.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-300"
                href="#"
              >
                <Icon size={18} className="text-blue-900" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Quick Links</h2>
          <ul className="space-y-3 text-blue-800">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-500">All Products</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Features</h2>
          <ul className="space-y-3 text-blue-800">
            <li>Order Tracking</li>
            <li>Production Management</li>
            <li>Factory Integration</li>
            <li>Report Analytics</li>
            <li>Cloud Backup</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Newsletter</h2>

          <p className="text-blue-700 mb-4">
            Subscribe for updates and new features.
          </p>

          <div className="flex items-center bg-blue-200/30 p-1 rounded-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full p-3 outline-none text-blue-900 placeholder-blue-700"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-md transition">
              →
            </button>
          </div>

          <p className="text-xs text-blue-700 mt-2">
            By subscribing, you agree to our&nbsp;
            <Link className="text-blue-500 hover:underline">Terms & Conditions.</Link>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-blue-300 mt-12"></div>

      {/* Copyright */}
      <div className="text-center text-blue-700 text-sm mt-6">
        © {new Date().getFullYear()} <span className="text-blue-500">GarmentFlow</span> — All Rights Reserved.
      </div>
    </footer>
  );
}
