import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logoutUser = () => signOut(auth);

    const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

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
