import React, { useState, useEffect } from "react";
import { getMyReportedRescues } from "../api/rescueService";
import { Link } from "react-router-dom";

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
        const styles = {
            pending: "bg-yellow-200 text-yellow-800",
            assigned: "bg-blue-200 text-blue-800",
            resolved: "bg-green-200 text-green-800",
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${styles[status] || "bg-gray-200 text-gray-700"
                    }`}
            >
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white text-xl">
                Loading your reports...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-4 py-12">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        My Reported Cases 📢
                    </h1>

                    <Link
                        to="/rescue/report"
                        className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition w-fit"
                    >
                        + Report New
                    </Link>

                </div>

                {cases.length === 0 ? (

                    <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-10 text-center">

                        <p className="text-gray-800 text-lg mb-3">
                            You haven't reported any rescue cases yet.
                        </p>

                        <p className="text-gray-600">
                            Help animals by reporting rescue situations when you find them.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {cases.map((rescue) => (
                            <div
                                key={rescue.id}
                                className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-6 flex flex-col transition hover:scale-105"
                            >

                                <div className="flex justify-between items-start mb-3">

                                    <h3 className="text-lg font-bold text-gray-900">
                                        {rescue.title}
                                    </h3>

                                    {getStatusBadge(rescue.status)}

                                </div>

                                <p className="text-gray-800 text-sm mb-4 flex-grow">
                                    {rescue.description}
                                </p>

                                <div className="text-sm text-gray-600 pt-3 border-t border-white/40">
                                    Reported on:{" "}
                                    {new Date(rescue.created_at).toLocaleDateString()}
                                </div>

                            </div>
                        ))}

                    </div>

                )}

            </div>
        </div>
    );
};

export default MyRescues;