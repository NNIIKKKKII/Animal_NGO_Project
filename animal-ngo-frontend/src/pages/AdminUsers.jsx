// src/pages/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole } from "../api/adminService";
import { useAuth } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(page, 20);
      setUsers(data.data || data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") fetch();
  }, [user, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This action cannot be undone.")) return;
    try {
      await deleteUser(id);
      fetch();
    } catch (err) {
      alert("Failed to delete user.");
      console.error(err);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      fetch();
    } catch (err) {
      alert("Failed to update role.");
      console.error(err);
    }
  };

  if (!user || user.role !== "admin") return <div className="p-8">Unauthorized</div>;
  if (loading) return <div className="p-8">Loading users...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select defaultValue={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}>
                    <option value="donor">donor</option>
                    <option value="volunteer">volunteer</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="text-right">
                  <button className="text-red-500" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
