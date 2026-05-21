import axios from "axios";
import { authClient } from "@/lib/auth-client";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await authClient.getSession();
      const token = session?.data?.session?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Token attach failed:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;