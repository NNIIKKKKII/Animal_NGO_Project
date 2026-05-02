import React from "react";
import catVideo from "../assets/videos/cat.mp4";

const VideoBackground = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={catVideo} type="video/mp4" />
      </video>

      <div className="app-video-overlay" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
