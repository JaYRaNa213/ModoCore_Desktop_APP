// src/services/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Attach either JWT token or guest headers automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const guestId = localStorage.getItem("guestId");
      const guestName = localStorage.getItem("guestName") || "Guest User";
      if (guestId) {
        config.headers = config.headers || {};
        config.headers["X-Guest-Id"] = guestId;
        config.headers["X-Guest-Name"] = guestName;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// If a tokened request gets a 401, drop the creds and send user to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const hadToken = Boolean(localStorage.getItem("token"));
    if (status === 401 && hadToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.warn("API 401 — token invalid, redirecting to login");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;