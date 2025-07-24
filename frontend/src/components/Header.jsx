// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  LogOut,
  User,
  Settings,
  ChevronDown,
  Menu,
  X,
  Zap,
  Crown,
  Bell,
  Search,
  Home,
  Target,
  Plus,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/templates", label: "Templates", icon: Target },
    { path: "/add-template", label: "Create", icon: Plus },
    { path: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-white group-hover:to-purple-300 transition-all duration-300">
                    ContextSwap
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">Workspace Templates</p>
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
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${
                      isActivePath(path) ? "" : "group-hover:scale-110"
                    }`} />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/*Button (Desktop) */}
              
              {/* Notifications */}
              <button className="relative p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              </button>

              {user ? (
                /* User Menu */
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-white">{user.username}</p>
                      <p className="text-xs text-gray-400">Pro Member</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsUserMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl z-20 overflow-hidden">
                        <div className="p-4 border-b border-gray-800/50">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{user.username}</p>
                              <p className="text-sm text-gray-400">jay@example.com</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Crown className="w-3 h-3 text-amber-400" />
                                <span className="text-xs text-amber-400 font-medium">Pro Member</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
                          >
                            <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Profile Settings</span>
                          </Link>
                          
                          <Link
                            to="/settings"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
                          >
                            <Settings className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Preferences</span>
                          </Link>
                          
                          <div className="border-t border-gray-800/50 my-2"></div>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all duration-300 group"
                          >
                            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Auth Links */
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
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Get Started
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
                
          
                
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}