import React from "react";
import "./CategoriesFilter.css";

const CategoriesFilter = ({ currentFilter, handleClick }) => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li
          className={`navigation-item ${
            currentFilter === "fashion" ? "active" : ""
          }`}
          onClick={() => handleClick("fashion")}
        >
          Fashion
        </li>
        <li
          className={`navigation-item ${
            currentFilter === "interiorDesign" ? "active" : ""
          }`}
          onClick={() => handleClick("interiorDesign")}
        >
          Interior Design
        </li>
        <li
          className={`navigation-item ${
            currentFilter === "lifestyle" ? "active" : ""
          }`}
          onClick={() => handleClick("lifestyle")}
        >
          Lifestyle
        </li>
      </ul>
    </nav>
  );
};

export default CategoriesFilter;
