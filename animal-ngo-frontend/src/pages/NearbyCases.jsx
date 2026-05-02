import React, { useState, useEffect } from "react";
import { getNearbyCases, assignVolunteerToCase } from "../api/rescueService";
import RescueMap from "../components/RescueMap";

const NearbyCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Location Error:", err);
          setError("Could not access your location. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyCases(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchNearbyCases = async (lat, lng) => {
    try {
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
      alert("Case assigned to you. Thank you for helping.");
      fetchNearbyCases(location.latitude, location.longitude);
    } catch {
      alert("Failed to assign case. It might already be taken.");
    }
  };

  if (loading) return <div className="app-page p-8 text-center text-xl text-[#6b5752]">Locating you and finding animals in need...</div>;
  if (error) return <div className="app-page p-8 text-center text-[#9f2f3c]">{error}</div>;

  return (
    <div className="app-page">
      <div className="app-shell">
        <p className="app-label">Volunteer Discovery</p>
        <h1 className="app-title mt-3 text-5xl">Nearby Rescue Cases</h1>
        <p className="app-subtitle mt-3">Showing cases within 5km of your location.</p>

        {location && cases.length > 0 && (
          <div className="app-card mt-8 overflow-hidden p-2">
            <RescueMap cases={cases} center={[location.latitude, location.longitude]} />
          </div>
        )}

        {cases.length === 0 ? (
          <div className="app-card mt-8 p-10 text-center text-[#6b5752]">
            No pending rescue cases found nearby. Good news.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((rescue) => (
              <div key={rescue.id} className="app-card p-5">
                <div className="mb-4 h-48 overflow-hidden rounded-xl bg-[#f4ecea]">
                  {rescue.image_url ? (
                    <img src={rescue.image_url} alt={rescue.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#987b76]">No image</div>
                  )}
                </div>

                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-[#2d2220]">{rescue.title}</h3>
                  <span className="app-status app-status-pending">{rescue.status}</span>
                </div>

                <p className="text-sm text-[#5c4a48]">{rescue.description}</p>
                <p className="mt-3 text-sm text-[#7d6661]">{(rescue.distance_meters / 1000).toFixed(1)} km away</p>

                <button onClick={() => handleAssign(rescue.id)} className="app-btn app-btn-primary mt-4 w-full">
                  Accept Case
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyCases;
