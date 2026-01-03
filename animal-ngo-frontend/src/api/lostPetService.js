import api from "./apiClient";

export const reportLostPet = async (formData) => {
  const res = await api.post("/api/lost-pets/report", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getLostPets = async () => {
  const res = await api.get("/api/lost-pets");
  return res.data.data;
};
