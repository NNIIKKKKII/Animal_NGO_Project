import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const LostPetFeed = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lost-pets")
      .then((res) => setPets(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Lost Pets 🐾</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={`${BACKEND_URL}${pet.image_url}`}
              alt="Lost Pet"
              className="w-full h-56 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3">Owner: {pet.owner_name}</h3>

            <p className="text-gray-600">📍 Last seen: {pet.last_seen}</p>

            <p className="text-gray-600">📞 Contact: {pet.owner_phone}</p>

            {pet.description && (
              <p className="text-gray-700 mt-2">{pet.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostPetFeed;
