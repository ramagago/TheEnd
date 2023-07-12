import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ref, deleteObject } from "firebase/storage";
import "../styles/PhotoListAdmin.css";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { auth, db, storage } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";

const PhotoListAdmin = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/AdminLogin"); // Redirige al componente AdminLogin si no hay usuario loggeado
      }
    });

    return () => unsubscribe();
  }, [history]);

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
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (photoId, photoUuid) => {
    const imageRef = ref(storage, `/images/${photoUuid}`);
    try {
      await deleteObject(imageRef);

      // Eliminar el documento de la colección "photos"
      await deleteDoc(doc(db, "photos", photoId));

      // Actualizar el estado eliminando la foto
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-admin-container">
      <div className="list-container">
        <Link to="/Admin" className="back-arrow-post">
          <FaArrowLeft />
        </Link>
        {!isPending && (
          <>
            <h3 className="category-title">Fashion</h3>
            {error && <div>Error: {error}</div>}
            {photos && (
              <>
                {photos.map((photo) => (
                  <div key={photo.id} className="list-element">
                    <Link
                      to={`/PostEdit/${photo.id}/${photo.uuid}/${filter}`}
                      className="edit-link"
                    >
                      <img
                        className="admin-list-img"
                        src={photo.url}
                        alt={photo.title}
                        style={{ width: "50px" }}
                      />
                      <p className="photo-title">{photo.title}</p>
                    </Link>

                    <div className="btn-list-delete">
                      <AiFillDelete
                        className="delete-icon"
                        onClick={() => handleDelete(photo.id, photo.uuid)}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {isPending && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default PhotoListAdmin;
