import { CONFIG } from "@/config/config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");

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
