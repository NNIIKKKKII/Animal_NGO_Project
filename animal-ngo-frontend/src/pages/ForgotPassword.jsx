import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import { forgotPassword } from "../api/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResetToken(null);
    setIsLoading(true);

    try {
      const data = await forgotPassword(email);
      setResetToken(data.resetToken);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate reset token");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VideoBackground>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/40 shadow-2xl rounded-2xl p-10">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Forgot Password? 🔑
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Enter your email to receive a reset token
          </p>

          {error && (
            <div className="mb-5 bg-red-100/90 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {resetToken && (
            <div className="mb-5 bg-green-100/90 text-green-700 px-4 py-3 rounded-lg text-sm">
              <p className="font-semibold mb-2">Reset token generated!</p>
              <p className="text-xs mb-2">Copy this token (valid for 15 minutes):</p>
              <div className="bg-white/70 p-3 rounded border border-green-300 break-all font-mono text-xs">
                {resetToken}
              </div>
              <Link
                to="/reset-password"
                className="block mt-3 text-center text-green-800 font-semibold hover:underline"
              >
                Go to Reset Password →
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Get Reset Token"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 font-medium hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default ForgotPassword;
