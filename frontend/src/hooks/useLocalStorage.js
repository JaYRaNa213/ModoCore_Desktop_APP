import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export const useLocalStorage = (baseKey, initialValue) => {
  const { user } = useAuth();
  const key = user ? `user-${user._id}-${baseKey}` : `guest-${baseKey}`;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("Error writing localStorage key", key, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
