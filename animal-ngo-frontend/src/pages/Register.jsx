// animal-ngo-frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
//ZUSTAND
// import { useAuth } from "../stores/useAuthStore";
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        address: '',
        role: 'donor', // Default role
        // For simplicity, hardcode location for now. We will integrate a map picker later (Day 13).
        latitude: 34.0522, // Example: Los Angeles latitude
        longitude: -118.2437 // Example: Los Angeles longitude
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(formData);
            // Context handles successful navigation
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="flex items-center justify-center p-6 min-h-screen-minus-header">
            <div className="w-full max-w-lg bg-white p-8 shadow-2xl rounded-xl">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Register for an Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="bg-red-100 text-red-600 p-3 rounded-md text-sm text-center">
                            {error}
                        </p>
                    )}

                    {/* Name */}
                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />

                    {/* Email */}
                    <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />

                    {/* Password */}
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />

                    {/* Phone Number */}
                    <input type="tel" name="phone_number" placeholder="Phone Number" required onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />

                    {/* Address */}
                    <input type="text" name="address" placeholder="Physical Address" required onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />

                    {/* Role Selector */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm mb-1 font-medium">I want to register as a:</label>
                        <select name="role" onChange={handleChange} value={formData.role}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150"
                        >
                            <option value="donor">Donor (To report cases or donate)</option>
                            <option value="volunteer">Volunteer (To rescue animals)</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={isLoading}
                        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">...</svg>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;