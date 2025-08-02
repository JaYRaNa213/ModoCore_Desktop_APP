// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider> 
        <App />
        <Toaster position="top-center" />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
