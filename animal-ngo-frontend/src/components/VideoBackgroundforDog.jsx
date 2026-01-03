import React from "react";
import dogVideo from "../assets/videos/dog.mp4";

const VideoBackgroundforDog = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={dogVideo} type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default VideoBackgroundforDog;
