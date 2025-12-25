import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // Path adjusted based on previous fix
import { Navigate } from 'react-router-dom';
import { getSystemStatistics, getAllUsersForAdmin } from '../api/adminService.js'; 

const AdminDashboard = () => {
    const { user } = useAuth();
    
    // --- State Management ---
    const [stats, setStats] = useState({ 
        totalUsers: 0, 
        pendingRescues: 0, 
        fulfilledDonations: 0, 
        liveVolunteers: 0 
    });
    const [users, setUsers] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState(null);
    const [showUserTable, setShowUserTable] = useState(false);

    // --- Role Protection ---
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // --- Effect 1: Fetch Stats on Mount ---
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getSystemStatistics(); 
                setStats(data);
            } catch (err) {
                console.error("Error loading admin stats:", err);
                setError("Failed to load platform statistics.");
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);
    
    // --- Effect 2: Fetch Users when Table is opened ---
    useEffect(() => {
        // Only fetch if the table is shown and we don't have data yet
        if (showUserTable && users.length === 0) {
            const fetchUsers = async () => {
                setLoadingUsers(true);
                try {
                    const response = await getAllUsersForAdmin(); 
                    setUsers(response.data);
                } catch (err) {
                    setError("Failed to load user list.");
                } finally {
                    setLoadingUsers(false);
                }
            };
            fetchUsers();
        }
    }, [showUserTable, users.length]);

    // --- Helper UI Components ---
    const StatCard = ({ title, value, color }) => (
        <div className={`bg-white p-6 rounded-xl shadow border-l-4 ${color}`}>
            <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );

    const UserTable = () => (
        <div className="mt-6 overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {u.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    if (loadingStats) return <div className="p-10 text-center">Loading Dashboard Data...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
                <p className="text-gray-600">Platform-wide oversight and management</p>
            </header>

            {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Users" value={stats.totalUsers} color="border-blue-500" />
                <StatCard title="Pending Rescues" value={stats.pendingRescues} color="border-yellow-500" />
                <StatCard title="Donations Fulfilled" value={stats.fulfilledDonations} color="border-green-500" />
                <StatCard title="Live Volunteers" value={stats.liveVolunteers} color="border-indigo-500" />
            </div>

            {/* User Management Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">User Accounts</h2>
                    <button 
                        onClick={() => setShowUserTable(!showUserTable)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        {showUserTable ? "Hide List" : "View All Users"}
                    </button>
                </div>
                
                {showUserTable && (
                    loadingUsers ? <p className="text-center py-4">Fetching users...</p> : <UserTable />
                )}
            </section>

            {/* Rescue Oversight Placeholder */}
            <section className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
                <h2 className="text-xl font-bold text-gray-400">Rescue Case Oversight (Day 25)</h2>
                <p className="text-gray-400">Global map view and case management coming next.</p>
            </section>
        </div>
    );
};

export default AdminDashboard;