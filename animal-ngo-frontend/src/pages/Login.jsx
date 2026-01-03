// animal-ngo-frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const Login = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      // Context handles successful navigation
    } catch (err) {
      // Error is the message thrown from the AuthContext
      setError(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <VideoBackground>
      <div className="flex items-center justify-center p-6 min-h-screen-minus-header">
        <div className="w-full max-w-md bg-white/50 backdrop-blur-md p-8 shadow-2xl rounded-xl">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Welcome Back 🐾
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="bg-red-100 text-red-600 p-3 rounded-md text-sm text-center">
                {error}
              </p>
            )}
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
            />
            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
            />
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-800 font-medium"
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