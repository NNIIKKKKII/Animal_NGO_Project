import React, { useState } from "react";
import useStore from "../stores/store.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const Login = () => {
  const login = useStore((state) => state.login);
  const isLoading = useStore((state) => state.isLoading);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const getDefaultRoute = useStore((state) => state.getDefaultRoute);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={getDefaultRoute()} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      const loggedInUser = useStore.getState().user;
      if (loggedInUser?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <VideoBackground>
      <div className="w-full max-w-md p-4">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">Welcome Back</p>
          <h1 className="app-title mt-3 text-center text-4xl">Sign In</h1>
          <p className="app-subtitle mt-3 text-center">
            Continue helping animals with rescue, donations, and lost pet recovery.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-input"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="app-input"
            />

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-[#8a6460] hover:text-[#b83d55]">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={isLoading} className="app-btn app-btn-primary w-full">
              {isLoading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b5752]">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-[#b83d55] hover:text-[#a8364d]">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </VideoBackground>
  );
};

export default Login;
