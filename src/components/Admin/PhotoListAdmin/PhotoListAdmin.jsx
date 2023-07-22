import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ref, deleteObject } from "firebase/storage";
import "./PhotoListAdmin.css";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import fetchPhotoList from "../../../utils/fetchPhotoList";
import { auth, db, storage } from "../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Loader from "../../Loader/Loader";

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
    fetchPhotoList(filter, setPhotos, setIsPending, setError);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filter]);

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
    <>
      <Link to="/CategoriesAdmin" className="back-arrow-post">
        <FaArrowLeft />
      </Link>
      <div style={{ height: "75px", marginBottom: "15px" }}></div>
      <div className="list-admin-container">
        <div className="list-container">
          {!isPending && (
            <>
              <h3 className="category-title">{filter}</h3>
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
          {isPending && <Loader />}
        </div>
      </div>
      <div style={{ height: "75px", marginBottom: "15px" }}></div>
    </>
  );
};

export default PhotoListAdmin;
