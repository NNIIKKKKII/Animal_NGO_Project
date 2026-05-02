import React, { useState, useEffect } from "react";
import useStore from "../stores/store.js";
import { getMyProfile, updateMyProfile } from "../api/userService";

const Profile = () => {
  const user = useStore((state) => state.user);
  const updateUserContext = useStore((state) => state.updateUserContext);

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetchProfile(user.id);
    }
  }, [user]);

  const fetchProfile = async (userId) => {
    try {
      const data = await getMyProfile(userId);
      setProfile(data);
      setFormData({
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
      });
    } catch {
      setError("Failed to fetch profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError(null);

    try {
      const updatedUser = await updateMyProfile(user.id, formData);
      setProfile(updatedUser);
      updateUserContext(updatedUser);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-page flex items-center justify-center text-xl text-[#6b5752]">
        Loading profile...
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="app-page flex items-center justify-center text-[#9f2f3c]">
        {error}
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mx-auto w-full max-w-2xl app-card p-8 md:p-10">
          <p className="app-label text-center">Profile Center</p>
          <h1 className="app-title mt-3 text-center text-4xl">My Profile</h1>

          {message && <div className="app-alert app-alert-success mt-6">{message}</div>}
          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <div className="mt-6 rounded-xl border border-[#edd9d7] bg-white/80 p-4">
            <div className="mb-3 flex justify-between">
              <span className="text-sm text-[#6b5752]">Role</span>
              <span className="font-semibold capitalize text-[#b83d55]">{profile.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#6b5752]">Email</span>
              <span className="font-medium text-[#3f312e]">{profile.email}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Full Name</label>
              <input type="text" name="name" value={formData.name || ""} onChange={handleChange} required className="app-input" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Phone Number</label>
              <input type="text" name="phone_number" value={formData.phone_number || ""} onChange={handleChange} required className="app-input" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-[#4f3f3b]">Address</label>
              <textarea name="address" value={formData.address || ""} onChange={handleChange} rows="3" required className="app-textarea" />
            </div>

            <button type="submit" disabled={isSaving} className="app-btn app-btn-primary w-full">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
