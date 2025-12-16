import React from "react";
import { useAuth } from '../../hooks/useAuth';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

export default function SocialLogin() {
    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate()
    console.log(location)
    const handleSocialLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/user', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data);
                        toast.success("Logged in successfully!");
                    })
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <button
                onClick={handleSocialLogin}
                className="w-full py-3 
                    bg-blue-50 dark:bg-purple-600 
                    text-blue-800 dark:text-white 
                    font-semibold rounded-xl flex items-center justify-center gap-3 
                    shadow-sm hover:shadow-lg transition"
            >
                <img
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="Google"
                    className="w-6"
                />
                Continue with Google
            </button>
        </div>
    );
}
