// src/components/Header.jsx
import { useAuth } from "../auth/useAuth";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-bold text-gray-800">Welcome back 👋</h2>

      {user && (
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
      )}
    </header>
  );
}
