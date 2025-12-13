import React from "react";
import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

export default function BuyerPrivateRoute({ children }) {
  const { isLoading, user } = useAuth();
  const { role, roleLoading } = useRole();
  // First handle auth loading
  if (isLoading || roleLoading || !user) {
    return <Loading />;
  }
  // If role mismatch → show forbidden
  if (role !== "admin") {
    return <Forbidden />;
  }

  // If everything is correct → show page
  return children;
}
