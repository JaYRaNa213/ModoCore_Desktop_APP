import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { getGuestTemplates, saveGuestTemplates } from "../utils/guestTemplates";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/"); // Redirect if already logged in
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const localTemplates = getGuestTemplates();
      const res = await api.post("/users/login", { ...form, localTemplates });
      const data = res.data;

      login(data.user, data.token);
      saveGuestTemplates([]); // clear guest templates after sync
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#0d131f] text-white px-4 sm:px-6">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-[#0d131f]"></div>
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative bg-black/70 backdrop-blur-xl border border-gray-800/60 rounded-2xl shadow-2xl p-8 sm:p-10 w-[400px] lg:w-[800] md:w-[800] sm:w-[800]">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">T</span>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to continue with <span className="text-indigo-400">Templaunch</span>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0d131f]/60 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0d131f]/60 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-indigo-700/30 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Footer Links */}
        <p className="text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-all duration-300"
          >
            Register
          </Link>
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          input {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
