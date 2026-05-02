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
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to report case. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mx-auto w-full max-w-3xl app-card p-8 md:p-10">
          <p className="app-label text-center">Emergency Intake</p>
          <h1 className="app-title mt-3 text-center text-5xl">Report Rescue Case</h1>
          <p className="app-subtitle mt-3 text-center">
            Provide accurate details so volunteers can respond quickly.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">What is the emergency?</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Injured dog near highway" required className="app-input" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Describe the animal condition..." required className="app-textarea" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Image URL (optional)</label>
              <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://example.com/image.jpg" className="app-input" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4f3f3b]">Pin Rescue Location</label>
              <div className="overflow-hidden rounded-xl border border-[#e7cfcc] bg-white">
                <MapPicker onLocationSelect={handleLocationSelect} />
              </div>

              {formData.latitude && (
                <p className="mt-2 text-sm font-medium text-[#2e724f]">
                  Location pinned: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                </p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="app-btn app-btn-primary w-full py-4 text-base">
              {isLoading ? "Submitting..." : "Report Rescue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportRescue;
