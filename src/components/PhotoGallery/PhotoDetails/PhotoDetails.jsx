import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PhotoDetails.css";
import PhotoList from "../PhotoGallery/PhotoList";
import Contact from "../../Home/Contact/Contact";
import fetchPhotoDetails from "../../../utils/fetchPhotoDetails";
import fetchPhotoList from "../../../utils/fetchPhotoList";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PhotoDetails = () => {
  const { uuid, currentFilter } = useParams();
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetchPhotoDetails(uuid, setPhoto, setError, setIsPending);
  }, [uuid]);

  useEffect(() => {
    fetchPhotoList(currentFilter, setPhotos, setIsPending, setError);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentFilter]);

  return (
    <>
      <Link
        to={`/PhotoList/${currentFilter}`}
        className="back-arrow-photo-details"
      >
        <FaArrowLeft />
      </Link>
      <div className="photo-details-container">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {photo && (
          <article className="photo-container">
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
          </article>
        )}
      </div>

      <div className="gap-photo-details-photo-list"></div>
      <PhotoList isPending={isPending} error={error} photos={photos} />
      <div style={{ widht: "100%", borderBottom: "solid 1px #57575761" }}></div>
      <Contact />
    </>
  );
};

export default PhotoDetails;
