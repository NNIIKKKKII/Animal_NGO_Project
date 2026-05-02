import React, { useState } from "react";
import useStore from "../stores/store.js";
import { useNavigate, Link, Navigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

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

  return (
    <VideoBackground>
      <div className="w-full max-w-md p-4">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">NGO Access</p>
          <h2 className="app-title mt-3 text-center text-4xl">NGO Login</h2>
          <p className="app-subtitle mt-3 text-center">
            Access your organization dashboard and rescue operations.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input name="email" type="email" placeholder="Email address" onChange={handleChange} required className="app-input" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="app-input" />

            <button type="submit" disabled={loading} className="app-btn app-btn-primary w-full">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 border-t border-[#edd9d7] pt-4 text-center">
            <p className="text-sm text-[#6b5752]">Don&apos;t have an NGO account?</p>
            <Link to="/ngo/register" className="mt-2 inline-block font-semibold text-[#b83d55] hover:text-[#a8364d]">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default LoginNgo;
