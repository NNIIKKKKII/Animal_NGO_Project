// animal-ngo-frontend/src/components/MapPicker.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon (Keep this from Day 14)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Helper Component 1: Handles Map View Centering ---
const ChangeMapView = ({ center }) => {
    const map = useMap();
    // This hook runs every time the 'center' prop changes
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

// --- Helper Component 2: Handles Pin/Click Events ---
const LocationClickMarker = ({ position, setPosition, onLocationSelect }) => {
    // Listens for map clicks
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            // Update parent form state
            onLocationSelect({ latitude: e.latlng.lat, longitude: e.latlng.lng });
        },
    });

    // Renders the pin
    return position ? <Marker position={position} /> : null;
};


const MapPicker = ({ onLocationSelect }) => {
    const defaultCenter = [34.0522, -118.2437]; // Fallback center
    const [position, setPosition] = useState(null); // The pinned spot (lat/lng object)
    const [mapCenter, setMapCenter] = useState(defaultCenter); // The map's view center (array [lat, lng])

    // --- Geolocation Logic on initial load ---
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userCoords = { 
                        lat: pos.coords.latitude, 
                        lng: pos.coords.longitude 
                    };
                    
                    // 1. Center the map view on the user's location
                    setMapCenter([userCoords.lat, userCoords.lng]); 
                    // 2. Drop the initial pin
                    setPosition(userCoords);
                    // 3. Update the parent form's coordinates
                    onLocationSelect({ 
                        latitude: userCoords.lat, 
                        longitude: userCoords.lng 
                    });
                },
                // Error callback (user denied location or failed)
                () => console.warn("Location denied or error. Using default center.")
            );
        }
    }, [onLocationSelect]);


    return (
        <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
            <MapContainer 
                center={mapCenter} // Use state for initial center
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true} // Enable scroll to zoom
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                
                {/* Component to force map center update */}
                <ChangeMapView center={mapCenter} /> 

                {/* Component to handle click-to-pin logic */}
                <LocationClickMarker 
                    position={position} 
                    setPosition={setPosition} 
                    onLocationSelect={onLocationSelect} 
                />
            </MapContainer>
            
            <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded shadow text-xs font-bold z-[400px] border border-gray-200">
                Click map to adjust pin
            </div>
        </div>
    );
};

export default MapPicker;