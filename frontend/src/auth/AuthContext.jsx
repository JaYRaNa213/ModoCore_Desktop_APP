import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // <-- NEW

  useEffect(() => {
    // Load user and token from localStorage on mount
    const storedUser = localStorage.getItem("contextswap-user");
    const storedToken = localStorage.getItem("contextswap-token");

    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to parse auth data:", err);
    } finally {
      setLoading(false); // <-- Mark loading complete
    }
  }, []);

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

  // Optional token validation
  useEffect(() => {
    const validateSession = async () => {
      if (token) {
        try {
          // await axios.get("/auth/validate-token", { headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
          console.error("Token validation failed:", err);
          logout();
        }
      }
    };

    validateSession();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
