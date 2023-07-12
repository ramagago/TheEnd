import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/PhotoList.css";

const PhotoList = () => {
  const { filter } = useParams();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photosCollectionRef = collection(db, "photos");
        const q = query(photosCollectionRef, where("category", "==", filter));
        const querySnapshot = await getDocs(q);
        const photosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhotos(photosData);
        setIsPending(false);
        console.log(photos);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="photo-list-container">
      <div className="photo-list">
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {photos &&
          photos.map((photo) => (
            <Link
              className="photo-list-link"
              key={photo.uuid}
              to={`/photos/${photo.uuid}`}
            >
              <img className="photo" src={photo.url} alt={photo.title} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PhotoList;
