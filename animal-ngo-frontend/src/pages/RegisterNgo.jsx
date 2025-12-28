import React, { useState } from "react";
import { registerNgo } from "../api/ngoService";
import { useNavigate } from "react-router-dom";

const RegisterNgo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerNgo(form);
      alert("NGO registered! Await admin verification.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">NGO Registration</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="NGO Name" onChange={handleChange} required className="input" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="input" />
        <input name="phone_number" placeholder="Phone" onChange={handleChange} className="input" />
        <input name="registration_number" placeholder="Registration Number" onChange={handleChange} className="input" />
        <textarea name="description" placeholder="About NGO" onChange={handleChange} className="input" />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register NGO
        </button>
      </form>
    </div>
  );
};

export default RegisterNgo;
