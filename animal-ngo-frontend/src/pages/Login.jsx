// animal-ngo-frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
//ZUSTAND
// import { useAuth } from "../stores/useAuthStore";
import { Link } from "react-router-dom";

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
      setError(err);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-screen-minus-header">
      <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome Back
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
                ...
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
  );
};

export default Login;
