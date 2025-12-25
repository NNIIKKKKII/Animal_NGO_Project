import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../api/adminService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data.users || data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await deleteUser(id);
    loadUsers();
  };

  if (loading) return <div className="p-8">Loading users…</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-black mb-6">Admin · Users</h2>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="text-left text-xs uppercase text-gray-400">
            <th className="p-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-4 font-bold">{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u._id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="text-right p-4">
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-red-600 font-bold"
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
