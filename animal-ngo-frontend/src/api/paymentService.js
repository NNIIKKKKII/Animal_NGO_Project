import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createOrder = async (amount) => {
  const res = await axios.post(
    `${API_URL}/create-order`,
    { amount },
    getConfig()
  );
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axios.post(`${API_URL}/verify`, data, getConfig());
  return res.data;
};
