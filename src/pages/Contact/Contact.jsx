import React, { useRef, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Lottie from "lottie-react";
import contactUs from "../../assets/lottie/Contact-Us.json";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    from_message: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // simple required validation
  const validate = () => {
    const newErrors = {};
    if (!formData.from_name) newErrors.from_name = "Name is required";
    if (!formData.from_email) newErrors.from_email = "Email is required";
    if (!formData.from_message)
      newErrors.from_message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validate()) return;

    emailjs
      .sendForm(
        `${import.meta.env.VITE_YOUR_SERVICE_ID}`,
        `${import.meta.env.VITE_YOUR_TEMPLATE_ID}`,
        form.current,
        {
          publicKey:`${import.meta.env.VITE_YOUR_PUBLIC_KEY}`,
        }
      )
      .then(() => {
        toast.success("Your message has been sent successfully!");
        setFormData({
          from_name: "",
          from_email: "",
          from_message: "",
        });
        setErrors({});
      })
      .catch(() => {
        toast.error("Failed to send email");
      });
  };

  return (
    <div className="min-h-screen pt-34 flex flex-col justify-center items-center py-16 px-6 bg-blue-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full shadow-xl rounded-xl overflow-hidden">
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-white to-blue-100 dark:from-gray-800 dark:to-purple-900 p-8">
          <div className="w-64 mx-auto mb-6">
            <Lottie animationData={contactUs} />
          </div>

          <div className="space-y-4">
            <p className="flex gap-3 items-center">
              <FaPhoneAlt /> +880 1234 567 890
            </p>
            <p className="flex gap-3 items-center">
              <FaEnvelope /> support@garmentflow.com
            </p>
            <p className="flex gap-3 items-center">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </p>
          </div>

          <div className="flex gap-5 mt-6 text-2xl">
            <FaFacebook />
            <FaLinkedin />
            <FaInstagram />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                name="from_name"
                placeholder="Your name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border outline-none"
              />
              {errors.from_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.from_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="from_email"
                placeholder="Your email"
                value={formData.from_email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border outline-none"
              />
              {errors.from_email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.from_email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                rows="4"
                name="from_message"
                placeholder="Write your message..."
                value={formData.from_message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border outline-none"
              />
              {errors.from_message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.from_message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 dark:bg-purple-600 font-semibold text-white rounded-xl hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
