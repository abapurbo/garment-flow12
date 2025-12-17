import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import useAxiosSecure from '../hooks/useAxiosSecure'
import axios from "axios";
import Swal from "sweetalert2";
export default function MyProfile() {
    const { user, logoutUser, updateUserProfile } = useAuth()
    const { role } = useRole()
    const axiosSecure = useAxiosSecure()
    const [order, setOrder] = useState({})
    const updateModal = useRef()
    console.log(user)
    useEffect(() => {
        axiosSecure.get(`/buyer/orders?email=${user?.email}`)
            .then(res => {
                console.log(res.data)
                setOrder(res.data)
            })
    }, [user])

    const openModal = () => {
        updateModal.current.showModal()
    }
    const closeModal = () => {
        updateModal.current.close()

    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const profileImg = e.target.photo.files[0];

        try {
            let photoURL;

            if (profileImg) {
                const formData = new FormData();
                formData.append("image", profileImg);

                const IMG_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imag_api_key}`;
                const res = await axios.post(IMG_API_URL, formData);
                photoURL = res.data.data.url;
            }

            const profile = {
                displayName: name,
                photoURL: photoURL
            };

            // Update Firebase user
            await updateUserProfile(profile)
                .then(() => {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Profile updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    closeModal()
                })

        } catch (err) {
            console.error("Profile update failed:", err);
        }
    };


    return (
        <div className="min-h-screen mt-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-start p-6 font-urbanist">
            <div className="relative bg-white dark:bg-gray-800 flex flex-col items-center shadow-xl rounded-2xl p-8 w-full max-w-4xl">

                {/* Role Badge */}
                <p className="absolute right-6 top-6 bg-blue-100 dark:bg-purple-700 text-blue-700 dark:text-purple-300 px-4 py-1 rounded-full text-sm font-medium shadow">
                    {role}
                </p>

                {/* Profile Image */}
                <div className="absolute -top-16 flex justify-center w-full">
                    <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-46 h-46 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
                    />
                </div>

                {/* User Details */}
                <div className="mt-24 flex flex-col items-center gap-3 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user.displayName}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{user.email}</p>



                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button onClick={openModal} className="bg-blue-50 dark:bg-purple-700 hover:bg-blue-600 dark:hover:bg-purple-600 hover:text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg">
                            Edit Profile
                        </button>
                        <button onClick={logoutUser} className="bg-red-50 dark:bg-rose-700 hover:bg-red-600 dark:hover:bg-rose-600 hover:text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg">
                            Logout
                        </button>
                    </div>

                    {/* Orders Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full">
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px]   shadow p-5 flex flex-col items-center">
                            <FaShoppingCart className="text-4xl text-blue-600 dark:text-purple-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{order?.totalOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Total Orders</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px] shadow p-5 flex flex-col items-center">
                            <FaClock className="text-4xl text-yellow-500 dark:text-amber-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{order?.pendingOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Pending Orders</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px]  shadow p-5 flex flex-col items-center">
                            <FaCheckCircle className="text-4xl text-green-600 dark:text-emerald-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{order?.completedOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Completed Orders</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-purple-700 rounded-[4px]  shadow p-5 flex flex-col items-center">
                            <FaTimesCircle className="text-4xl text-red-600 dark:text-rose-300" />
                            <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">{order?.cancelledOrders}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Cancelled Orders</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" ref={updateModal} className="modal backdrop-blur-sm">
                <div className="modal-box max-w-md rounded-2xl shadow-2xl bg-white dark:bg-gray-900">

                    {/* Close Button */}
                    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500 hover:text-red-500">
                        ✕
                    </button>


                    {/* Header */}
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            Update Profile
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Update your personal information
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleUpdateProfile} className="space-y-5"
                    >
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user?.displayName}
                                placeholder="Enter your name"
                                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Email (Read Only) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                disabled
                                className="input input-bordered w-full rounded-xl bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                            />
                        </div>

                        {/* Photo Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Profile Photo</span>
                            </label>

                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                className="file-input file-input-bordered w-full rounded-xl"
                            />

                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            className="btn w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:opacity-90 transition-all duration-300"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </dialog>

        </div>
    );
}
