import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchPhotoList from "../../../utils/fetchPhotoList";
import "./PhotoList.css";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import Contact from "../../Home/Contact/Contact";
import PhotoList from "./PhotoList";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PhotoGallery = () => {
  const { filter } = useParams();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(filter);

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  useEffect(() => {
    fetchPhotoList(currentFilter, setPhotos, setIsPending, setError);

    window.scrollTo({ top: 0 });
  }, [currentFilter]);

  return (
    <div className="photo-gallery">
      <Link to="/" className="back-arrow-photo-list">
        <FaArrowLeft />
      </Link>
      <CategoriesFilter
        currentFilter={currentFilter}
        handleClick={handleClick}
      />

      {/* GAP for the header */}
      <div style={{ height: "135px" }}></div>

      <PhotoList
        currentFilter={currentFilter}
        isPending={isPending}
        error={error}
        photos={photos}
      />

      <div style={{ widht: "100%", borderBottom: "solid 1px #57575761" }}></div>

      <Contact />
    </div>
  );
};

export default PhotoGallery;
