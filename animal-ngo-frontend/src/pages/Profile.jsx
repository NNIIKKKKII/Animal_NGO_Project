import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
import useStore from "../stores/store.js"

import { getMyProfile, updateMyProfile } from "../api/userService";

const Profile = () => {
    // const { user, updateUserContext } = useAuth();
    const user = useStore((state) => state.user);
    const updateUserContext = useStore((state) => state.updateUserContext)

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
        } catch (err) {
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
            setMessage("Profile updated successfully 🎉");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
                Loading profile...
            </div>
        );

    if (error && !profile)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );

    const inputStyle =
        "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400";

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">

            <div className="w-full max-w-xl backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    My Profile
                </h1>

                {message && (
                    <div className="bg-green-100/80 text-green-700 p-3 rounded-lg mb-4 text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100/80 text-red-700 p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Profile Info */}
                <div className="mb-6 pb-4 border-b border-white/40">

                    <div className="flex justify-between mb-3">
                        <span className="text-gray-600 text-sm">Role</span>
                        <span className="font-semibold capitalize text-blue-600">
                            {profile.role}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Email</span>
                        <span className="font-medium text-gray-800">
                            {profile.email}
                        </span>
                    </div>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required
                            className={inputStyle}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number || ""}
                            onChange={handleChange}
                            required
                            className={inputStyle}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            rows="3"
                            required
                            className={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Profile;