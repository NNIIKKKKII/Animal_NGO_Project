import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDonationRequests } from "../api/donationService";
import useStore from "../stores/store.js";
import PayButton from "../components/PayButton";

const DonationFeed = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useStore((state) => state.user);

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

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "app-status app-status-success";
      case "cancelled":
        return "app-status app-status-danger";
      default:
        return "app-status app-status-pending";
    }
  };

  if (isLoading) {
    return <div className="app-page flex items-center justify-center text-xl text-[#6b5752]">Loading donations...</div>;
  }

  if (error) {
    return <div className="app-page flex items-center justify-center text-[#9f2f3c]">{error}</div>;
  }

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-label">Support Feed</p>
            <h1 className="app-title mt-3 text-5xl">Donation Requests</h1>
          </div>

          {user && user.role === "donor" && (
            <Link to="/donations/new" className="app-btn app-btn-primary w-fit">
              New Request
            </Link>
          )}
        </div>

        {donations.length === 0 ? (
          <div className="app-card p-8 text-center text-[#6b5752]">
            No donation requests found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {donations.map((request) => (
              <div key={request.id} className="app-card p-6 transition duration-300 hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <span className={getStatusClass(request.status)}>{request.status}</span>
                  <span className="text-xs text-[#8f7670]">
                    {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[#2d2220]">{request.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5c4a48]">{request.description}</p>

                {request.amount && (
                  <p className="mt-4 font-semibold text-[#41312e]">
                    Amount Needed: Rs. {request.amount}
                  </p>
                )}

                {request.status === "pending" && request.amount && (
                  <div className="mt-5">
                    <PayButton amount={request.amount} />
                  </div>
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
