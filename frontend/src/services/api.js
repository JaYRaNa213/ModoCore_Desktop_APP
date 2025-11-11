// src/services/api.js
import axios from "axios";

// ✅ Base URL automatically comes from Vite environment variables
// In dev: VITE_API_URL=http://localhost:5000/api
// In production: VITE_API_URL=https://contextswap-backend.onrender.com/api
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  // optional: timeout for safety
  timeout: 15000,
});

// ✅ Automatically include JWT token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const guestId = localStorage.getItem("guestId");
      const guestName = localStorage.getItem("guestName") || "Guest User";
      if (guestId) {
        config.headers["X-Guest-Id"] = guestId;
        config.headers["X-Guest-Name"] = guestName;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
