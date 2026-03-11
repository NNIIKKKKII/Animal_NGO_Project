import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDonationRequests } from "../api/donationService";
import { useAuth } from "../context/AuthContext";
import PayButton from "../components/PayButton";

const DonationFeed = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading donations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-4 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Donation Requests
          </h1>

          {user && user.role === "donor" && (
            <Link
              to="/donations/new"
              className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition w-fit"
            >
              + New Request
            </Link>
          )}

        </div>

        {donations.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No donation requests found.
          </p>
        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {donations.map((request) => (
              <div
                key={request.id}
                className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-6 transition hover:scale-105"
              >

                {/* Status + Date */}
                <div className="flex justify-between items-center mb-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(request.created_at).toLocaleDateString()}
                  </span>

                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {request.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4">
                  {request.description}
                </p>

                {/* Amount */}
                {request.amount && (
                  <p className="font-semibold text-gray-800 mb-4">
                    Amount Needed: ₹{request.amount}
                  </p>
                )}

                {/* Donate Button */}
                {request.status === "pending" && request.amount && (
                  <PayButton amount={request.amount} />
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default DonationFeed;