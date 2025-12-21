import React from "react";
import { Link, NavLink, useLocation } from 'react-router';
import logo from '../assets/logo/logo.png'
import { useAuth } from '../hooks/useAuth';
import ThemeChangeIcon from './ThemeChanageIcon';
import { IoMenu } from "react-icons/io5";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import '../components/NavbarStyles.css'
const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const location = useLocation();
    const activeClass = "font-extrabold underline text-blue-600 dark:text-purple-400";
    const normalClass = " dark:hover:text-purple-600 duration-200 hover:underline";

    const navLinks = (
        <div className="urbanist-font text-[17px] flex flex-col md:flex-row gap-3 justify-center items-center font-bold  md:space-x-4 text-blue-600 dark:text-gray-100">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            <NavLink to="/all-products" className={({ isActive }) => isActive ? activeClass : normalClass}>All Products</NavLink>
            <NavLink to="/aboutUs" className={({ isActive }) => isActive ? activeClass : normalClass}>About Us</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>
            {user?.email && <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink>}
        </div>
    );
    const AuthNavLinks = (
        <div className="urbanist-font text-[16px]  lg:block font-bold md:space-x-2">
            {!user && (
                <>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `border-2 px-4 py-2 rounded-xs 
                         border-blue-600 dark:border-purple-600 
                         text-blue-600 dark:text-purple-600
                         ${isActive
                                ? 'bg-blue-600 dark:bg-purple-600 text-white dark:text-white'
                                : "hover:bg-blue-600 dark:hover:bg-purple-700 hover:text-white"}`
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signUp"
                        className={({ isActive }) =>
                            `border-2 px-4 py-2 rounded-xs hidden
                         border-blue-600 dark:border-purple-600 
                         text-blue-600 dark:text-purple-600
                         ${isActive
                                ? 'bg-blue-600 dark:bg-purple-600 text-white dark:text-white'
                                : "hover:bg-blue-600 dark:hover:bg-purple-700 hover:text-white"}`
                        }
                    >
                        Sign Up
                    </NavLink>
                </>
            )}
        </div>
    );

    return (
        <div className="fixed navbar-container w-full  z-50">
            <div className={`nav-rounded backdrop-blur-3xl ${location.pathname === '/' || location.pathname === '/aboutUs' ? 'bg-white/5 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} border border-white/20 dark:border-gray-700 shadow-2xl   px-4 md:px-6 py-3 `}>
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex  items-center">
                        <div className="drawer lg:drawer-open lg:hidden">
                            <input id="main-drawer" type="checkbox" className="drawer-toggle" />

                            {/* Top / Page Content */}
                            <div className="drawer-content mr-10 menu-icon flex items-center ">
                                <label htmlFor="main-drawer" className="lg:hidden">
                                    <IoMenu className="text-3xl text-blue-600 dark:text-purple-500" />
                                </label>
                            </div>

                            {/* Sidebar */}
                            <div className="drawer-side  z-50 drawer-side-bar">
                                <label htmlFor="main-drawer" className="drawer-overlay"></label>

                                <aside className="w-72 top-0 left-0 min-h-full  bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">

                                    {/* Logo */}
                                    <Link to="/" className="flex items-center gap-3 mb-4">
                                        <img className="w-11 h-11 rounded-full" src={logo} alt="logo" />
                                        <h1 className="text-2xl -ml-3 font-bold text-gray-800 dark:text-gray-100">
                                            Garment
                                            <span className="text-blue-500 dark:text-purple-500">Flow</span>
                                        </h1>
                                    </Link>

                                    {/* Menu */}
                                    <nav className="flex flex-col gap-2 text-[17px] font-medium">
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "px-4 py-2 rounded-lg bg-blue-500 dark:bg-purple-600 text-white shadow"
                                                    : "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300  dark:hover:bg-gray-700"
                                            }
                                        >
                                            Home
                                        </NavLink>

                                        <NavLink
                                            to="/all-products"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "px-4 py-2 rounded-lg bg-blue-500 dark:bg-purple-600 text-white shadow"
                                                    : "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                                            }
                                        >
                                            All Products
                                        </NavLink>

                                        <NavLink
                                            to="/aboutUs"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "px-4 py-2 rounded-lg bg-blue-500 dark:bg-purple-600 text-white shadow"
                                                    : "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                                            }
                                        >
                                            About Us
                                        </NavLink>

                                        <NavLink
                                            to="/contact"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "px-4 py-2 rounded-lg bg-blue-500 dark:bg-purple-600 text-white shadow"
                                                    : "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                                            }
                                        >
                                            Contact
                                        </NavLink>

                                        {user?.email && (
                                            <NavLink
                                                to="/dashboard"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "px-4 py-2 rounded-lg bg-blue-500 dark:bg-purple-600 text-white shadow"
                                                        : "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
                                                }
                                            >
                                                Dashboard
                                            </NavLink>
                                        )}
                                    </nav>
                                </aside>
                            </div>
                        </div>

                        {/* Logo */}
                        <Link to="/" className="hidden  md:block items-center gap-2">
                            <div className="flex items-center">
                                {/* <img className="w-10" src={logo} alt="logo" /> */}
                                <h1 className="text-2xl font-bold  text-black dark:text-gray-100">
                                    Garment<span className="text-blue-500 dark:text-purple-600">Flow</span>
                                </h1>
                            </div>
                        </Link>

                    </div>

                    {/* Navigation Links */}
                    <div className="nav-container">
                        {navLinks}

                    </div>
                    {/* Right Section */}
                    <div className="flex  items-center  gap-3">
                        <ThemeChangeIcon />
                        {AuthNavLinks}
                        {user && (
                            <div className="dropdown dropdown-end">
                                {/* Avatar Button */}
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar w-10 h-10"
                                >
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            alt="User Avatar"
                                            src={
                                                user?.photoURL ||
                                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Dropdown Menu */}
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content mt-4 w-56 p-2 rounded-xl bg-white dark:bg-gray-900 shadow-xl z-[999] "
                                >
                                    {/* User Info */}
                                    <li className="px-3 py-2 cursor-default">
                                        <div className="flex items-center gap-3 ">
                                            <FaUserCircle className="text-2xl " />
                                            <div>
                                                <p className="font-semibold text-[16px]  text-gray-800 dark:text-gray-200">
                                                    {user?.displayName || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </li>

                                    <div className="divider my-1"></div>

                                    {/* Dashboard */}
                                    <li>
                                        <Link to='/dashboard' className="flex mb-3 items-center dark:text-white text-black hover:bg-blue-500 hover:dark:bg-purple-500 py-2 font-semibold  text-[18px] gap-3">
                                            <MdDashboard />
                                            Dashboard
                                        </Link>
                                    </li>

                                    {/* My Profile */}
                                    <li>
                                        <Link to="/profile" className="flex items-center text-black hover:bg-blue-500 hover:dark:bg-purple-500  font-semibold dark:text-white text-[18px] py-2 gap-3">
                                            <FaUserCircle />
                                            My Profile
                                        </Link>
                                    </li>

                                    <div className="divider my-1"></div>

                                    {/* Logout */}
                                    <li>
                                        <button
                                            onClick={logoutUser}
                                            className="flex items-center font-semibold text-[18px] gap-2  text-red-500 bg-red-100 "
                                        >
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
