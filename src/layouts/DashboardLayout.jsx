import React from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router";
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
import ThemeChangeIcon from "../components/ThemeChanageIcon";

const DashboardLayout = () => {
  const location = useLocation();
  const { logoutUser, user, isLoading: authLoading } = useAuth();
  const { role, roleLoading } = useRole();

  // Redirect per role
  if (role === 'buyer' && location.pathname === '/dashboard') return <Navigate to="/dashboard/my-orders" />;
  if (role === 'manager' && location.pathname === '/dashboard') return <Navigate to="/dashboard/add-product" />;
  if (role === 'admin' && location.pathname === '/dashboard') return <Navigate to="/dashboard" />;

  if (roleLoading && authLoading) return <Loading />;

  // Common sidebar links
  const generalLinks = [
    { name: "Settings", path: "#", icon: <FaCog /> },
    { name: "Logout", action: "logout", icon: <FaSignOutAlt /> },
  ];

  // Function to compute active link classes
  const linkClasses = (path) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition 
     ${location.pathname === path
        ? "bg-blue-600 text-white dark:bg-purple-600 dark:text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-purple-700 dark:hover:text-white"
      }`;

  return (
    <div className="flex h-screen font-roboto bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-62 shadow-xl flex flex-col bg-white dark:bg-gray-800 justify-between p-4">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Garment<span className="text-blue-600 dark:text-purple-500">Flow</span>
            </h1>
          </Link>

          {/* Role-based Navigation */}
          <div className="mt-8 flex flex-col gap-2">
            {/* BUYER */}
            {role === "buyer" && (
              <>
                <Link to="/dashboard/my-orders" className={linkClasses("/dashboard/my-orders")}>
                  <FaShoppingCart className="text-xl" /> My Orders
                </Link>
                <Link to="/dashboard/track-order" className={linkClasses("/dashboard/track-order")}>
                  <FaMapMarkedAlt className="text-xl" /> Track Order
                </Link>
              </>
            )}

            {/* MANAGER */}
            {role === "manager" && (
              <>
                <Link to="/dashboard/add-product" className={linkClasses("/dashboard/add-product")}>
                  <FaPlus className="text-xl" /> Add Product
                </Link>
                <Link to="/dashboard/manage-products" className={linkClasses("/dashboard/manage-products")}>
                  <FaBoxOpen className="text-xl" /> Manage Products
                </Link>
                <Link to="/dashboard/pending-orders" className={linkClasses("/dashboard/pending-orders")}>
                  <FaClipboardList className="text-xl" /> Pending Orders
                </Link>
                <Link to="/dashboard/approved-orders" className={linkClasses("/dashboard/approved-orders")}>
                  <FaClipboardList className="text-xl" /> Approved Orders
                </Link>
              </>
            )}

            {/* ADMIN */}
            {role === "admin" && (
              <>
                <Link to="/dashboard" className={linkClasses("/dashboard")}>
                  <MdDashboard className="text-xl" /> Dashboard
                </Link>
                <Link to="/dashboard/manage-users" className={linkClasses("/dashboard/manage-users")}>
                  <FaUsers className="text-xl" /> Manage Users
                </Link>
                <Link to="/dashboard/all-products" className={linkClasses("/dashboard/all-products")}>
                  <FaBoxOpen className="text-xl" /> All Products
                </Link>
                <Link to="/dashboard/all-orders" className={linkClasses("/dashboard/all-orders")}>
                  <FaShoppingCart className="text-xl" /> All Orders
                </Link>
              </>
            )}

            {/* COMMON */}
            <Link to="/dashboard/profile" className={linkClasses("/dashboard/profile")}>
              <FaUser className="text-xl" /> My Profile
            </Link>
          </div>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700"></div>

          {/* General Links */}
          <nav className="mt-4 flex flex-col gap-2">
            {generalLinks.map((link) =>
              link.action === "logout" ? (
                <button
                  key={link.name}
                  onClick={logoutUser}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-white hover:dark:text-white  hover:bg-red-50 dark:hover:bg-red-700 hover:text-red-600 transition-all w-full text-left"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-purple-700 hover:text-blue-600 dark:hover:text-white transition-all"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.name}
                </Link>
              )
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-end px-4 py-2 bg-white dark:bg-gray-800 shadow-md items-center gap-4">
          <ThemeChangeIcon />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full">
              <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="user photo" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-gray-900 dark:text-gray-100">{user?.displayName}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{role}</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-grow p-6 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
