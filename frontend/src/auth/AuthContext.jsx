import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("contextswap-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("contextswap-token") || null;
  });

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("contextswap-user", JSON.stringify(userData));
    localStorage.setItem("contextswap-token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("contextswap-user");
    localStorage.removeItem("contextswap-token");
  };

  useEffect(() => {
    // Optional: validate token with backend (if needed)
    const validateSession = async () => {
      if (token) {
        try {
          // Optionally call: await axios.get("/auth/validate-token", { headers: { Authorization: `Bearer ${token}` } });
          // If invalid: logout();
        } catch (err) {
          console.error("Token validation failed:", err);
          logout();
        }
      }
    };

    validateSession();
  }, [token]);

  useEffect(() => {
    // Auto-sync changes back to localStorage
    if (user) {
      localStorage.setItem("contextswap-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("contextswap-user");
    }

    if (token) {
      localStorage.setItem("contextswap-token", token);
    } else {
      localStorage.removeItem("contextswap-token");
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
