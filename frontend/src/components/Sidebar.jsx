// ✅ src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  Settings,
  Bell,
  User,
  Bot,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { name: "Templates", path: "/templates", icon: <ListTodo size={18} /> },
  // { name: "Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
  // { name: "Automations", path: "/automations", icon: <Bot size={18} /> },
  // { name: "Logs", path: "/logs", icon: <Clock size={18} /> },
  
  { name: "Notifications", path: "/notifications", icon: <Bell size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
  // { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <aside className="relative w-64 h-screen bg-black/50 backdrop-blur-xl border-r border-gray-800/50 px-6 py-8 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
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
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-white font-semibold shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-full"></div>
                  )}
                  
                  {/* Icon with background */}
                  <div className={clsx(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg" 
                      : "bg-gray-800/50 text-gray-400 group-hover:bg-gray-700/50 group-hover:text-white group-hover:scale-110"
                  )}>
                    {link.icon}
                  </div>
                  
                  {/* Link text */}
                  <span className={clsx(
                    "transition-colors duration-200",
                    isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}>
                    {link.name}
                  </span>
                  
                  {/* Hover effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center space-y-1">
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            © 2025 Templaunch
          </p>
          <p className="text-gray-500">Built with ❤️ by Jay Rana</p>
        </div>
      </aside>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}