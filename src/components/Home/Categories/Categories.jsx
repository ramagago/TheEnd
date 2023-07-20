import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import foto from "../../../media/img/fashionCover2.jpg";
import foto2 from "../../../media/img/interiorDesignCover.jpeg";
import foto3 from "../../../media/img/Lifestyle Cover.jpeg";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories-container">
      <Link className="img-container fashion" to="/PhotoList/fashion">
        <h2 className="h2-categories h2-fashion">Fashion</h2>
        <img className="img-category" src={foto} alt="Fashion" />
      </Link>
      <Link
        className="img-container interior-design"
        to="/PhotoList/interiorDesign"
      >
        <h2 className="h2-categories h2-interior-design">Interior Design</h2>
        <img className="img-category" src={foto2} alt="Interior Design" />
      </Link>
      <Link className="img-container lifestyle" to="/PhotoList/lifestyle">
        <img
          className="img-category h2-lifestyle"
          src={foto3}
          alt="Lifestyle"
        />
        <h2 className="h2-categories">Lifestyle</h2>
      </Link>
    </div>
  );
};

export default Categories;
