import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiCamera, FiUserCheck } from "react-icons/fi";
import registerLogo from '../../assets/lottie/register.json'
import Lottie from "lottie-react";
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    toast.success("Registration Successful!");
    console.log("User Registered:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 pt-34 pb-10">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/50 
        rounded-3xl backdrop-blur-2xl shadow-lg overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col items-center justify-center 
            bg-gradient-to-br from-white/70 to-blue-100/40 py-10 px-6 text-center">
          <div className="w-[360px] mt-6">
            <Lottie animationData={registerLogo} />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 drop-shadow-lg mt-6">
            Join <span className="text-black">Garment<span className="text-blue-400">Flow</span></span>
          </h1>
          <p className="mt-3 text-blue-700 text-lg">
            Create your account & start your journey!
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="p-6 md:p-8 bg-white/90">
          <h2 className="text-center text-3xl font-bold text-blue-900 mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* NAME */}
            <div className="relative">
              <FiUser className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 px-4 py-2.5 rounded-xl bg-white/70 border border-blue-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none backdrop-blur-sm"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* EMAIL */}
            <div className="relative">
              <FiMail className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 px-4 py-2.5 rounded-xl bg-white/70 border border-blue-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none backdrop-blur-sm"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* PHOTO UPLOAD */}
            <div className="relative">
              <FiCamera className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="file"
                accept="image/*"
                className="w-full pl-12 px-4 py-2.5 rounded-xl border border-blue-300 bg-white/70 
                focus:ring-2 focus:ring-blue-300"
                {...register("photo", { required: "Photo is required" })}
              />
              {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
            </div>

            {/* ROLE */}
            <div className="relative">
              <FiUserCheck className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <select
                defaultValue=""
                className="w-full select pl-12 px-4 py-2.5 rounded-xl border border-blue-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
                {...register("role", { required: "Role is required" })}
              >
                <option value="" disabled>Choose a role</option>
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 px-4 py-2.5 rounded-xl bg-white/70 border border-blue-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none backdrop-blur-sm"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters required" },
                  validate: {
                    hasUpper: (value) => /[A-Z]/.test(value) || "Must contain 1 uppercase letter",
                    hasLower: (value) => /[a-z]/.test(value) || "Must contain 1 lowercase letter",
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.03] transition"
            >
              Register
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-semibold hover:underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
