import React, { useState } from "react";
import axios from "axios";

const ReportLostPet = () => {
  const [form, setForm] = useState({
    owner_name: "",
    owner_phone: "",
    last_seen: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:5000/api/lost-pets/report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Lost pet reported successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to report lost pet");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Report Lost Pet 🐾
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="owner_name"
          placeholder="Owner Name"
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          name="owner_phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          name="last_seen"
          placeholder="Last Seen Location"
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <textarea
          name="description"
          placeholder="Pet description"
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

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportLostPet;
