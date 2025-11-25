// animal-ngo-frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyProfile, updateMyProfile } from '../api/userService'; 

const Profile = () => {
    const { user, updateUserContext } = useAuth(); // Get user ID from context
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // Fetch user data on mount
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
                address: data.address 
            });
        } catch (err) {
            setError("Failed to fetch profile data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        setError(null);

        try {
            const updatedUser = await updateMyProfile(user.id, formData);
            setProfile(updatedUser);
            // Update the global AuthContext state to reflect new name/details
            updateUserContext(updatedUser); 
            setMessage("Profile updated successfully! 🎉");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save changes.");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-xl text-gray-500">Loading profile...</div>;
    if (error && !profile) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
                
                {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 font-medium">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 font-medium">{error}</div>}

                <div className="mb-6 pb-4 border-b border-gray-200">
                    <p className="text-gray-500 text-sm">Role:</p>
                    <p className="text-xl font-semibold capitalize text-blue-600">{profile.role}</p>
                    <p className="text-gray-500 text-sm mt-2">Email:</p>
                    <p className="text-lg font-medium">{profile.email}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                        <input 
                            type="text" 
                            name="phone_number"
                            value={formData.phone_number || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Address</label>
                        <textarea 
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            rows="3"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 mt-4"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;