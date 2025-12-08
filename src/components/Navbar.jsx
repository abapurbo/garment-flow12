import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo/logo.png'
const Navbar = () => {
    const [user, setUser] = useState(null);

    const navLinks = (
        <div className="urbanist-font text-[17px] text-blue-500 hidden lg:block font-bold">
            <NavLink to="/" className="mx-2">Home</NavLink>
            <NavLink to="/all-products" className="mx-2">All Products</NavLink>
            <NavLink to="/about" className="mx-2">About Us</NavLink>
            <NavLink to="/contact" className="mx-2">Contact</NavLink>
            {user?.email && (
                <>
                    <NavLink to="/dashboard" className="mx-2 font-semibold">Dashboard</NavLink>
                    <button className="mx-2 btn btn-error btn-sm text-white">
                        Logout
                    </button>
                </>
            )}
        </div>
    );

    const AuthNavLinks = (
        <div className="urbanist-font text-[16px]  hidden lg:block font-bold">
            {!user && (
                <>
                    <NavLink to="/login" className="mx-2 btn btn-primary rounded-full">Login</NavLink>
                    <NavLink to="/signUp" className="mx-2 btn btn-primary rounded-full">Sign Up</NavLink>
                </>
            )}
        </div>
    )

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] z-50">
            <div
                className="
                    backdrop-blur-lg bg-white/10 
                    border border-white/20
                    shadow-lg
                    flex items-center justify-between 
                    px-6 py-3 rounded-2xl
                "
            >
                {/* Logo Left */}
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <img className="w-10" src={logo} alt="logo" />
                        <h1 className="text-2xl text-black font-bold roboto-font -ml-2">Garment<span className='text-blue-500'>Flow</span></h1>
                    </Link>
                </div>

                {/* Middle Nav */}
                <div>{navLinks}</div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {AuthNavLinks}

                    {user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full bg-primary"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
