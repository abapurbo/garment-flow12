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
import Cookies from "js-cookie";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //Save Firebase ID token (force refresh)
  const saveTokenInCookie = async (currentUser) => {
    if (!currentUser) return;
    const token = await currentUser.getIdToken(true); // 🔥 important
    Cookies.set("accessToken", token, {
      expires: 1,
      path: "/",
      sameSite: "lax",
      secure: false, // true in production (https)
    });
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

  // Login
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
