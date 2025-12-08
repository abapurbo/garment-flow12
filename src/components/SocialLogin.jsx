import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function SocialLogin() {
    const { signInWithGoogle } = useAuth();
    return <div>
        <button
            onClick={signInWithGoogle}
            className="w-full py-3 bg-white text-blue-800 font-semibold 
            rounded-xl flex items-center justify-center gap-3 shadow-sm 
            hover:shadow-lg transition"
        >
            <img
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="Google"
                className="w-6"
            />
            Continue with Google
        </button>
    </div>;
}
