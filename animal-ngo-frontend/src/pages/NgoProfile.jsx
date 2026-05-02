import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNgoProfile } from "../api/ngoService";

const NgoProfile = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    getNgoProfile(id).then(setNgo);
  }, [id]);

  if (!ngo) return <p className="app-page">Loading...</p>;

  return (
    <div className="app-page">
      <div className="app-shell max-w-3xl">
        <div className="app-card p-8 md:p-10">
          <p className="app-label">NGO Public Profile</p>
          <h1 className="app-title mt-3 text-5xl">{ngo.name}</h1>
          <p className="mt-5 text-[#5c4a48] leading-8">{ngo.description}</p>

          <div className="mt-8 space-y-3 text-[#3e312e]">
            <p><strong>Email:</strong> {ngo.email}</p>
            <p><strong>Phone:</strong> {ngo.phone_number}</p>
            <p><strong>Address:</strong> {ngo.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoProfile;
