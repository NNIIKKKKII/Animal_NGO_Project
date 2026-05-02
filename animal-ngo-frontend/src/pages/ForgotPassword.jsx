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
      <div className="w-full max-w-md p-4">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">Account Recovery</p>
          <h1 className="app-title mt-3 text-center text-4xl">Forgot Password</h1>
          <p className="app-subtitle mt-3 text-center">
            Enter your email to generate a password reset token.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          {resetToken && (
            <div className="app-alert app-alert-success mt-6">
              <p className="font-semibold">Reset token generated.</p>
              <p className="mt-1 text-xs">Valid for 15 minutes:</p>
              <div className="mt-2 rounded-lg border border-[#c8e9d4] bg-white p-3 break-all font-mono text-xs text-[#2f6048]">
                {resetToken}
              </div>
              <Link to="/reset-password" className="mt-3 inline-block font-semibold text-[#2e724f] hover:text-[#245f40]">
                Go to Reset Password
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-input"
            />

            <button type="submit" disabled={isLoading} className="app-btn app-btn-primary w-full">
              {isLoading ? "Generating..." : "Get Reset Token"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#8a6460] hover:text-[#b83d55]">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default ForgotPassword;
