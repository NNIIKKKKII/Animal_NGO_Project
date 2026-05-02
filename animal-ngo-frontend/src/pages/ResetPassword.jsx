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
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VideoBackground>
      <div className="w-full max-w-md p-4">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">Account Recovery</p>
          <h1 className="app-title mt-3 text-center text-4xl">Reset Password</h1>
          <p className="app-subtitle mt-3 text-center">
            Enter your reset token and set a new password.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Reset Token"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="app-input font-mono text-sm"
            />

            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="app-input"
            />

            <button type="submit" disabled={isLoading} className="app-btn app-btn-primary w-full">
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-center">
            <Link to="/forgot-password" className="block text-sm text-[#8a6460] hover:text-[#b83d55]">
              Need a new token?
            </Link>
            <Link to="/login" className="block text-sm text-[#8a6460] hover:text-[#b83d55]">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default ResetPassword;
