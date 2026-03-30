import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import { resetPassword } from "../api/authService";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      // Success - navigate to login
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VideoBackground>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/40 shadow-2xl rounded-2xl p-10">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Reset Password 🔐
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Enter your reset token and new password
          </p>

          {error && (
            <div className="mb-5 bg-red-100/90 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Reset Token"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-5 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 font-mono text-sm"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-5 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/forgot-password"
              className="block text-gray-700 hover:text-gray-900 font-medium hover:underline"
            >
              Need a new token?
            </Link>
            <Link
              to="/login"
              className="block text-gray-700 hover:text-gray-900 font-medium hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default ResetPassword;
