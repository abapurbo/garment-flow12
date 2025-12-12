import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiCamera, FiUserCheck } from "react-icons/fi";
import registerLogo from '../../assets/lottie/register.json'
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const profileImg = data.photo[0]
    toast.success("Your account created Successfully!");
    console.log("User Registered:", data);

    // create user
    createUser(data?.email, data?.password)
      .then(res => {
        console.log(res.user)
        //store then image form data
        const formData = new FormData();
        formData.append('image', profileImg);
        console.log('form', formData)
        const IMG_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imag_api_key}`
        // create image url
        axios.post(IMG_API_URL, formData)
          .then(res => {
            let photo = res.data.data.url
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photo,
              role: data.role
            }
            console.log(userInfo)
            //insert user collection database
            axiosSecure.post('/user', userInfo)
              .then(res => {
                console.log(res)
                const profile = {
                  displayName: data.name,
                  photoURL: photo
                }
                // update profile
                updateUserProfile(profile)
                // created user then navigate in home page
                navigate('/')
                reset({
                  name: '',
                  email: '',
                  role: '',
                  photo: null,
                  password: ''
                })
              })
              .catch(err => console.log(err))



          })
      })
      .catch(err => console.log(err))

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
            <div >
              <div className="relative">
                <FiUser className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 px-4 py-2.5 rounded-xl bg-white/70 border border-blue-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none backdrop-blur-sm"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* EMAIL */}
            <div>
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
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

            </div>

            {/* PHOTO UPLOAD */}
            <div>
              <div className="relative">
                <FiCamera className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full pl-12 px-4 py-2.5 rounded-xl border border-blue-300 bg-white/70 
                focus:ring-2 focus:ring-blue-300"
                  {...register("photo", { required: "Photo is required" })}
                />
              </div>
              {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}

            </div>

            {/* ROLE */}
            <div>
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
              </div>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}

            </div>
            {/* PASSWORD */}
            <div>
              <div className="relative">
                <FiLock className="absolute z-30 left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type={show ? 'password' : 'text'}
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
                <p onClick={() => setShow(!show)} className="absolute right-3 top-4">
                  {
                    show ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                </p>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.03] transition"
            >
              Sign Up
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
