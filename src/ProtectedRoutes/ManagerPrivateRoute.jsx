import React from "react";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import Forbidden from "../components/Forbidden/Forbidden";

export default function ManagerPrivateRoute({ children }) {
    const { user, isLoading } = useAuth();
    const { role, roleLoading } = useRole();
    const location = useLocation();
    console.log(role)
    // Loading state
    if (isLoading || roleLoading) {
        return <Loading />;
    }

    // If not logged in → redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If logged in but not buyer → show Forbidden page
    if (role !== "manager") {
        return <Navigate to='/forbidden'></Navigate>;
    }

    // If user is buyer → allow access
    return children;
}
