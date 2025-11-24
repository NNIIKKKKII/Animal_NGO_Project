// animal-ngo-frontend/src/components/RescueMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Need this to fix icon issue

// Fix for default Leaflet marker icon not showing in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const RescueMap = ({ cases, center }) => {
  // Default center (e.g., Los Angeles) if no prop provided
  const mapCenter = center || [34.0522, -118.2437];

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
        zIndex: 0,
      }}
    >
      {/* The Map Tiles (Skin) - Using OpenStreetMap (Free) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Loop through cases and create markers */}
      {cases.map((rescue) => (
        <Marker key={rescue.id} position={[rescue.latitude, rescue.longitude]}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">{rescue.title}</h3>
              <p className="text-sm text-gray-600">{rescue.description}</p>
              <span
                className={`text-xs uppercase font-bold px-2 py-1 rounded ${
                  rescue.status === "resolved"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {rescue.status}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RescueMap;
