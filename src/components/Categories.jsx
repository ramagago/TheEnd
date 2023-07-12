import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import foto from "../img/fashionCover.jpeg";
import foto2 from "../img/interiorDesignCover.jpeg";
import foto3 from "../img/Lifestyle Cover.jpeg";
import "../styles/Categories.css";

const Categories = () => {
  return (
    <div className="categories-container">
      <Link
        style={{ order: "2" }}
        className="img-container"
        to="/PhotoList/fashion"
      >
        <h2 className="h2-categories">FASHION</h2>
        <img className="img-home" src={foto} alt="Fashion" />
      </Link>
      <Link
        style={{ order: "1" }}
        className="img-container"
        to="/PhotoList/interiorDesign"
      >
        <h2 className="h2-categories">INTERIOR DESIGN</h2>
        <img className="img-home" src={foto2} alt="Interior Design" />
      </Link>
      <Link
        style={{ order: "3" }}
        className="img-container"
        to="/PhotoList/lifestyle"
      >
        <img className="img-home" src={foto3} alt="Lifestyle" />
        <h2 className="h2-categories">LIFESTYLE</h2>
      </Link>
    </div>
  );
};

export default Categories;
