import React from "react";

const LostPetCard = ({ pet, onDelete, canDelete = false }) => {
  return (
    <div className="app-card overflow-hidden transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={pet.image_url}
          alt={`Lost pet reported by ${pet.owner_name}`}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <h3 className="absolute bottom-2 left-3 text-lg font-semibold text-white drop-shadow">
          {pet.owner_name}
        </h3>
      </div>

      <div className="space-y-2 p-5">
        <p className="app-label">Last Seen</p>
        <p className="text-sm text-[#4e3f3b]">{pet.last_seen}</p>

        <p className="app-label pt-2">Contact</p>
        <p className="text-sm font-semibold text-[#3f312e]">{pet.owner_phone}</p>

        {pet.description && (
          <p className="pt-2 text-sm leading-6 text-[#5c4a48] line-clamp-3">
            {pet.description}
          </p>
        )}

        {canDelete && (
          <button
            onClick={() => onDelete(pet.id)}
            className="app-btn app-btn-danger mt-3 w-full"
          >
            Delete Report
          </button>
        )}
      </div>
    </div>
  );
};

export default LostPetCard;
