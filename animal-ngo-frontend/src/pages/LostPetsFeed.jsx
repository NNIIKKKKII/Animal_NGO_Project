import React, { useEffect, useState } from "react";
import axios from "axios";
import LostPetCard from "../components/LostPetCard";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const LostPetFeed = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/lost-pets`)
      .then((res) => setPets(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lost pet report?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/lost-pets/${id}`);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete lost pet");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Lost Pets 🐾</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <LostPetCard
            key={pet.id}
            pet={pet}
            onDelete={handleDelete}
            canDelete={true} // later: restrict by owner/admin
          />
        ))}
      </div>
    </div>
  );
};

export default LostPetFeed;
