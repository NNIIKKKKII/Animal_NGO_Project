import React, { useState } from "react";
import { registerNgo } from "../api/ngoService";
import { useNavigate, Link } from "react-router-dom";

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
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">

      {/* Glass Card */}
      <div className="w-full max-w-lg backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            NGO Registration
          </h2>
          <p className="text-gray-700 mt-2 text-sm">
            Join our platform to help animals in need 🐾
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NGO Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              NGO Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Global Help Foundation"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="contact@ngo.org"
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Phone
              </label>
              <input
                name="phone_number"
                type="text"
                placeholder="+91..."
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              About the NGO
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Briefly describe your mission..."
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register NGO"}
          </button>

        </form>

        {/* Login Redirect */}
        <div className="mt-8 text-center border-t pt-5">

          <p className="text-sm text-gray-700">
            Already have an account?
          </p>

          <Link
            to="/ngo/login"
            className="inline-block mt-2 font-semibold text-green-700 hover:text-green-600"
          >
            Login Here
          </Link>

        </div>

      </div>
    </div>
  );
};

export default RegisterNgo;