import React, { useEffect, useState } from "react";
import LostPetCard from "../components/LostPetCard";
import { Link } from "react-router-dom";
import useStore from "../stores/store.js";
import { deleteLostPet, getLostPets } from "../api/lostPetService";

const LostPetFeed = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isNgoAuthenticated = useStore((state) => state.isNgoAuthenticated);

  useEffect(() => {
    getLostPets()
      .then(setPets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lost pet report?")) return;

    try {
      await deleteLostPet(id);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete lost pet");
    }
  };

  const canDeletePet = (pet) => {
    if (!isAuthenticated || isNgoAuthenticated || !user) return false;
    return pet.created_by === user.id;
  };

  if (loading) {
    return (
      <div className="app-page flex items-center justify-center text-xl text-[#6b5752]">
        Loading...
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="app-label">Community Network</p>
            <h2 className="app-title mt-3 text-5xl">Lost Pets</h2>
          </div>

          <Link to="/lost-pets/report" className="app-btn app-btn-primary w-fit">
            Report Lost Pet
          </Link>
        </div>

        {pets.length === 0 ? (
          <div className="app-card p-10 text-center text-[#6b5752]">
            No lost pets reported yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pets.map((pet) => (
              <LostPetCard
                key={pet.id}
                pet={pet}
                onDelete={handleDelete}
                canDelete={canDeletePet(pet)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPetFeed;
