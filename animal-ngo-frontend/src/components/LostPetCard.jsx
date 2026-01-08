import React from "react";

const LostPetCard = ({ pet, onDelete, canDelete = false }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <img
        src={pet.image_url}
        alt={`Photo of lost pet reported by ${pet.owner_name}`}
        className="w-full h-56 object-cover rounded-lg"
      />

      <h3 className="text-xl font-bold mt-3">Owner: {pet.owner_name}</h3>

      <p className="text-gray-600">📍 Last seen: {pet.last_seen}</p>
      <p className="text-gray-600">📞 Contact: {pet.owner_phone}</p>

      {pet.description && (
        <p className="text-gray-700 mt-2">{pet.description}</p>
      )}

      {/* Push actions to bottom */}
      {canDelete && (
        <div className="mt-auto pt-4">
          <button
            onClick={() => onDelete(pet.id)}
            aria-label="Delete lost pet"
            className="mt-3 bg-red-600 text-white px-3 py-2 rounded w-full"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default LostPetCard;
