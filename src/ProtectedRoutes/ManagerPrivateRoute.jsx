import React from "react";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import Forbidden from "../components/Forbidden/Forbidden";

export default function ManagerPrivateRoute({ children }) {
    const { isLoading ,user} = useAuth();
    const { role, roleLoading } = useRole();
    // Loading state
    if (isLoading ||!user || roleLoading) {
        return <Loading />;
    }

    // If logged in but not buyer → show Forbidden page
    if (role !== "manager") {
        return <Forbidden></Forbidden>
    }

    // If user is buyer → allow access
    return children;
}
