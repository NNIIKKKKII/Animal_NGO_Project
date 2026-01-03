import api from "./apiClient";

export const createDonationRequest = async (data) => {
  const res = await api.post("/api/donations", data);
  return res.data;
};

export const getAllDonationRequests = async () => {
  const res = await api.get("/api/donations");
  return res.data.data;
};

export const updateDonationRequest = async (id, status) => {
  const res = await api.patch(`/api/donations/${id}`, { status });
  return res.data;
};

export const deleteDonationById = async (id) => {
  const res = await api.delete(`/api/donations/${id}`);
  return res.data;
};

export const getDonationById = async (id) => {
  const res = await api.get(`/api/donations/${id}`);
  return res.data;
};
