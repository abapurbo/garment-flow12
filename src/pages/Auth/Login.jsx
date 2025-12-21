import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Lottie from "lottie-react";
import login from "../../assets/lottie/login.json";
import { FiMail, FiLock } from "react-icons/fi";
import SocialLogin from "../Auth/SocialLogin";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
export default function Login() {
  const { loading, loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Logged in successfully!");
      await navigate(location.state || "/");
    } catch (err) {
      toast.error(err?.message || "Login failed!");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-36 pb-20
                    bg-blue-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2
                      bg-white/40 dark:bg-gray-800 rounded-3xl backdrop-blur-2xl
                      shadow-[0_0px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-colors duration-500">
        <title>
          GarmentFlow |  Login
        </title>
        {/* Left Content */}
        <div className="hidden md:flex flex-col justify-center items-center py-10
                        bg-gradient-to-br from-white/70 to-blue-100/40
                        dark:from-gray-700/70 dark:to-purple-800/40 transition-colors duration-500">
          <h1 className="text-3xl font-bold drop-shadow-lg text-center text-blue-900 dark:text-purple-400">
            Welcome to{" "}
            <span className="text-black dark:text-gray-100">
              Garment<span className="text-blue-400 dark:text-purple-500">Flow</span>
            </span>
          </h1>

          <p className="text-blue-700 dark:text-purple-300 mt-3 text-center text-lg">
            Sign in to continue your journey!
          </p>

          <div className="w-[360px] mt-6">
            <Lottie animationData={login} />
          </div>
        </div>

        {/* Login Section */}
        <div className="md:p-10 p-8 bg-white/90 dark:bg-gray-800 transition-colors duration-500">
          <h2 className="text-center text-3xl font-bold text-blue-900 dark:text-purple-400 mb-8">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Email */}
            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 dark:text-purple-300" size={20} />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 px-5 py-3 rounded-xl
                           bg-white/60 dark:bg-gray-700
                           text-blue-900 dark:text-purple-200
                           placeholder-blue-400 dark:placeholder-purple-300
                           border border-blue-300 dark:border-purple-600
                           focus:border-blue-500 dark:focus:border-purple-500
                           focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400
                           outline-none transition-colors duration-500"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

            </div>
            {/* Password */}
            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 dark:text-purple-300" size={20} />
                <input
                  {...register("password", { required: "Password is required" })}
                  type={show ? "password" : "text"}
                  placeholder="Password"
                  className="w-full pl-12 px-5 py-3 rounded-xl
                           bg-white/60 dark:bg-gray-700
                           text-blue-900 dark:text-purple-200
                           placeholder-blue-400 dark:placeholder-purple-300
                           border border-blue-300 dark:border-purple-600
                           focus:border-blue-500 dark:focus:border-purple-500
                           focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400
                           outline-none transition-colors duration-500"
                />
                <p onClick={() => setShow(!show)} className="absolute right-3 top-4 cursor-pointer text-gray-700 dark:text-gray-200">
                  {show ? <FaRegEye /> : <FaRegEyeSlash />}
                </p>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-purple-500 dark:to-purple-700
                         text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-[1.03] transition-transform duration-300"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-blue-200/60 dark:bg-purple-600 flex-grow"></div>
            <p className="text-blue-700 dark:text-purple-300 text-sm">OR</p>
            <div className="h-px bg-blue-200/60 dark:bg-purple-600 flex-grow"></div>
          </div>

          {/* Google Login */}
          <SocialLogin />

          <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/signUp" className="font-semibold text-blue-500 dark:text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
