import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo/logo.png';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

// Suppose you are using Auth Context

const Navbar = () => {
    // const { logout } = useAuth()
    const [user ,setUser]=useState(null);

    const navLinks = (
        <div className="urbanist-font text-[16px] font-semibold">
            <NavLink to="/" className="mx-2">Home</NavLink>
            <NavLink to="/all-products" className="mx-2">All Products</NavLink>
            <NavLink to="/about" className="mx-2">About Us</NavLink>
            <NavLink to="/contact" className="mx-2">Contact</NavLink>

            {!user && (
                <>
                    <NavLink to="/login" className="mx-2">Login</NavLink>
                    <NavLink to="/register" className="mx-2">Sign Up</NavLink>
                </>
            )}

            {user?.email && (
                <>
                    <NavLink to="/dashboard" className="mx-2 font-semibold">Dashboard</NavLink>
                    <button 
                        // onClick={logout} 
                        className="mx-2 btn btn-error btn-sm text-white"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-6">
            {/* Logo Left */}
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-14" src='https://i.ibb.co.com/p6pj3QcF/logo2-removebg-preview.png' alt="logo" />
                    <h1 className="text-2xl text-red-900 font-bold roboto-font -ml-4">GarmentFlow</h1>
                </Link>
            </div>

            {/* Navigation Right */}
            <div className="flex items-center gap-4">
                {navLinks}

                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-primary"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
