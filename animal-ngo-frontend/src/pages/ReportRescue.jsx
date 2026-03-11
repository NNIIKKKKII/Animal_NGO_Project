import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRescueCase } from "../api/rescueService";
import MapPicker from "../components/MapPicker";

const ReportRescue = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    latitude: null,
    longitude: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (coords) => {
    setFormData((prev) => ({
      ...prev,
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.latitude || !formData.longitude) {
      setError("Please click on the map to pin the location.");
      setIsLoading(false);
      return;
    }

    try {
      await createRescueCase(formData);
      alert("Rescue case reported successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to report case. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-red-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-3xl backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 flex items-center justify-center gap-2">
            🚨 Report Rescue Case
          </h1>
          <p className="text-gray-700 text-sm mt-2">
            Provide accurate details so volunteers can respond quickly.
          </p>
        </div>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              What is the emergency?
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Injured dog near highway"
              required
              className={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the animal condition..."
              required
              className={inputStyle}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Image URL (optional)
            </label>

            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={inputStyle}
            />
          </div>

          {/* Map */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Pin Rescue Location
            </label>

            <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
              <MapPicker onLocationSelect={handleLocationSelect} />
            </div>

            {formData.latitude && (
              <p className="text-green-700 text-sm mt-2 font-medium">
                📍 Location pinned: {formData.latitude.toFixed(4)},{" "}
                {formData.longitude.toFixed(4)}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 transition disabled:opacity-60"
          >
            {isLoading ? "Submitting..." : "Report Rescue"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ReportRescue;