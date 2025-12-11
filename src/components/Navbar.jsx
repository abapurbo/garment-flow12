import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import logo from '../assets/logo/logo.png'
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const location = useLocation()
    const activeClass = "font-extrabold underline text-blue-600";
    const normalClass = "hover:text-blue-500 duration-200 hover:underline";

    const navLinks = (
        <div className="urbanist-font text-[17px] text-blue-500 hidden lg:block font-bold space-x-4">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/all-products"
                className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                }
            >
                All Products
            </NavLink>

            <NavLink
                to="/aboutUs"
                className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                }
            >
                About Us
            </NavLink>

            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                }
            >
                Contact
            </NavLink>

            {user?.email && (
                <>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? activeClass : normalClass
                        }
                    >
                        Dashboard
                    </NavLink>


                </>
            )}
        </div>
    );

    const AuthNavLinks = (
        <div className="urbanist-font text-[16px] hidden lg:block font-bold space-x-2">
            {!user && (
                <>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `border-2 px-4 py-2 rounded-xs border-blue-500 text-blue-500 ${isActive ? 'bg-blue-500 text-white' : " hover:bg-blue-500 hover:text-white"}`
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signUp"
                        className={({ isActive }) =>
                            `border-2 px-4 py-2 rounded-xs border-blue-500 text-blue-500 ${isActive ? 'bg-blue-500 text-white' : " hover:bg-blue-500 hover:text-white"}`
                        }
                    >
                        Sign Up
                    </NavLink>
                </>
            )}
        </div>
    );

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] z-50">
            <div className={`backdrop-blur-3xl ${location.pathname == '/'|| location.pathname == '/aboutUs' ? 'bg-white/5' : 'bg-blue-100'}  border border-white/20 shadow-2xl flex items-center justify-between px-6 py-3 rounded-2xl`}>

                <div>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img className="w-10" src={logo} alt="logo" />
                        <h1 className="text-2xl text-black font-bold roboto-font -ml-2">
                            Garment<span className="text-blue-500">Flow</span>
                        </h1>
                    </Link>
                </div>

                {/* Nav Links */}
                <div>
                    {navLinks}
                </div>

                {/* Right Avatar / Auth */}
                <div className="flex items-center gap-4">
                    {AuthNavLinks}

                    {user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL ? user?.photoURL : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><button onClick={logoutUser} className='btn btn-outline btn-error'>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Navbar;
