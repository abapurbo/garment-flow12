import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import useAxiosPublic from "./useAxiosPublic";

export default function useFetchProducts() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const axiosPublic = useAxiosPublic();

    const { data: allProducts = [], isLoading } = useQuery({
        queryKey: ['home-products', isHomePage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/home-products?showOnHome=${isHomePage}`);
            console.log(res.data)
            return res.data
        }
    });
    return { allProducts, isLoading };
}
