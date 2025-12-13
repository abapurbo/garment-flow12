import React from "react";
import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router";
import logo from '../assets/logo/logo.png';
import {
  FaUsers, FaBoxOpen, FaClipboardList, FaPlus,
  FaMapMarkedAlt, FaCog, FaSignOutAlt,
  FaShoppingCart,
  FaUser
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import Loading from "../components/Loading";

const DashboardLayout = () => {
  const location = useLocation();
  const { logoutUser, user, isLoading: authLoading } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role)
  // Sidebar links per role
  const generalLinks = [
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    { name: "Logout", action: "logout", icon: <FaSignOutAlt /> },
  ];

  if (roleLoading && authLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="flex h-screen bg-gray-100 font-roboto">
      {/* Sidebar */}
      <aside className="w-62 bg-white shadow-xl flex flex-col justify-between p-4">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-3 px-3 py-4 rounded-xl hover:bg-gray-100 transition">
            <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Garment<span className="text-blue-600">Flow</span>
            </h1>
          </Link>

          {/* Role-based Navigation */}
          <div className="mt-8 flex flex-col gap-2">

            {/* ===== BUYER ===== */}
            {role === "buyer" && (
              <>
                <Link
                  to="/dashboard/my-orders"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/my-orders"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaShoppingCart className="text-xl" />
                  My Orders
                </Link>

                <Link
                  to="/dashboard/track-order"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/track-order"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaMapMarkedAlt className="text-xl" />
                  Track Order
                </Link>
              </>
            )}

            {/* ===== MANAGER ===== */}
            {role === "manager" && (
              <>
                <Link
                  to="/dashboard/add-product"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/add-product"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaPlus className="text-xl" />
                  Add Product
                </Link>

                <Link
                  to="/dashboard/manage-products"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/manage-products"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaBoxOpen className="text-xl" />
                  Manage Products
                </Link>

                <Link
                  to="/dashboard/pending-orders"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/pending-orders"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaClipboardList className="text-xl" />
                  Pending Orders
                </Link>

                <Link
                  to="/dashboard/approved-orders"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/approved-orders"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaClipboardList className="text-xl" />
                  Approved Orders
                </Link>
              </>
            )}

            {/* ===== ADMIN ===== */}
            {role === "admin" && (
              <>

                <Link
                  to="/dashboard"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <MdDashboard className="text-xl" />
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/manage-users"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/manage-users"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaUsers className="text-xl" />
                  Manage Users
                </Link>

                <Link
                  to="/dashboard/all-products"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/all-products"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaBoxOpen className="text-xl" />
                  All Products
                </Link>

                <Link
                  to="/dashboard/all-orders"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${location.pathname === "/dashboard/all-orders"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <FaShoppingCart className="text-xl" />
                  All Orders
                </Link>
              </>
            )}

            {/* ===== COMMON ===== */}
            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
      ${location.pathname === "/dashboard/profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              <FaUser className="text-xl" />
              My Profile
            </Link>
          </div>


          {/* Divider */}
          <div className="mt-6 border-t border-gray-200"></div>

          {/* General Links */}
          <nav className="mt-4 flex flex-col gap-2">
            {generalLinks.map((link) => (
              link.action === "logout" ? (
                <button
                  key={link.name}
                  onClick={() => {
                    logoutUser();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-end px-4 py-2 bg-white shadow-md">
          {/* <h2 className="text-3xl font-bold text-blue-500 tracking-tight">Dashboard</h2> */}

          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full">
              <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt='user photo' />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-gray-900">{user?.displayName}</span>
              <span className="text-sm text-gray-500 capitalize">{role}</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-grow p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
