import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies?.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    if (error.code === "ECONNABORTED") {
      toast.error("⏱️ That took too long… Try again or refresh the page.");
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Cookies?.remove("accessToken");
          break;
        case 403:
          console.log("Forbidden access:", error.response.data);
          break;
        case 404:
          console.log("Resource not found:", error.response.data);
          break;
        default:
          if (error.response.data?.status === 429) {
            toast.error(
              "You've made too many requests. Please wait a moment and try again."
            );
          }
      }

      return Promise.reject(error.response.data);
    } else if (error.request) {
      toast.error("⏱️ That took too long… Try again or refresh the page.");
      return Promise.reject(new Error("Network error occurred"));
    } else {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }
);
