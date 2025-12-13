import React from "react";
import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

export default function BuyerPrivateRoute({ children }) {
  const {isLoading,user } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  // 1️⃣ First handle auth loading
  if (isLoading || roleLoading||!user) {
    return <Loading />;
  }
  // 4️⃣ If role mismatch → show forbidden
  if (role !== "buyer") {
    return <Forbidden />;
  }

  // 5️⃣ If everything is correct → show page
  return children;
}
