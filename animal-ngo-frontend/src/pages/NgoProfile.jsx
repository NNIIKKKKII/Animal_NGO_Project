import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNgoProfile } from "../api/ngoService";

const NgoProfile = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    getNgoProfile(id).then(setNgo);
  }, [id]);

  if (!ngo) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold">{ngo.name}</h1>
      <p className="mt-4 text-gray-700">{ngo.description}</p>

      <div className="mt-6 space-y-2">
        <p><strong>Email:</strong> {ngo.email}</p>
        <p><strong>Phone:</strong> {ngo.phone_number}</p>
        <p><strong>Address:</strong> {ngo.address}</p>
      </div>
    </div>
  );
};

export default NgoProfile;
