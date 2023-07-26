import React, { useEffect, useState } from "react";
import "./Video.css";
import VideoModal from "./VideoModal";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { motion } from "framer-motion";

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const iconSize = 100; // Tamaño del icono de reproducción

  const [videoUrl, setVideoUrl] = useState(""); // Estado para almacenar la URL del video
  const [playIconUrl, setPlayIconUrl] = useState(""); // Estado para almacenar la URL del icono de play

  useEffect(() => {
    const videoRef = ref(storage, "media/films/trailerReelv1.mp4");
    const playIconRef = ref(storage, "media/icons/play2.png"); // Referencia al archivo del ícono en Storage

    getDownloadURL(videoRef)
      .then((url) => {
        setVideoUrl(url);
      })
      .catch((error) => {
        console.error("Error al obtener la URL del video:", error);
      });

    getDownloadURL(playIconRef)
      .then((url) => {
        setPlayIconUrl(url);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la URL del icono de reproducción:",
          error
        );
      });
  }, []); // Se asegura de que se ejecute solo una vez al montar el componente

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleVideoClick = () => {
    setIsModalOpen(true);
    setIsHovered(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateIconPosition = () => {
    if (mousePosition) {
      const offsetX = -(iconSize / 2);
      const offsetY = -(iconSize / 2);
      const container = document.querySelector(".video-container");
      const containerRect = container.getBoundingClientRect();
      const positionX = mousePosition.x - containerRect.left + offsetX;
      const positionY = mousePosition.y - containerRect.top + offsetY;
      return { left: `${positionX}px`, top: `${positionY}px` };
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`video-container ${isHovered ? "cursor-hidden" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        className="video"
        autoPlay
        loop
        muted
        playsInline
        onClick={handleVideoClick}
      >
        {videoUrl && <source src={videoUrl} type="video/mp4" />}
        Tu navegador no admite el elemento de video.
      </video>
      {isHovered && (
        <img
          src={playIconUrl}
          style={calculateIconPosition()}
          className="img-play"
          alt="Logo Play"
        />
      )}
      {isModalOpen && <VideoModal handleCloseModal={handleCloseModal} />}
    </motion.div>
  );
};

export default Video;
