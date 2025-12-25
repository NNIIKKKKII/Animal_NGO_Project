import axios from "axios";

// Base API URL
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance (admin-scoped)
const adminApi = axios.create({
  baseURL: API_URL,
});

// Attach auth token automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ------------------------------------------------------------------
   ADMIN DASHBOARD
------------------------------------------------------------------- */

/**
 * GET /admin/stats
 * Fetch admin dashboard statistics
 */
export const fetchAdminStats = async () => {
  const res = await adminApi.get("/admin/stats");
  return res.data;
};

/**
 * GET /admin/rescues
 * Fetch all rescue cases for admin
 */
export const fetchAdminRescues = async () => {
  const res = await adminApi.get("/admin/rescues");
  return res.data;
};

/**
 * PATCH /admin/rescues/:id/assign
 * Assign volunteer to rescue
 */
export const assignVolunteerToRescue = async (rescueId, volunteerId) => {
  const res = await adminApi.patch(
    `/admin/rescues/${rescueId}/assign`,
    { volunteerId }
  );
  return res.data;
};

/* ------------------------------------------------------------------
   ADMIN USER MANAGEMENT
------------------------------------------------------------------- */

/**
 * GET /admin/users
 * Fetch all users (with pagination & role filter)
 */
export const getAllUsers = async ({
  page = 1,
  limit = 20,
  role,
} = {}) => {
  const params = { page, limit };
  if (role) params.role = role;

  const res = await adminApi.get("/admin/users", { params });
  return res.data;
};

/**
 * PUT /admin/users/:id/role
 * Update user role
 */
export const updateUserRole = async (userId, role) => {
  const res = await adminApi.put(
    `/admin/users/${userId}/role`,
    { role }
  );
  return res.data;
};

/**
 * DELETE /admin/users/:id
 * Delete a user
 */
export const deleteUser = async (userId) => {
  const res = await adminApi.delete(`/admin/users/${userId}`);
  return res.data;
};
