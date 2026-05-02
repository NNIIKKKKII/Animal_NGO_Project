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
      setUsers(data.data);
    } catch {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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

  if (loading) return <div className="app-page p-8 font-semibold text-[#6b5752]">Loading users...</div>;
  if (error) return <div className="app-page p-8 font-semibold text-[#9f2f3c]">{error}</div>;

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mb-6">
          <p className="app-label">Admin Control</p>
          <h2 className="app-title mt-3 text-4xl">User Management</h2>
        </div>

        <div className="app-card-strong p-2 md:p-4">
          <div className="app-table-wrap">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="font-semibold">{u.name}</td>
                    <td className="text-sm">{u.email}</td>
                    <td className="text-sm">{u.phone}</td>
                    <td>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="app-select max-w-[130px]"
                      >
                        <option value="donor">Donor</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-sm font-semibold text-[#b94149] hover:text-[#9f2f3c]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
