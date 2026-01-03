import api from "./apiClient";

export const registerNgo = async (data) => {
  const res = await api.post("/api/ngos/register", data);
  return res.data;
};

export const loginNgo = async (data) => {
  const res = await api.post("/api/ngos/login", data);
  return res.data;
};

export const getNgoProfile = async (id) => {
  const res = await api.get(`/api/ngos/${id}`);
  return res.data.ngo;
};
