import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/PhotoDetails.css";

const PhotoDetails = () => {
  const { uuid } = useParams();
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photosCollectionRef = collection(db, "photos");
        const q = query(photosCollectionRef, where("uuid", "==", uuid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setPhoto({ id: uuid, ...docData });
        } else {
          setError("Photo not found");
        }
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="photo-details-container">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {photo && (
        <article className="photo-container">
          <img
            className="img-photo-details"
            src={photo.url}
            alt={photo.title}
            style={{ width: "400px" }}
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
  );
};

export default PhotoDetails;
