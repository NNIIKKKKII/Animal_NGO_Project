import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../api/adminService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      setUsers(data.data); // controller returns { count, data, page, limit }
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  if (loading) return <div className="p-8 font-bold">Loading users…</div>;
  if (error) return <div className="p-8 text-red-600 font-bold">{error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-black mb-6 uppercase">Admin · Users</h2>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="text-left text-xs uppercase text-gray-400 bg-gray-50">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Role</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-bold">{u.name}</td>
              <td className="p-4 text-sm text-gray-600">{u.email}</td>
              <td className="p-4 text-sm text-gray-500">{u.phone}</td>
              <td className="p-4">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-600 font-bold text-sm hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;