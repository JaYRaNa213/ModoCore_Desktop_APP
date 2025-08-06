import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import { useAuth } from "../auth/AuthContext";
import {
  LogOut,
  Menu,
  X,
  Zap,
  Bell,
  Home,
  Target,
  Plus,
  BarChart3,
} from "lucide-react";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Fix: added
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/templates", label: "Templates", icon: Target },
    { path: "/add-template", label: "Create", icon: Plus },
    { path: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  ];
  console.log("Header → loading:", loading);
console.log("Header → user:", user);


  const isActivePath = (path) => location.pathname === path;

  if (loading) return null;

  return (
    <>
      <header className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-white group-hover:to-purple-300 transition-all duration-300">
                    ContextSwap
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">
                    Workspace Templates
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                      isActivePath(path)
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActivePath(path) ? "" : "group-hover:scale-110"
                      }`}
                    />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              </button>

              {/* Auth Section */}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    navigate("/login"); // ✅ Redirect after logout
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow hover:shadow-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-gray-800/50 rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800/50 bg-black/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <nav className="space-y-2">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-all duration-300 ${
                      isActivePath(path)
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      navigate("/login"); // ✅ Fix logout redirect
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all duration-300 group"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
