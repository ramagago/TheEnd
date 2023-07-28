import "./VideoModal.css";
import { motion } from "framer-motion";

const VideoModal = ({ handleCloseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <motion.iframe
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="https://www.youtube.com/embed/RJUf85ILvnk"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></motion.iframe>
        <div className="btn-x-container">
          <motion.button
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="close-button"
            onClick={handleCloseModal}
          >
            X
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
