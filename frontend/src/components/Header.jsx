import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  Menu,
  X,
  Zap,
  Home,
  Target,
  Plus,
} from "lucide-react";

export default function Header() {
  const { user, logout, loading, isGuest } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [guestNameDraft, setGuestNameDraft] = useState("");

  // ✅ Load guest name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("guestName");
    if (savedName) {
      setGuestNameDraft(savedName);
    } else {
      localStorage.setItem("guestName", "User");
      setGuestNameDraft("User");
    }
  }, []);

  // ✅ Save guest name when committed
  const handleGuestNameCommit = () => {
    const name = guestNameDraft.trim() || "User";
    setGuestNameDraft(name);
    localStorage.setItem("guestName", name);
  };

  const navLinks = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/templates", label: "Templates", icon: Target },
    { path: "/add-template", label: "Create", icon: Plus },
  ];

  const isActivePath = (path) => location.pathname === path;

  if (loading) return null;

  return (
    <>
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-8">
  {/* ✅ Left: Logo + Desktop Nav */}
  <div className="flex items-center gap-4 sm:gap-6">
    {/* Logo + Title */}
    <div className="flex items-center gap-2 sm:gap-3">
      <img
        src="/ico.png"
        alt="logo"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg object-contain transition-all duration-300"
      />

      <div className="hidden sm:block">
        <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent transition-all duration-300">
          Templaunch
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-400 -mt-1">
          Workspace Templates
        </p>
      </div>
    </div>

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
  

            <div className="flex items-center gap-3 sm:gap-4">
          {isGuest && (
            <>
              <div className="hidden sm:flex items-center gap-3 bg-gray-900/60 border border-gray-800/60 px-3 py-1.5 rounded-xl">
                <span className="text-xs text-gray-400">Welcome,</span>
                <input
                  value={guestNameDraft}
                  onChange={(e) => setGuestNameDraft(e.target.value)}
                  onBlur={handleGuestNameCommit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGuestNameCommit();
                      e.currentTarget.blur();
                    }
                  }}
                  className="bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder-gray-500 w-28"
                  maxLength={30}
                  placeholder="User"
                />
              </div>
              <span className="hidden sm:block text-xs text-emerald-300">
                Your name is saved locally.
              </span>
            </>
          )}

          {/* Download Button */}
          <a
            href="https://github.com/JaYRaNa213/ModoCore_Desktop_APP/releases/download/v1.0.0/Templaunch.Setup.1.0.0.exe"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Download App
          </a>


              {/* Auth Buttons */}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow hover:shadow-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : null}

              {/* ✅ Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        <div
          className={`lg:hidden bg-black/90 backdrop-blur-xl border-t border-gray-800/50 overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
            {/* Nav Links */}
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

            {isGuest && (
              <div className="space-y-2 bg-gray-900/60 border border-gray-800/60 rounded-xl p-3">
                <label className="text-xs uppercase tracking-wide text-gray-400">Display name</label>
                <input
                  value={guestNameDraft}
                  onChange={(e) => setGuestNameDraft(e.target.value)}
                  onBlur={handleGuestNameCommit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGuestNameCommit();
                      e.currentTarget.blur();
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-gray-700/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Guest User"
                  maxLength={30}
                />
                <p className="text-[11px] text-emerald-300">
                  Guest mode — your data is stored permanently.
                </p>
              </div>
            )}

            {/* Download Button (Mobile) */}
            <a
              href="https://github.com/JaYRaNa213/ModoCore_Desktop_APP/releases/download/v1.0.0/Templaunch.Setup.1.0.0.exe"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              Download App
            </a>

            {/* Auth Actions (Mobile) */}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="flex items-center justify-center gap-3 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow hover:shadow-lg transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* ✅ Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
