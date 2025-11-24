// animal-ngo-frontend/src/components/MapPicker.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to handle click events
const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            // When user clicks the map, update the position state
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position ? <Marker position={position} /> : null;
};

const MapPicker = ({ onLocationSelect }) => {
    // Default to a central location (e.g., London or User's Geo)
    // You can use the browser geolocation here like in Day 10 if you want
    const [position, setPosition] = useState(null); 
    const defaultCenter = [34.0522, -118.2437]; // Default LA

    useEffect(() => {
        if (position) {
            // Pass the selected lat/lng back to the parent form
            onLocationSelect({ 
                latitude: position.lat, 
                longitude: position.lng 
            });
        }
    }, [position]);

    return (
        <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
            <MapContainer 
                center={defaultCenter} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
            
            {/* Overlay instruction */}
            <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded shadow text-xs font-bold z-[400]">
                Click map to pin location
            </div>
        </div>
    );
};

export default MapPicker;