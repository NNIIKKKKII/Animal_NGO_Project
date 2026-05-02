import React, { useState } from "react";
import { registerNgo } from "../api/ngoService";
import { useNavigate, Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const RegisterNgo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerNgo(form);
      alert("NGO registered! Await admin verification.");
      navigate("/ngo/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoBackground>
      <div className="w-full max-w-xl p-4">
        <div className="app-card p-8 md:p-10">
          <p className="app-label text-center">NGO Onboarding</p>
          <h2 className="app-title mt-3 text-center text-4xl">NGO Registration</h2>
          <p className="app-subtitle mt-3 text-center">
            Join the rescue platform as an organization partner.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">NGO Name</label>
              <input name="name" type="text" placeholder="Global Help Foundation" onChange={handleChange} required className="app-input" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Email</label>
                <input name="email" type="email" placeholder="contact@ngo.org" onChange={handleChange} required className="app-input" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Phone</label>
                <input name="phone_number" type="text" placeholder="+91..." onChange={handleChange} className="app-input" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Password</label>
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="app-input" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">About the NGO</label>
              <textarea name="description" rows="3" placeholder="Briefly describe your mission..." onChange={handleChange} className="app-textarea" />
            </div>

            <button type="submit" disabled={loading} className="app-btn app-btn-primary w-full">
              {loading ? "Registering..." : "Register NGO"}
            </button>
          </form>

          <div className="mt-8 border-t border-[#edd9d7] pt-5 text-center">
            <p className="text-sm text-[#6b5752]">Already have an account?</p>
            <Link to="/ngo/login" className="mt-2 inline-block font-semibold text-[#b83d55] hover:text-[#a8364d]">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default RegisterNgo;
