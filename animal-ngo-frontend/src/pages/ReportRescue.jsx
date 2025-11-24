// animal-ngo-frontend/src/pages/ReportRescue.jsx
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

  // Update text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update location from MapPicker
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

    // Validation
    if (!formData.latitude || !formData.longitude) {
      setError("Please click on the map to pin the location.");
      setIsLoading(false);
      return;
    }

    try {
      await createRescueCase(formData);
      alert(
        "Rescue case reported successfully! A volunteer will check it soon."
      );
      navigate("/"); // Redirect to Dashboard
    } catch (err) {
      console.error("Report Error:", err);
      setError("Failed to report case. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 flex items-center">
          🚨 Report a Rescue Case
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              What is the emergency?
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Injured Dog on Highway"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the animal, injury, and exact situation..."
              rows="3"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Map Picker */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Location <span className="text-red-500">*</span> (Click on map)
            </label>
            <MapPicker onLocationSelect={handleLocationSelect} />
            {formData.latitude && (
              <p className="text-sm text-green-600 mt-1 font-medium">
                ✅ Location pinned: {formData.latitude.toFixed(4)},{" "}
                {formData.longitude.toFixed(4)}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition shadow-md disabled:bg-red-400"
          >
            {isLoading ? "Submitting Report..." : "REPORT CASE NOW"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportRescue;
