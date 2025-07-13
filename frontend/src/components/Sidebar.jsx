// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  Settings,
  Bell,
  User,
  Layers,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { name: "Templates", path: "/templates", icon: <ListTodo size={18} /> },
  { name: "Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
  { name: "Workspaces", path: "/workspaces", icon: <Layers size={18} /> },
  { name: "Notifications", path: "/notifications", icon: <Bell size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r px-6 py-8 shadow-md flex flex-col justify-between">
      {/* Top Logo + Links */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-600 mb-10 tracking-tight">
          ContextSwap
        </h1>
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="text-indigo-500">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="text-xs text-gray-400">
        <p>© 2025 ContextSwap</p>
        <p>Built with ❤️</p>
      </div>
    </aside>
  );
}
