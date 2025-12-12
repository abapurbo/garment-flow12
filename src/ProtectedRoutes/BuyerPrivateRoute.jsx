import React from "react";
import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import Loading from '../components/Loading'
import Forbidden from "../components/Forbidden/Forbidden";

export default function BuyerPrivateRoute({ children }) {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  // Loading state
  if (isLoading || roleLoading) {
    return <Loading />;
  }

  // If not logged in → redirect to login
  if (!user) {
    console.log('ljsfljsfljsf')
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in but not buyer → show Forbidden page
  if (role !== "buyer") {
    return <Forbidden />;
  }

  // If user is buyer → allow access
  return children;
}
