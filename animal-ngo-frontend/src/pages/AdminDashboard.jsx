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

        // rescuesRes.data is the array from the controller
        setRescues(
          (rescuesRes.data || []).map((r) => ({
            id: r.id,                              // PostgreSQL id, not _id
            type: r.title,
            priority: "—",                               // no priority column in schema
            status: r.status,
            location: `${r.latitude?.toFixed(3)}, ${r.longitude?.toFixed(3)}`,
            volunteer: r.volunteer_name || "Unassigned",
            rawId: r.id,
          }))
        );
      } catch (err) {
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center font-black text-indigo-600 animate-pulse uppercase tracking-widest">
        Initializing Command Center…
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-bold mt-20">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic">HQ Oversight</h1>
          <p className="text-gray-500 text-sm">Live Rescue & Volunteer Operations</p>
        </div>
        <AdminTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "overview" && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Users" value={stats.totalUsers} />
          <StatCard label="Active Rescues" value={stats.pendingRescues} />
          <StatCard label="Donations" value={stats.fulfilledDonations} />
          <StatCard label="Volunteers" value={stats.liveVolunteers} />
        </div>
      )}

      {activeTab === "rescues" && (
        <RescueTable rescueCases={rescues} />
      )}
    </div>
  );
};

export default AdminDashboard;