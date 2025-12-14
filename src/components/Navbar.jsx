import React from "react";
import { Link, NavLink, useLocation } from 'react-router';
import logo from '../assets/logo/logo.png'
import { useAuth } from '../hooks/useAuth';
import ThemeChangeIcon from './ThemeChanageIcon';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const location = useLocation();
    const activeClass = "font-extrabold underline text-blue-600 dark:text-purple-400";
    const normalClass = " dark:hover:text-purple-600 duration-200 hover:underline";

    const navLinks = (
        <div className="urbanist-font text-[17px] hidden lg:block font-bold space-x-4 text-blue-600 dark:text-gray-100">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            <NavLink to="/all-products" className={({ isActive }) => isActive ? activeClass : normalClass}>All Products</NavLink>
            <NavLink to="/aboutUs" className={({ isActive }) => isActive ? activeClass : normalClass}>About Us</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>
            {user?.email && <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink>}
        </div>
    );
    const AuthNavLinks = (
        <div className="urbanist-font text-[16px] hidden lg:block font-bold space-x-2">
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
                            `border-2 px-4 py-2 rounded-xs 
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
        <div className="fixed top-4 left-1/2 -translate-x-1/2 container mx-auto px-10 z-50">
            <div className={`backdrop-blur-3xl ${location.pathname === '/' || location.pathname === '/aboutUs' ? 'bg-white/5 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} border border-white/20 dark:border-gray-700 shadow-2xl flex items-center justify-between px-6 py-3 rounded-2xl`}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-10" src={logo} alt="logo" />
                    <h1 className="text-2xl font-bold -ml-2 text-black dark:text-gray-100">
                        Garment<span className="text-blue-500 dark:text-purple-600">Flow</span>
                    </h1>
                </Link>

                {/* Navigation Links */}
                {navLinks}

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <ThemeChangeIcon />
                    {AuthNavLinks}
                    {user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={user?.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-gray-100 dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">Profile<span className="badge">New</span></a>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <button onClick={logoutUser} className='btn btn-outline btn-error w-full'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
