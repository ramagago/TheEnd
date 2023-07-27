import React, { useEffect, useState } from "react";
import "./Video.css";
import VideoModal from "./VideoModal";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { motion } from "framer-motion";

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [playIconUrl, setPlayIconUrl] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      const videoRef = ref(storage, "media/films/trailerReelv1.mp4");
      const playIconRef = ref(storage, "media/icons/play100x100.png");

      try {
        const videoUrl = await getDownloadURL(videoRef);
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error("Error al obtener la URL del video:", error);
      }

      try {
        const playIconUrl = await getDownloadURL(playIconRef);
        setPlayIconUrl(playIconUrl);
      } catch (error) {
        console.error(
          "Error al obtener la URL del icono de reproducción:",
          error
        );
      }
    };

    fetchUrls();
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="video-container"
    >
      <video
        style={{ cursor: `url('${playIconUrl}'), auto` }}
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
      {isModalOpen && <VideoModal handleCloseModal={handleCloseModal} />}
    </motion.div>
  );
};

export default Video;