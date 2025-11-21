// animal-ngo-frontend/src/pages/DonationFeed.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDonationRequests } from '../api/donationService';
import { useAuth } from '../context/AuthContext';

const DonationFeed = () => {
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Get user to check if they can post

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const data = await getAllDonationRequests();
            setDonations(data);
        } catch (err) {
            console.error("Error fetching donations:", err);
            setError("Could not load donation requests.");
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to color-code status
    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800'; // pending
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading donations...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Donation Requests</h1>
                {/* Only show 'Create' button if user is a donor */}
                {user && user.role === 'donor' && (
                    <Link 
                        to="/donations/new" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        + New Request
                    </Link>
                )}
            </div>

            {donations.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No donation requests found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {donations.map((request) => (
                        <div key={request.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(request.status)}`}>
                                    {request.status}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(request.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{request.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{request.description}</p>
                            
                            {/* Future improvement: Add a "Contact" or "Fulfill" button here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationFeed;