import React from "react";
import "../styles/Video.css";
import videoSource from "../films/trailerReelv1.mp4";

const Video = () => {
  return (
    <div className="video-container">
      <video className="video" autoPlay loop muted playsInline>
        <source src={videoSource} type="video/mp4" />
        Tu navegador no admite el elemento de video.
      </video>
    </div>
  );
};

export default Video;
