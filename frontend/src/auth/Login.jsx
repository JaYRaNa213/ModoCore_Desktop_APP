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
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
       // Include guest templates in login payload
    const localTemplates = getGuestTemplates();

      const res = await api.post("/users/login", {
      ...form,
      localTemplates
    });
      const data = res.data;

      login(data.user, data.token); 

        // ✅ optional: clear guest templates after sync
      saveGuestTemplates([]);

      navigate("/"); // redirect after login
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login to Templaunch
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring focus:border-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring focus:border-indigo-500"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-neutral-400 mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
