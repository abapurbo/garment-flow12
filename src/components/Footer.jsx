import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/logo/logo.png";

export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-gradient-to-b from-blue-100 to-white
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
        text-blue-900 dark:text-[#E6E8F0]
        pt-16 pb-8
      "
    >
      {/* Main Footer Container */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-12" />
            <span className="text-2xl font-bold text-black dark:text-[#E6E8F0]">
              Garment<span className="text-blue-500 dark:text-purple-600">Flow</span>
            </span>
          </Link>

          <p className="mt-4 text-blue-700 dark:text-[#B5BBC9] leading-relaxed">
            Smart solution for garments order & production management.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="
                  w-12 h-12 flex items-center justify-center rounded-full
                  bg-blue-500/10 border border-blue-300
                  dark:bg-[#2B2F3E] dark:border-[#2B2F3E]
                  hover:bg-blue-500 dark:hover:bg-[#2B6FFF]
                  transition-all duration-300
                "
              >
                <Icon className="text-blue-900 dark:text-[#E6E8F0]" size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 dark:text-[#E6E8F0] mb-4">
            Quick Links
          </h2>
          <ul className="space-y-3 text-blue-800 dark:text-[#B5BBC9]">
            <li><Link to="/" className="hover:text-blue-500 dark:hover:text-[#6FA3FF]">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-500 dark:hover:text-[#6FA3FF]">All Products</Link></li>
            <li><Link to="/about" className="hover:text-blue-500 dark:hover:text-[#6FA3FF]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500 dark:hover:text-[#6FA3FF]">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-500 dark:hover:text-[#6FA3FF]">Dashboard</Link></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 dark:text-[#E6E8F0] mb-4">
            Features
          </h2>
          <ul className="space-y-3 text-blue-800 dark:text-[#B5BBC9]">
            <li>Order Tracking</li>
            <li>Production Management</li>
            <li>Factory Integration</li>
            <li>Report Analytics</li>
            <li>Cloud Backup</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 dark:text-[#E6E8F0] mb-4">
            Newsletter
          </h2>

          <p className="text-blue-700 dark:text-[#B5BBC9] mb-4">
            Subscribe for updates and new features.
          </p>

          <div className="flex items-center bg-blue-200/30 dark:bg-[#2B2F3E] p-1 rounded-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                bg-transparent w-full p-3 outline-none
                text-blue-900 dark:text-[#E6E8F0]
                placeholder-blue-700 dark:placeholder-[#9AA3B2]
              "
            />
            <button className="bg-blue-500 hover:bg-blue-600 dark:bg-[#2B6FFF] dark:hover:bg-[#1F55E0] text-white py-3 px-5 rounded-md transition">
              →
            </button>
          </div>

          <p className="text-xs text-blue-700 dark:text-[#9AA3B2] mt-2">
            By subscribing, you agree to our&nbsp;
            <Link className="text-blue-500 dark:text-[#6FA3FF] hover:underline">
              Terms & Conditions.
            </Link>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-blue-300 dark:border-[#2B2F3E] mt-12"></div>

      {/* Copyright */}
      <div className="text-center text-blue-700 dark:text-[#9AA3B2] text-sm mt-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-500 dark:text-[#6FA3FF]">
          GarmentFlow
        </span>{" "}
        — All Rights Reserved.
      </div>
    </footer>
  );
}
