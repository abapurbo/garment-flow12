import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// google provider
const googleProvider = new GoogleAuthProvider()
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
   console.log(user)
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    // signIn user
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    // logout user
    const logoutUser = () => {
        return signOut(auth)
    }
    // sign in with google
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        user,
        isLoading,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        signInWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}
