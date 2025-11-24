// animal-ngo-frontend/src/pages/NearbyCases.jsx
import React, { useState, useEffect } from "react";
import { getNearbyCases, assignVolunteerToCase } from "../api/rescueService";
import { useAuth } from "../context/AuthContext";

const NearbyCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // 1. Get User's Location on Mount
    if (navigator.geolocation) {
      //navigator.geolocation is a part of browser's inbuilt thing
      navigator.geolocation.getCurrentPosition(
        // this line asks users to allow to share locatiion
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          //this line works when the users denies the access to location or something fails regaring location
          console.error("Location Error:", err);
          setError(
            "Could not access your location. Please enable location services."
          );
          setLoading(false);
        }
      );
    } else {
      //This line works when the browser has no inbuilt location for location like in gold browsers
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []); // this empty dependcy shows , useeffect runs only once after rednering the page

  // 2. Fetch Cases once location is available
  //this useffect runs everytime the location changes ann everytime the location changes it updates the location.
  useEffect(() => {
    if (location) {
      fetchNearbyCases(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchNearbyCases = async (lat, lng) => {
    try {
      // Default radius 5km (5000 meters)
      const data = await getNearbyCases(lat, lng, 5000);
      setCases(data);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load nearby cases.");
      setLoading(false);
    }
  };

  const handleAssign = async (caseId) => {
    if (!window.confirm("Are you sure you want to take this case?")) return;

    try {
      await assignVolunteerToCase(caseId);
      alert("Case assigned to you! Thank you for helping.");
      // Refresh list to remove the assigned case or update status
      fetchNearbyCases(location.latitude, location.longitude);
    } catch (err) {
      alert("Failed to assign case. It might already be taken.");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-xl">
        📍 Locating you and finding animals in need...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-600 bg-red-100 m-4 rounded">
        {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Nearby Rescue Cases 🚑
      </h1>
      <p className="text-gray-600 mb-8">
        Showing cases within 5km of your location.
      </p>

      {cases.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500">
            No pending rescue cases found nearby. Good news!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((rescue) => (
            <div
              key={rescue.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
            >
              {/* Image Placeholder or Actual Image */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {rescue.image_url ? (
                  <img
                    src={rescue.image_url}
                    alt={rescue.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">🐾</span>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {rescue.title}
                  </h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded uppercase">
                    {rescue.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {rescue.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>
                    📍 {(rescue.distance_meters / 1000).toFixed(1)} km away
                  </span>
                </div>

                <button
                  onClick={() => handleAssign(rescue.id)}
                  className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  Accept Case
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyCases;
