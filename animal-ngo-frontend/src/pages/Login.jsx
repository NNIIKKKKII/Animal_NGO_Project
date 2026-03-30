// animal-ngo-frontend/src/pages/Login.jsx

import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
import useStore from "../stores/store.js"
import { Link, Navigate, useNavigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const Login = () => {
  // const { login, isLoading, isAuthenticated } = useAuth();
  const login = useStore((state) => state.login);
  const isLoading = useStore((state) => state.isLoading);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  if (isAuthenticated) {
    return <Navigate to="/" replace />; //Its a JSX Component.
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);

      // read role from store after login completes
      const loggedInUser = useStore.getState().user;

      if (loggedInUser?.role === "admin") {
        navigate("/admin");
      } else if (loggedInUser?.role === "volunteer") {
        navigate("/volunteer/cases");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <VideoBackground>

      <div className="flex items-center justify-center min-h-screen px-4">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/40 shadow-2xl rounded-2xl p-10">

          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Welcome Back 🐾
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Login to continue helping animals
          </p>

          {error && (
            <div className="mb-5 bg-red-100/90 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-60"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                "Log In"
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-gray-700 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-800 font-semibold transition"
            >
              Register Here
            </Link>
          </p>

        </div>

      </div>

    </VideoBackground>
  );
};

export default Login;