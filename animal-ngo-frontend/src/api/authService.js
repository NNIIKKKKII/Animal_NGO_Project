import api from "./apiClient";

export const register = async (userData) => {
  const res = await api.post("/api/users/register", userData);
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post("/api/users/login", { email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const forgotPassword = async (email) => {
  const res = await api.post("/api/users/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token, newPassword) => {
  const res = await api.post("/api/users/reset-password", { token, newPassword });
  return res.data;
};
