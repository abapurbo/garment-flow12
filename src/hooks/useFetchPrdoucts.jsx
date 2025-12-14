import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useLocation } from "react-router";
import { useAuth } from "./useAuth";

export default function useFetchPrdoucts() {
    const location = useLocation()
    const { user, isLoading: authLoading } = useAuth()
    const showOnPage = location.pathname === '/'
    console.log(showOnPage)
    const axiosSecure = useAxiosSecure()
    const { data: allProducts = [], isLoading } = useQuery({
        queryKey: ['all-products', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-product?showOnHome=${showOnPage}`)
            return res.data
        }

    })
    return { allProducts, isLoading }
}
