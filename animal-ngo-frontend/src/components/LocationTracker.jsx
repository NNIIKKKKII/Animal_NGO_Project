import React, { useState, useEffect, useRef } from "react";
import { updateMyLocation } from "../api/userService.js"; // Corrected path
import { useAuth } from "../context/AuthContext.jsx"; // Corrected path

// Custom SVG Icons (to replace react-icons/fa and ensure self-contained file)
const SvgMapPin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    className={props.className}
  >
    <path d="M215.7 499.2C267.4 430.4 384 279 384 192C384 86 298 0 192 0S0 86 0 192c0 87 116.6 238.4 168.3 307.2c12.3 16.7 35.8 16.7 48.2 0zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
  </svg>
);
const SvgStop = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={props.className}
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM192 192c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V192z" />
  </svg>
);
const SvgSpinner = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`${props.className} animate-spin`}
  >
    <path d="M304 48c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm-48 96c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48s48-21.5 48-48V192c0-26.5-21.5-48-48-48zm48 160c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm-48 96c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48s48-21.5 48-48V400c0-26.5-21.5-48-48-48z" />
  </svg>
);

const LocationTracker = () => {
  const { user } = useAuth();
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState("");
  const [lastUpdate, setLastUpdate] = useState(null);
  const watchIdRef = useRef(null);

  // Function to send location to the server
  const sendLocationUpdate = async (position) => {
    if (user && user.role === "volunteer") {
      const { latitude, longitude } = position.coords;
      try {
        await updateMyLocation(latitude, longitude);
        setStatus(
          `Tracking... Last updated: ${latitude.toFixed(
            4
          )}, ${longitude.toFixed(4)}`
        );
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Failed to update location to backend:", error);
        // Don't stop tracking, just log error
      }
    }
  };

  // Callback for successful geolocation
  const successCallback = (position) => {
    sendLocationUpdate(position);
  };

  // Callback for geolocation errors
  const errorCallback = (error) => {
    console.error("Geolocation Error:", error);
    setStatus(`Error: ${error.message}. Tracking stopped.`);
    stopTracking();
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("Starting location tracking...");
    setIsTracking(true);

    // Start watching position with high accuracy and specified options
    watchIdRef.current = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setStatus("Tracking stopped.");
    setLastUpdate(null);
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Only show the tracker to volunteers
  if (!user || user.role !== "volunteer") {
    return null;
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-inner mt-4">
      <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
        <SvgMapPin className="w-5 h-5 mr-2 text-blue-500 fill-current" />
        Volunteer Live Location Service
      </h4>

      {isTracking ? (
        <>
          <p className="text-sm text-gray-600 mb-3">{status}</p>
          <button
            onClick={stopTracking}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 flex items-center justify-center font-semibold"
          >
            <SvgStop className="w-4 h-4 mr-2" /> Stop Live Location
          </button>
          {lastUpdate && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Last server update: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-3">
            Activate your live location to receive the most accurate nearest
            case matches.
          </p>
          <button
            onClick={startTracking}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center justify-center font-semibold"
          >
            <SvgMapPin className="w-4 h-4 mr-2" /> Start Live Location
          </button>
        </>
      )}
    </div>
  );
};

export default LocationTracker;
