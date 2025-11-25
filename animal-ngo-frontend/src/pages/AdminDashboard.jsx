// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAdminStats } from "../api/adminService";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === "admin") fetch();
  }, [user]);

  if (!user || user.role !== "admin") {
    return <div className="p-8">Unauthorized</div>;
  }

  if (loading) return <div className="p-8">Loading admin dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Pending Rescues</p>
          <p className="text-2xl font-bold">{stats.pendingRescues}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Fulfilled Donations</p>
          <p className="text-2xl font-bold">{stats.fulfilledDonations}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Live Volunteers</p>
          <p className="text-2xl font-bold">{stats.liveVolunteers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
