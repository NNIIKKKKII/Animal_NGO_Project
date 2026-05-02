import React, { useEffect, useState } from "react";
import StatCard from "../components/admin/StatCard";
import RescueTable from "../components/admin/RescueTable";
import AdminTabs from "../components/admin/AdminTabs";
import { fetchAdminStats, fetchAdminRescues } from "../api/adminService";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, rescuesRes] = await Promise.all([
          fetchAdminStats(),
          fetchAdminRescues(),
        ]);

        setStats(statsRes);
        setRescues(
          (rescuesRes.data || []).map((r) => ({
            id: r.id,
            type: r.title,
            priority: "-",
            status: r.status,
            location: `${r.latitude?.toFixed(3)}, ${r.longitude?.toFixed(3)}`,
            volunteer: r.volunteer_name || "Unassigned",
            rawId: r.id,
          }))
        );
      } catch {
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="app-page flex items-center justify-center text-xl text-[#6b5752]">
        Initializing command center...
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-page flex items-center justify-center text-[#9f2f3c]">
        {error}
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-shell space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-label">Admin Command Center</p>
            <h1 className="app-title mt-3 text-5xl">HQ Oversight</h1>
            <p className="app-subtitle mt-3">
              Live rescue operations, volunteer allocation, and platform health.
            </p>
          </div>
          <AdminTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === "overview" && stats && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Users" value={stats.totalUsers} />
            <StatCard label="Active Rescues" value={stats.pendingRescues} />
            <StatCard label="Donations" value={stats.fulfilledDonations} />
            <StatCard label="Volunteers" value={stats.liveVolunteers} />
          </div>
        )}

        {activeTab === "rescues" && <RescueTable rescueCases={rescues} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
