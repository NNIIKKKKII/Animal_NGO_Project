import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createOrder = async (amount) => {
  const res = await axios.post(
    `${API_URL}/create-order`,
    { amount },
    getConfig()
  );
  return res.data;
};
