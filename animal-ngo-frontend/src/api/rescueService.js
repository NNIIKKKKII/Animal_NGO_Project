import api from "./apiClient";

/**
 * CREATE a rescue case
 * POST /api/rescue
 */
export const createRescueCase = async (data) => {
  const res = await api.post("/api/rescue", data);
  return res.data;
};

/**
 * GET nearby rescue cases
 * POST /api/rescue/nearby
 */
export const getNearbyCases = async (latitude, longitude, radius = 5000) => {
  const res = await api.post("/api/rescue/nearby", {
    latitude,
    longitude,
    radius,
  });
  return res.data.data;
};

/**
 * ASSIGN volunteer to case
 * PUT /api/rescue/:id/assign
 */
export const assignVolunteerToCase = async (id) => {
  const res = await api.put(`/api/rescue/${id}/assign`);
  return res.data;
};

/**
 * UPDATE rescue status
 * PUT /api/rescue/:id/status
 */
export const updateCaseStatus = async (id, status) => {
  const res = await api.put(`/api/rescue/${id}/status`, { status });
  return res.data;
};

/**
 * GET rescues reported by logged-in user
 * GET /api/rescue/my-reports
 */
export const getMyReportedRescues = async () => {
  const res = await api.get("/api/rescue/my-reports");
  return res.data.data;
};

/**
 * GET rescues assigned to logged-in volunteer
 * GET /api/rescue/my-assigned
 */
export const getMyAssignedRescues = async () => {
  const res = await api.get("/api/rescue/my-assigned");
  return res.data.data;
};

/**
 * ⚠️ LEGACY SUPPORT (DO NOT USE IN NEW CODE)
 * Alias used by VolunteerDashboard.jsx
 */
export const getMyCases = async () => {
  return getMyAssignedRescues();
};
