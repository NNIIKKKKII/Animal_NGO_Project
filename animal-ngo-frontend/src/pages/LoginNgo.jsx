import React, { useState } from "react";
import { loginNgo } from "../api/ngoService";
import { useNavigate } from "react-router-dom";

const LoginNgo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginNgo(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("ngo", JSON.stringify(data.ngo));
      navigate("/ngo/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">NGO Login</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginNgo;
