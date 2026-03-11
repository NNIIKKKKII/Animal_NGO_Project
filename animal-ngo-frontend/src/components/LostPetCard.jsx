import React from "react";

const LostPetCard = ({ pet, onDelete, canDelete = false }) => {
  return (
    <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl overflow-hidden flex flex-col transition transform hover:-translate-y-1 hover:shadow-2xl">

      {/* Image */}
      <div className="relative">
        <img
          src={pet.image_url}
          alt={`Lost pet reported by ${pet.owner_name}`}
          className="w-full h-56 object-cover"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* owner name on image */}
        <h3 className="absolute bottom-2 left-3 text-white font-semibold text-lg drop-shadow">
          {pet.owner_name}
        </h3>
      </div>

      <div className="p-4 flex flex-col flex-grow">

        <p className="text-sm text-white font-medium">
          📍 Last Seen
        </p>
        <p className=" ml-6 text-white text-sm mb-2">
          {pet.last_seen}
        </p>

        <p className="text-sm text-white font-medium">
          📞 Contact
        </p>
        <p className=" ml-6 text-white font-semibold text-sm">
          {pet.owner_phone}
        </p>

        {pet.description && (
          <p className=" ml-6 text-white text-sm mt-3 line-clamp-3">
            {pet.description}
          </p>
        )}

        {canDelete && (
          <button
            onClick={() => onDelete(pet.id)}
            className="mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete Report
          </button>
        )}

      </div>
    </div>
  );
};

export default LostPetCard;