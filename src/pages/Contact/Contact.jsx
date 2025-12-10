import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import contactUs from '../../assets/lottie/Contact-Us.json'
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
export default function Contact() {
  const { register } = useForm()
  return (
    <div className="min-h-screen  bg-blue-50 pt-34 flex flex-col items-center py-16 px-6 font-urbanist">
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have questions or need assistance? We're here to help! Reach out to our support team
          anytime — your satisfaction is our priority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2   max-w-5xl w-full shadow-xl hover:shadow-2xl transform duration-300  rounded-xl">
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-white to-blue-100/90 p-8 rounded-l-xl ">
          <div className="flex justify-center items-center">
            <div className="w-66">
              <Lottie animationData={contactUs}></Lottie>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <p className="text-gray-700 text-lg">+880 1234 567 890</p>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-green-600 text-xl" />
              <p className="text-gray-700 text-lg">support@garmentflow.com</p>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <p className="text-gray-700 text-lg">Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mt-8">
            <a href="#" className="text-gray-600 hover:text-green-600 text-2xl transition"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-2xl transition"><FaLinkedin /></a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-2xl transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-r-xl">
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Send Us a Message</h2>

          <form className="space-y-6">
            <div className="relative">
              <label className="block text-blue-500 mb-1 font-medium">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-3 rounded-xl bg-white/60 
                            text-blue-900 placeholder-blue-400 border border-blue-300 
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-400 
                            outline-none backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-blue-500 mb-1 font-medium">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-3 rounded-xl bg-white/60 
                            text-blue-900 placeholder-blue-400 border border-blue-300 
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-400 
                            outline-none backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-blue-500 mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                className="w-full px-3 py-3 rounded-xl bg-white/60 
                            text-blue-900 placeholder-blue-400 border border-blue-300 
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-400 
                            outline-none backdrop-blur-sm"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600  text-white font-semibold rounded-xl transition" >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}