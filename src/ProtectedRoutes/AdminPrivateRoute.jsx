import React from "react";
import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

export default function BuyerPrivateRoute({ children }) {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  // First handle auth loading
  if (isLoading) {
    return <Loading />;
  }

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //Now wait for role loading
  if (roleLoading) {
    return <Loading />;
  }

  // If role mismatch → show forbidden
  if (role !== "buyer") {
    return <Forbidden />;
  }

  // If everything is correct → show page
  return children;
}
