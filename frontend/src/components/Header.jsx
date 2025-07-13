// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-bold text-gray-800">Welcome to ModoCore </h2>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            👤 <strong>{user.username}</strong>
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-600 text-sm hover:underline"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-blue-600 text-sm hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 text-sm hover:underline">Register</Link>
        </div>
      )}
    </header>
  );
}
