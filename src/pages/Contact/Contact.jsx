import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import contactUs from '../../assets/lottie/Contact-Us.json';
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const { register } = useForm();

  return (
    <div className="min-h-screen pt-34 flex flex-col items-center py-16 px-6 font-urbanist
                    bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-purple-500 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Have questions or need assistance? We're here to help! Reach out to our support team anytime — your satisfaction is our priority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full shadow-xl hover:shadow-2xl transform duration-300 rounded-xl">

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-white to-blue-100 dark:to-purple-900 dark:from-gray-800 p-8 rounded-l-xl">
          <div className="flex justify-center items-center mb-6">
            <div className="w-66">
              <Lottie animationData={contactUs} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600 dark:text-purple-400 text-xl" />
              <p className="text-gray-700 dark:text-gray-300 text-lg">+880 1234 567 890</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600 dark:text-purple-400 text-xl" />
              <p className="text-gray-700 dark:text-gray-300 text-lg">support@garmentflow.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 dark:text-purple-400 text-xl" />
              <p className="text-gray-700 dark:text-gray-300 text-lg">Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mt-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-purple-400 text-2xl transition"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-purple-400 text-2xl transition"><FaLinkedin /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-purple-400 text-2xl transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-r-xl">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-purple-500 mb-6">Send Us a Message</h2>

          <form className="space-y-6">
            <div className="relative">
              <label className="block text-blue-600 dark:text-purple-400 mb-1 font-medium">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-3 rounded-xl bg-white/60 dark:bg-gray-700 text-blue-900 dark:text-purple-200 placeholder-blue-400 dark:placeholder-purple-300
                           border border-blue-300 dark:border-purple-500 focus:border-blue-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 outline-none backdrop-blur-sm transition"
              />
            </div>

            <div>
              <label className="block text-blue-600 dark:text-purple-400 mb-1 font-medium">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-3 rounded-xl bg-white/60 dark:bg-gray-700 text-blue-900 dark:text-purple-200 placeholder-blue-400 dark:placeholder-purple-300
                           border border-blue-300 dark:border-purple-500 focus:border-blue-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 outline-none backdrop-blur-sm transition"
              />
            </div>

            <div>
              <label className="block text-blue-600 dark:text-purple-400 mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full px-3 py-3 rounded-xl bg-white/60 dark:bg-gray-700 text-blue-900 dark:text-purple-200 placeholder-blue-400 dark:placeholder-purple-300
                           border border-blue-300 dark:border-purple-500 focus:border-blue-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 outline-none backdrop-blur-sm transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-purple-500 dark:to-purple-700 text-white font-semibold rounded-xl transition hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
