import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Bell,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react";
import clsx from "clsx";
import Logo from "../assets/app-icon.png";

const links = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { name: "Workspace", path: "/templates", icon: <ListTodo size={18} /> },
  { name: "Notifications", path: "/notifications", icon: <Bell size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar panel */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-black/60 backdrop-blur-2xl border-r border-gray-800/50 px-6 py-8 shadow-2xl transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Animated background */}
       

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">

<img
  src={Logo}
  alt="logo"
  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
/>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent tracking-tight">
              Templaunch
            </h1>
            <p className="text-xs text-gray-400 -mt-1">Workspace Manager</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-white font-semibold shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50 border border-transparent"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-full"></div>
                )}

                <div
                  className={clsx(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-800/50 text-gray-400 group-hover:bg-gray-700/50 group-hover:text-white group-hover:scale-110"
                  )}
                >
                  {link.icon}
                </div>

                <span
                  className={clsx(
                    "transition-colors duration-200",
                    isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}
                >
                  {link.name}
                </span>

                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full text-xs text-gray-400 text-center space-y-1">
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            © 2025 Templaunch
          </p>
          <p className="text-gray-500">Built with ❤️ by Jay Rana</p>
        </div>

        <style>{`
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </aside>
    </>
  );
}
