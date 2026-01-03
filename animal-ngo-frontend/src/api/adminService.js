import api from "./apiClient";

export const fetchAdminStats = async () => {
  const res = await api.get("/api/admin/stats");
  return res.data;
};

export const fetchAdminRescues = async () => {
  const res = await api.get("/api/admin/rescues");
  return res.data;
};

export const assignVolunteerToRescue = async (rescueId, volunteerId) => {
  const res = await api.patch(
    `/api/admin/rescues/${rescueId}/assign`,
    { volunteerId }
  );
  return res.data;
};

export const getAllUsers = async (params = {}) => {
  const res = await api.get("/api/admin/users", { params });
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await api.put(`/api/admin/users/${id}/role`, { role });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/api/admin/users/${id}`);
  return res.data;
};
