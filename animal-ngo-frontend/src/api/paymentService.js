import api from "./apiClient";

export const createOrder = async (amount) => {
  const res = await api.post("/api/payments/create-order", { amount });
  return res.data;
};
