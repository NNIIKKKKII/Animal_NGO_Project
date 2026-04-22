import React, { useState } from "react";
import useStore from "../stores/store.js";
import { useNavigate, Link, Navigate } from "react-router-dom";

const LoginNgo = () => {
  const navigate = useNavigate();
  const loginNgo = useStore((state) => state.loginNgo);
  const isNgoAuthenticated = useStore((state) => state.isNgoAuthenticated);

  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (isNgoAuthenticated) {
    return <Navigate to="/ngo/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginNgo(form);
      navigate("/ngo/dashboard");
    } catch (err) {
      setError(typeof err === "string" ? err : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            NGO Login
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Access your NGO dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center border-t pt-4">
          <p className="text-sm text-gray-700">
            Don't have an NGO account?
          </p>

          <Link
            to="/ngo/register"
            className="font-semibold text-green-700 hover:text-green-600"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginNgo;
