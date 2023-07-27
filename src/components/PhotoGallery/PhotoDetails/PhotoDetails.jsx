import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PhotoDetails.css";
import PhotoList from "../PhotoGallery/PhotoList";
import Contact from "../../Home/Contact/Contact";
import fetchPhotoDetails from "../../../utils/fetchPhotoDetails";
import fetchPhotoList from "../../../utils/fetchPhotoList";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

const PhotoDetails = () => {
  const { uuid, currentFilter } = useParams();
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      await fetchPhotoDetails(uuid, setPhoto, setError, setIsPending);
    };
    fetchDetails();
  }, [uuid]);

  useEffect(() => {
    const fetchList = async () => {
      await fetchPhotoList(currentFilter, setPhotos, setIsPending, setError);
    };
    fetchList();
  }, [currentFilter]);

  return (
    <>
      <Link
        to={`/photo-list/${currentFilter}`}
        className="back-arrow-photo-details"
      >
        <FaArrowLeft />
      </Link>
      <div className="photo-details-container">
        <AnimatePresence>
          {isPending && (
            <motion.div
              className="loader"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
        {error && <div>{error}</div>}
        {photo && (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="photo-container"
          >
            <img
              className="img-photo-details"
              src={photo.url}
              alt={photo.title}
            />
            <div className="photo-info-container">
              {photo.location && (
                <p className="photo-info-text">
                  Location:{" "}
                  {photo.locationLink ? (
                    <a
                      className="photo-details-link"
                      href={photo.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {photo.location}
                    </a>
                  ) : (
                    photo.location
                  )}
                </p>
              )}
              {photo.brand && (
                <p className="photo-info-text">
                  Brand:{" "}
                  {photo.brandLink ? (
                    <a
                      className="photo-details-link"
                      href={photo.brandLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {photo.brand}
                    </a>
                  ) : (
                    photo.brand
                  )}
                </p>
              )}
              {photo.model && (
                <p className="photo-info-text">
                  Model:{" "}
                  {photo.modelLink ? (
                    <a
                      className="photo-details-link"
                      href={photo.modelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {photo.model}
                    </a>
                  ) : (
                    photo.model
                  )}
                </p>
              )}
              {photo.makeup && (
                <p className="photo-info-text">
                  MakeUp:{" "}
                  {photo.makeupLink ? (
                    <a
                      className="photo-details-link"
                      href={photo.makeupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {photo.makeup}
                    </a>
                  ) : (
                    photo.makeup
                  )}
                </p>
              )}
            </div>
          </motion.article>
        )}
      </div>

      <div className="gap-photo-details-photo-list"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <PhotoList
          currentFilter={currentFilter}
          isPending={isPending}
          error={error}
          photos={photos}
        />
      </motion.div>
      <div style={{ widht: "100%", borderBottom: "solid 1px #57575761" }}></div>
      <Contact />
    </>
  );
};

export default PhotoDetails;
