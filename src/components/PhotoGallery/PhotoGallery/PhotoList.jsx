import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./PhotoList.css";
import Loader from "../../Loader/Loader";

const PhotoList = ({ currentFilter, isPending, error, photos }) => {
  return (
    <div className="photo-list-container">
      {isPending && <Loader />}
      {error && <div>Error: {error}</div>}
      <div className="photo-list">
        {photos &&
          photos.map((photo) => (
            <Link
              className="photo-list-link"
              key={photo.uuid}
              to={`/PhotoDetails/${photo.uuid}/${currentFilter}`}
            >
              <img className="photo" src={photo.url} alt={photo.title} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PhotoList;
