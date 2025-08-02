import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import api from "../services/api"; // make sure path is correct

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error on submit

    try {
      const res = await api.post("http://localhost:5000/api/users/login", form);
      const data = res.data;

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Store user info in context
      login(data.user);

      // Redirect
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login to ContextSwap
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
          <a
            href="/register"
            className="text-indigo-400 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
