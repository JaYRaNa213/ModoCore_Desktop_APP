// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"; // ✅ import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap here */}
        <App />
        <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
