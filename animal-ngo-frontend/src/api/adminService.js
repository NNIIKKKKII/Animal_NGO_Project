// // src/api/adminService.js
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/admin";

// const getConfig = () => {
//   const token = localStorage.getItem("token");
//   return { headers: { Authorization: `Bearer ${token}` } };
// };

// export const getAdminStats = async () => {
//   const res = await axios.get(`${API_URL}/stats`, getConfig());
//   return res.data;
// };

// export const getAllUsers = async (page = 1, limit = 20, role) => {
//   const params = { page, limit };
//   if (role) params.role = role;
//   const res = await axios.get(`${API_URL}/users`, { ...getConfig(), params });
//   return res.data;
// };

// export const deleteUser = async (id) => {
//   const res = await axios.delete(`${API_URL}/users/${id}`, getConfig());
//   return res.data;
// };

// export const updateUserRole = async (id, role) => {
//   const res = await axios.put(`${API_URL}/users/${id}/role`, { role }, getConfig());
//   return res.data;
// };

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getSystemStatistics = async () => {
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
};

export const getAllUsersForAdmin = async () => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};
