import React, { useState } from "react";
import { reportLostPet } from "../api/lostPetService";
import { useNavigate } from "react-router-dom";
import catImage from "../assets/pics/cat.jpg";

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
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url(${catImage})` }}
    >
      {/* Glass Card */}
      <div className="w-full max-w-lg backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Report Lost Pet 🐾
        </h2>

        {error && (
          <div className="mb-4 bg-red-100/80 text-red-700 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Owner Name */}
          <input
            name="owner_name"
            placeholder="Owner Name"
            value={form.owner_name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Phone */}
          <input
            name="owner_phone"
            placeholder="Phone Number"
            value={form.owner_phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Last Seen */}
          <input
            name="last_seen"
            placeholder="Last Seen Location"
            value={form.last_seen}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Pet Description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* File Upload */}
          <label className="flex items-center justify-center cursor-pointer border border-dashed border-gray-400 rounded-lg py-3 bg-white/60 hover:bg-white/80 transition">
            <span className="text-gray-700 font-medium">
              {image ? image.name : "Upload Pet Image"}
            </span>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ReportLostPet;