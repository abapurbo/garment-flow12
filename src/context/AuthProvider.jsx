import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    getIdToken,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Save token to cookie
    const saveTokenInCookie = async (user) => {
        if (!user) return;
        const token = await getIdToken(user);
        Cookies.set("accessToken", token, { expires: 1, path: "/", secure: true });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                await saveTokenInCookie(currentUser);
            } else {
                Cookies.remove("accessToken", { path: "/" });
            }
        });
        return () => unsubscribe();
    }, []);

    // Register
    const createUser = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await saveTokenInCookie(result.user);
        setUser(result.user);
        return result;
    };

    // Login with email/password
    const loginUser = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await saveTokenInCookie(result.user);
        setUser(result.user);
        return result;
    };

    // Google login
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        await saveTokenInCookie(result.user);
        setUser(result.user);
        return result.user;
    };

    // Update profile
    const updateUserProfile = async (profile) => {
        await updateProfile(auth.currentUser, profile);
        await auth.currentUser.reload();
        setUser({ ...auth.currentUser });
        await saveTokenInCookie(auth.currentUser);
    };

    // Logout
    const logoutUser = async () => {
        await signOut(auth);
        Cookies.remove("accessToken", { path: "/" });
        setUser(null);
    };

    const authInfo = {
        user,
        isLoading,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        signInWithGoogle,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
}
