import axios from "axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      // Read token from cookie
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          try {
            await logoutUser();
            navigate("/login", { replace: true });
            console.log("User logged out due to unauthorized access");
          } catch (err) {
            console.error("Logout failed:", err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
