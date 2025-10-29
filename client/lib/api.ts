import { CONFIG } from "@/config/config";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("my-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
