import axios from "axios";

const API_URL = "http://localhost:5000/api/donations";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createDonationRequest = async (donationData) => {
  const config = getConfig();
  const response = await axios.post(API_URL, donationData, config);
  return response.data;
};

export const getAllDonationRequests = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const updateDonationRequest = async (donationId, status) => {
  const config = getConfig();
  const response = await axios.patch(
    `${API_URL}/${donationId}`,
    status,
    config
  );
  return response.data;
};

export const deleteDonationById = async (id) => {
  const config = getConfig();
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

export const getDonationById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✅ Razorpay
export const createPaymentOrder = async (amount) => {
  const res = await axios.post(`${API_URL}/create-order`, {
    amount,
  });
  return res.data;
};
