import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./PhotoList.css";
import Loader from "../../Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const PhotoList = ({ currentFilter, isPending, error, photos }) => {
  return (
    <div className="photo-list-container">
      <AnimatePresence>
        {isPending && (
          <motion.div
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      {error && <div>Error: {error}</div>}

      <div className="photo-list">
        {photos &&
          photos.map((photo) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="photo-list-link"
              key={photo.uuid}
            >
              <Link to={`/PhotoDetails/${photo.uuid}/${currentFilter}`}>
                <img className="photo" src={photo.url} alt={photo.title} />
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default PhotoList;
