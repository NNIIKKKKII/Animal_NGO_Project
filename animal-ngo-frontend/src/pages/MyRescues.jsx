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
      pending: "app-status app-status-pending",
      assigned: "app-status app-status-danger",
      resolved: "app-status app-status-success",
    };
    return <span className={styles[status] || "app-status"}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="app-page flex items-center justify-center text-xl text-[#6b5752]">
        Loading your reports...
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-label">Donor Tracking</p>
            <h1 className="app-title mt-3 text-5xl">My Reported Cases</h1>
          </div>

          <Link to="/rescue/report" className="app-btn app-btn-primary w-fit">
            Report New
          </Link>
        </div>

        {cases.length === 0 ? (
          <div className="app-card p-10 text-center">
            <p className="text-lg text-[#473733]">You haven&apos;t reported any rescue cases yet.</p>
            <p className="mt-2 text-[#6b5752]">Help animals by reporting rescue situations when you find them.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((rescue) => (
              <div key={rescue.id} className="app-card p-6">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-[#2d2220]">{rescue.title}</h3>
                  {getStatusBadge(rescue.status)}
                </div>

                <p className="text-sm text-[#5c4a48]">{rescue.description}</p>
                <div className="mt-4 border-t border-[#efddda] pt-3 text-sm text-[#7d6661]">
                  Reported on: {new Date(rescue.created_at).toLocaleDateString()}
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
