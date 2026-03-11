import React, { useEffect, useState } from "react";
import axios from "axios";
import LostPetCard from "../components/LostPetCard";
import squirrelImage from "../assets/pics/squirrel.jpg";
import { Link } from "react-router-dom";

const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110 brightness-75"
        style={{ backgroundImage: `url(${squirrelImage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="relative flex items-center justify-center mb-10">

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
            Lost Pets 🐾
          </h2>

          <div className="absolute right-0 hidden md:block">
            <Link
              to="/lost-pets/report"
              className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
            >
              Report Lost Pet
            </Link>
          </div>

        </div>

        <div className="flex justify-center md:hidden mb-6">
          <Link
            to="/lost-pets/report"
            className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
          >
            Report Lost Pet
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.length === 0 ? (
            <div className="text-center text-white text-xl mt-10">
              No lost pets reported yet 🐾
            </div>
          ) : (
            pets.map((pet) => (
              <LostPetCard
                key={pet.id}
                pet={pet}
                onDelete={handleDelete}
                canDelete={true}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default LostPetFeed;