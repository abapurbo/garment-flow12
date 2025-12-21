import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import useAxiosSecure from '../hooks/useAxiosSecure'
import axios from "axios";
import Swal from "sweetalert2";
import StatCard from "./StateCard";

export default function MyProfile() {
    const { user, logoutUser, updateUserProfile } = useAuth();
    const [dashboardData, setDashboardData] = useState({});
    const { role, status, suspendReason, suspendedAt } = useRole()
    
    const axiosSecure = useAxiosSecure()
    const updateModal = useRef()
    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                let url = "";

                if (role === "buyer") {
                    url = `/buyer/orders?email=${user.email}`;
                } else if (role === "manager") {
                    url = `/manager/profile/${user.email}`;
                } else if (role === "admin") {
                    url = `/admin/profile/${user.email}`;
                }

                const res = await axiosSecure.get(url);
                setDashboardData(res.data)
            } catch (err) {
                console.error("Failed to fetch orders/profile:", err);
            }
        };

        fetchData();
    }, [user, role, axiosSecure]);

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

            await updateUserProfile(profile)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Profile updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            closeModal()
        } catch (err) {
            console.error("Profile update failed:", err);
        }
    };

    return (
        <div className="min-h-screen  px-6 mt-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-start  font-urbanist">
            <div className="relative bg-white dark:bg-gray-800 flex flex-col items-center shadow-xl rounded-2xl md:p-8 p-4 mt-14 mt-0 w-full max-w-4xl ">

                {/* Role Badge */}
                <p className="absolute  md:right-6 md:top-6 top-32 bg-blue-100 dark:bg-purple-700 text-blue-700 dark:text-purple-300 px-4 py-1 rounded-full text-sm font-medium shadow">
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
                <div className="md:mt-24 mt-38 flex flex-col items-center gap-3  text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user.displayName}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{user.email}</p>

                    <div
                        className={`flex items-center gap-3 px-3 py-1 rounded-2xl shadow-md w-fit
    ${status === "approved" && "bg-gradient-to-r from-green-100 to-green-200 text-green-900 dark:from-green-900 dark:to-green-800 dark:text-green-100"}
    ${status === "pending" && "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900 dark:from-yellow-900 dark:to-yellow-800 dark:text-yellow-100"}
    ${status === "blocked" && "bg-gradient-to-r from-red-100 to-red-200 text-red-900 dark:from-red-900 dark:to-red-800 dark:text-red-100"}
    ${status === "suspended" && "bg-gradient-to-r from-red-100 to-red-200 text-red-900 dark:from-red-900 dark:to-red-800 dark:text-red-100"}
  `}
                    >
                        {/* STATUS DOT */}
                        <span
                            className={`w-3 h-3 rounded-full animate-pulse
      ${status === "approved" && "bg-green-500"}
      ${status === "pending" && "bg-yellow-500"}
      ${status === "blocked" && "bg-red-500"}
      ${status === "suspended" && "bg-red-500"}
    `} />
                        <p className="text-md font-semibold capitalize tracking-wide">
                            Account Status: {status}
                        </p>
                    </div>

                    {/* Suspend Reason */}
                    {status == "suspended" && (
                        <div className="w-full mt-6 p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-600 dark:border-red-400 rounded-lg shadow-md flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <FaTimesCircle className="text-red-600 dark:text-red-400 text-xl" />
                                <h3 className="text-red-800 dark:text-red-200 font-semibold text-lg">
                                    Account Suspended
                                </h3>
                            </div>
                            <p className="text-red-700 dark:text-red-300 text-xl">
                                Reason: {suspendReason}
                            </p>
                            <p className="text-red-600 dark:text-red-400 text-xl my-4 italic">
                                Please contact support for further assistance.
                            </p>
                        </div>
                    )}

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
                    <div className="grid  grid-cols-2 md:grid-cols-4 md:gap-6 gap-4 mt-8 w-full">
                        {role === "buyer" && (
                            <>
                                <StatCard icon={<FaShoppingCart />} iconColor="text-blue-600 dark:text-purple-300" value={dashboardData.totalOrders} label="Total Orders" />
                                <StatCard icon={<FaClock />} iconColor="text-yellow-500 dark:text-amber-300" value={dashboardData.pendingOrders} label="Pending Orders" />
                                <StatCard icon={<FaCheckCircle />} iconColor="text-green-600 dark:text-emerald-300" value={dashboardData.completedOrders} label="Completed Orders" />
                                <StatCard icon={<FaTimesCircle />} iconColor="text-red-600 dark:text-rose-300" value={dashboardData.cancelledOrders} label="Cancelled Orders" />
                            </>
                        )}

                        {role === "manager" && (
                            <>
                                <div className="md:col-span-4 col-span-2   flex justify-center">
                                <StatCard icon={<FaShoppingCart />} iconColor="text-purple-600 dark:text-purple-300" value={dashboardData.totalProducts} label="Your Products" />
                                </div>
                                <StatCard icon={<FaTimesCircle />} iconColor="text-red-600 dark:text-red-400 " value={dashboardData.rejectedOrders} label="Rejected Orders" />
                                <StatCard icon={<FaCheckCircle />} iconColor="text-green-600 dark:text-emerald-300" value={dashboardData.approvedOrders} label="Approved Orders" />
                                <StatCard icon={<FaClock />} iconColor="text-blue-600 dark:text-purple-300" value={dashboardData.totalOrders} label="Total Orders" />
                                <StatCard icon={<FaClock />} iconColor="text-yellow-500 dark:text-amber-300" value={dashboardData.pendingOrders} label="Pending Orders" />
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <StatCard
                                    icon={<FaShoppingCart />}
                                    iconColor="text-blue-600 dark:text-purple-300"
                                    value={dashboardData.totalUsers}
                                    label="Total Users"
                                />
                                <StatCard
                                    icon={<FaClock />}
                                    iconColor="text-yellow-500 dark:text-amber-300"
                                    value={dashboardData.totalPendingUsers}
                                    label="Pending Users"
                                />
                                <StatCard
                                    icon={<FaTimesCircle />}
                                    iconColor="text-red-600 dark:text-red-400"
                                    value={dashboardData.totalSuspendedUsers}
                                    label="Suspended Users"
                                />
                                <StatCard
                                    icon={<FaCheckCircle />}
                                    iconColor="text-green-600 dark:text-emerald-300"
                                    value={dashboardData.totalProducts}
                                    label="Total Products"
                                />
                                <StatCard
                                    icon={<FaClock />}
                                    iconColor="text-yellow-500 dark:text-amber-300"
                                    value={dashboardData.totalOrders}
                                    label="Total Orders"
                                />
                                <StatCard
                                    icon={<FaCheckCircle />}
                                    iconColor="text-green-600 dark:text-emerald-300"
                                    value={dashboardData.approvedOrders}
                                    label="Approved Orders"
                                />
                                <StatCard
                                    icon={<FaClock />}
                                    iconColor="text-yellow-500 dark:text-amber-300"
                                    value={dashboardData.pendingOrders}
                                    label="Pending Orders"
                                />
                                <StatCard
                                    icon={<FaTimesCircle />}
                                    iconColor="text-red-600 dark:text-red-400"
                                    value={dashboardData.rejectedOrders}
                                    label="Rejected Orders"
                                />
                            </>
                        )}

                    </div>
                </div>
            </div>

            {/* Profile Update Modal */}
            <dialog id="my_modal_3" ref={updateModal} className="modal backdrop-blur-sm">
                <div className="modal-box max-w-md rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
                    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500 hover:text-red-500">
                        ✕
                    </button>

                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Update Profile</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal information</p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Full Name</span></label>
                            <input type="text" name="name" defaultValue={user?.displayName} placeholder="Enter your name" className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Email Address</span></label>
                            <input type="email" value={user?.email || ""} readOnly disabled className="input input-bordered w-full rounded-xl bg-gray-100 dark:bg-gray-800 cursor-not-allowed" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Profile Photo</span></label>
                            <input type="file" name="photo" accept="image/*" className="file-input file-input-bordered w-full rounded-xl" />
                        </div>

                        <button type="submit" className="btn w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:opacity-90 transition-all duration-300">
                            Update Profile
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
