// src/auth/PrivateRoute.jsx
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // While checking auth status, avoid rendering anything
  if (loading) return <div className="text-center p-4">Loading...</div>;

  // If logged in, render the protected component
  if (user) return children;

  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
}
