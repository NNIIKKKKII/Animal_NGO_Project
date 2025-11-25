// src/api/adminService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAdminStats = async () => {
  const res = await axios.get(`${API_URL}/stats`, getConfig());
  return res.data;
};

export const getAllUsers = async (page = 1, limit = 20, role) => {
  const params = { page, limit };
  if (role) params.role = role;
  const res = await axios.get(`${API_URL}/users`, { ...getConfig(), params });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/users/${id}`, getConfig());
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await axios.put(`${API_URL}/users/${id}/role`, { role }, getConfig());
  return res.data;
};
