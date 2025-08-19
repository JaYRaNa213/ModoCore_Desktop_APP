

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

 // AuthContext.js (Fixed version)
useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }
  } catch (err) {
    console.error("AuthContext: Failed to load from localStorage", err);
  } finally {
    setLoading(false);
  }
}, []);

const login = (userData, authToken) => {
  console.log("🔐 Saving login:", userData);
  setUser(userData);
  setToken(authToken);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", authToken);
};

const logout = () => {
  console.log("Logout → clearing user and token");
  setUser(null);
  setToken(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};


  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children} {/* Prevent early render */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
