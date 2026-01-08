import React, { useState } from "react";
import { reportLostPet } from "../api/lostPetService";
import { useNavigate } from "react-router-dom";

const ReportLostPet = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    owner_name: "",
    owner_phone: "",
    last_seen: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!image) {
      setError("Image is required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("image", image);

    try {
      await reportLostPet(formData);
      navigate("/lost-pets");
    } catch (err) {
      console.error(err);
      setError("Failed to report lost pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Report Lost Pet 🐾</h2>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="owner_name"
          placeholder="Owner Name"
          value={form.owner_name}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          name="owner_phone"
          placeholder="Phone Number"
          value={form.owner_phone}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          name="last_seen"
          placeholder="Last Seen Location"
          value={form.last_seen}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <textarea
          name="description"
          placeholder="Pet description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReportLostPet;
