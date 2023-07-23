import React, { useEffect, useState } from "react";
import "./Video.css";
import videoSource from "../../../media/films/trailerReelv1.mp4";
// import videoSource2 from "../../../media/films/trailerReelv2.mp4";
import logoPlay from "../../../media/icons/play2.png";
import VideoModal from "./VideoModal";

const Video = () => {
  const video = videoSource;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const iconSize = 100; // Tamaño del icono de reproducción

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

  //// Esto era para que el video cambie el source segun si es un mobile o desktop

  // const [videoSource, setVideoSource] = useState(videoSource1);
  // useEffect(() => {
  //   const mediaQueryList = window.matchMedia(
  //     "(min-width: 768px) and (orientation: landscape)"
  //   );
  //   const handleMediaQueryChange = (e) => {
  //     // Verificar si la consulta de medios coincide
  //     if (e.matches) {
  //       setVideoSource(videoSource1); // Origen del video para landscape y pantallas mayores a 768px
  //     } else {
  //       setVideoSource(videoSource2); // Origen del video para pantallas menores a 768px
  //     }
  //   };

  //   // Asignar el controlador de eventos para el cambio en la consulta de medios
  //   mediaQueryList.addEventListener("change", handleMediaQueryChange);

  //   // Inicializar el origen del video según la consulta de medios actual
  //   handleMediaQueryChange(mediaQueryList);

  //   // Remover el controlador de eventos cuando el componente se desmonta
  //   return () => {
  //     mediaQueryList.removeEventListener("change", handleMediaQueryChange);
  //   };
  // }, []);

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
    <div
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
        <source src={video} type="video/mp4" />
        Tu navegador no admite el elemento de video.
      </video>
      {isHovered && (
        <img
          src={logoPlay}
          style={calculateIconPosition()}
          className="img-play"
          alt="Logo Play"
        />
      )}
      {isModalOpen && <VideoModal handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Video;
