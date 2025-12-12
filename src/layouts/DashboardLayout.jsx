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

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser, user } = useAuth();
  // const { role } = useRole();
  const role='admin'

  // Default dashboard redirect per role
    // if (role === "buyer") return <Navigate to="/dashboard/my-orders" replace />;
    // if (role === "manager") return <Navigate to="/dashboard/add-product" replace />;
    // if(role==='admin'){
    //   // return <Navigate to='/'></Navigate>
    // }

  // Sidebar links per role
  const dashboardLink = { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> };

  const adminLinks = [
    { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
    { name: "All Products", path: "/dashboard/all-products", icon: <FaBoxOpen /> },
    { name: "All Orders", path: "/dashboard/all-orders", icon: <FaShoppingCart /> },
  ];

  const managerLinks = [
    { name: "Add Product", path: "/dashboard/add-product", icon: <FaPlus /> },
    { name: "Manage Products", path: "/dashboard/manage-products", icon: <FaBoxOpen /> },
    { name: "Pending Orders", path: "/dashboard/pending-orders", icon: <FaClipboardList /> },
    { name: "Approve Orders", path: "/dashboard/approved-orders", icon: <FaClipboardList /> },
    { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];

  const buyerLinks = [
    { name: "My Orders", path: "/dashboard/my-orders", icon: <FaShoppingCart /> },
    { name: "Track Order", path: "/dashboard/track-order", icon: <FaMapMarkedAlt /> },
    { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];

  const generalLinks = [
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    { name: "Logout", action: "logout", icon: <FaSignOutAlt /> },
  ];

  let roleLinks = [];
  if (role === "admin") roleLinks = [dashboardLink, ...adminLinks];
  if (role === "manager") roleLinks = managerLinks;
  if (role === "buyer") roleLinks = buyerLinks;

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
          <nav className="mt-8 flex flex-col gap-2">
            {roleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                  ${location.pathname === link.path
                    ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

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
                    console.log('lsjflsfjlsfjlj')
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
