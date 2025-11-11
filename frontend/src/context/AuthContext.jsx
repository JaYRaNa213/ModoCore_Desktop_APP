

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const DEFAULT_GUEST_NAME = "Guest User";

const generateGuestId = () => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestId, setGuestId] = useState(null);
  const [guestName, setGuestName] = useState(DEFAULT_GUEST_NAME);

 // AuthContext.js (Fixed version)
useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedGuestId = localStorage.getItem("guestId");
    const storedGuestName = localStorage.getItem("guestName");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedGuestId) {
      setGuestId(storedGuestId);
    } else {
      const newGuestId = generateGuestId();
      localStorage.setItem("guestId", newGuestId);
      setGuestId(newGuestId);
    }

    if (storedGuestName && storedGuestName !== "undefined") {
      setGuestName(storedGuestName);
    } else {
      localStorage.setItem("guestName", DEFAULT_GUEST_NAME);
      setGuestName(DEFAULT_GUEST_NAME);
    }
  } catch (err) {
    console.error("AuthContext: Failed to load from localStorage", err);
  } finally {
    setLoading(false);
  }
}, []);

const login = useCallback((userData, authToken) => {
  console.log("🔐 Saving login:", userData);
  setUser(userData);
  setToken(authToken);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", authToken);
}, []);

const logout = useCallback(() => {
  console.log("Logout → clearing user and token");
  setUser(null);
  setToken(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}, []);


const updateGuestName = useCallback((name) => {
  const trimmed = (name || "").trim();
  const finalName = trimmed.length > 0 ? trimmed : DEFAULT_GUEST_NAME;
  setGuestName(finalName);
  localStorage.setItem("guestName", finalName);
}, []);

const contextValue = useMemo(
  () => ({
    user,
    token,
    login,
    logout,
    loading,
    guestId,
    guestName,
    setGuestName: updateGuestName,
    isGuest: !user,
  }),
  [user, token, loading, guestId, guestName, login, logout, updateGuestName]
);

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* Prevent early render */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
