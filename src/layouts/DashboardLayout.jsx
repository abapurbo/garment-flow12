import React, { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router";
import logo from "../assets/logo/logo.png";
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaPlus,
  FaMapMarkedAlt,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import Loading from "../components/Loading";
import ThemeChangeIcon from "../components/ThemeChanageIcon";

const DashboardLayout = () => {
  const location = useLocation();
  const { user, isLoading: authLoading, logoutUser } = useAuth();
  const { role, roleLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔹 Show loading until auth + role ready
  if (authLoading || roleLoading) return <Loading />;

  // 🔹 Redirect if no user (private route)
  if (!user) return <Navigate to="/login" replace />;

  // 🔹 Redirect based on role on default /dashboard route
  if (location.pathname === "/dashboard") {
    if (role === "buyer") return <Navigate to="/dashboard/my-orders" replace />;
    if (role === "manager") return <Navigate to="/dashboard/add-product" replace />;
    if (role === "admin") return <Navigate to="/dashboard" replace />;
  }

  const linkClasses = (path) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition
     ${
       location.pathname === path
         ? "bg-blue-600 text-white dark:bg-purple-600"
         : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-purple-700 dark:hover:text-white"
     }`;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-xl p-4
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-xl text-gray-700 dark:text-white"
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold dark:text-white">
            Garment
            <span className="text-blue-600 dark:text-purple-500">Flow</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {role === "buyer" && (
            <>
              <Link
                to="/dashboard/my-orders"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/my-orders")}
              >
                <FaShoppingCart /> My Orders
              </Link>
              <Link
                to="/dashboard/track-order"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/track-order")}
              >
                <FaMapMarkedAlt /> Track Order
              </Link>
            </>
          )}

          {role === "manager" && (
            <>
              <Link
                to="/dashboard/add-product"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/add-product")}
              >
                <FaPlus /> Add Product
              </Link>
              <Link
                to="/dashboard/manage-products"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/manage-products")}
              >
                <FaBoxOpen /> Manage Products
              </Link>
              <Link
                to="/dashboard/pending-orders"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/pending-orders")}
              >
                <FaClipboardList /> Pending Orders
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard")}
              >
                <MdDashboard /> Dashboard
              </Link>
              <Link
                to="/dashboard/manage-users"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/manage-users")}
              >
                <FaUsers /> Manage Users
              </Link>
              <Link
                to="/dashboard/all-products"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/all-products")}
              >
                <FaBoxOpen /> All Products
              </Link>
              <Link
                to="/dashboard/all-orders"
                onClick={() => setIsSidebarOpen(false)}
                className={linkClasses("/dashboard/all-orders")}
              >
                <FaShoppingCart /> All Orders
              </Link>
            </>
          )}

          <Link
            to="/dashboard/profile"
            onClick={() => setIsSidebarOpen(false)}
            className={linkClasses("/dashboard/profile")}
          >
            <FaUser /> My Profile
          </Link>

          <button
            onClick={logoutUser}
            className="mt-6 flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-700 dark:text-red-400"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between md:justify-end items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-2xl text-gray-700 dark:text-white"
          >
            <FaBars />
          </button>

          <div className="flex items-center gap-4">
            <ThemeChangeIcon />
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden sm:block">
                <p className="font-semibold dark:text-white">{user?.displayName}</p>
                <p className="text-sm capitalize text-gray-500">{role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
