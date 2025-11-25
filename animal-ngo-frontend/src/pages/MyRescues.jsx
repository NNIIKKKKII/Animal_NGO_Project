// animal-ngo-frontend/src/pages/MyRescues.jsx
import React, { useState, useEffect } from 'react';
import { getMyReportedRescues } from '../api/rescueService';
import { Link } from 'react-router-dom';

const MyRescues = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const data = await getMyReportedRescues();
                setCases(data);
            } catch (err) {
                console.error("Error fetching my reports:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    const getStatusBadge = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            assigned: "bg-blue-100 text-blue-800",
            resolved: "bg-green-100 text-green-800"
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${colors[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    if (loading) return <div className="p-8 text-center text-xl">Loading your reports...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Reported Cases 📢</h1>
                <Link to="/rescue/report" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    + Report New
                </Link>
            </div>

            {cases.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl shadow border border-gray-100">
                    <p className="text-gray-500 text-lg mb-4">You haven't reported any cases yet.</p>
                    <p>Thank you for being ready to help!</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {cases.map((rescue) => (
                        <div key={rescue.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-gray-800">{rescue.title}</h3>
                                {getStatusBadge(rescue.status)}
                            </div>
                            
                            <p className="text-gray-600 mb-4 grow">{rescue.description}</p>
                            
                            <div className="text-sm text-gray-400 mt-2 pt-3 border-t">
                                Reported on: {new Date(rescue.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRescues;