import React from "react";
import dogVideo from "../assets/videos/dog.mp4";

const VideoBackgroundforDog = ({ children }) => {
  return (
    <div className="relative z-10 flex min-h-screen items-start justify-center pt-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={dogVideo} type="video/mp4" />
      </video>

      <div className="app-video-overlay" />

      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default VideoBackgroundforDog;
