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
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
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
    <div className="app-page">
      <div className="app-shell">
        <div className="mx-auto w-full max-w-lg app-card p-8 md:p-10">
          <p className="app-label text-center">Lost & Found</p>
          <h2 className="app-title mt-3 text-center text-4xl">Report Lost Pet</h2>
          <p className="app-subtitle mt-3 text-center">
            Add clear details and image so the network can help reunite faster.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              name="owner_name"
              placeholder="Owner Name"
              value={form.owner_name}
              onChange={handleChange}
              required
              className="app-input"
            />
            <input
              name="owner_phone"
              placeholder="Phone Number"
              value={form.owner_phone}
              onChange={handleChange}
              required
              className="app-input"
            />
            <input
              name="last_seen"
              placeholder="Last Seen Location"
              value={form.last_seen}
              onChange={handleChange}
              required
              className="app-input"
            />
            <textarea
              name="description"
              placeholder="Pet Description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
              className="app-textarea"
            />

            <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#dcb9bf] bg-white/70 py-3 transition hover:bg-white">
              <span className="text-[#5a4946] font-medium">
                {image ? image.name : "Upload Pet Image"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <button disabled={loading} className="app-btn app-btn-primary w-full">
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportLostPet;
