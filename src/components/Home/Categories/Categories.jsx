import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import foto from "../../../media/img/fashionCover2.jpg";
import foto2 from "../../../media/img/interiorDesignCover.jpeg";
import foto3 from "../../../media/img/Lifestyle Cover.jpeg";
import "./Categories.css";
import { motion } from "framer-motion";

const Categories = () => {
  // Estado para almacenar si el dispositivo es táctil o no
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar si el dispositivo es táctil
    const isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
    setIsTouchDevice(isTouch);
  }, []);
  return (
    <div className="categories-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileHover={isTouchDevice ? {} : { opacity: 0.6 }}
        className="img-container fashion"
      >
        <Link to="/PhotoList/fashion">
          <h2 className="h2-categories h2-fashion">Fashion</h2>
          <img className="img-category" src={foto} alt="Fashion" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileHover={isTouchDevice ? {} : { opacity: 0.6 }}
        whileTap={{ opacity: 0.6 }}
        className="img-container interior-design"
      >
        <Link to="/PhotoList/interiorDesign">
          <h2 className="h2-categories h2-interior-design">Interior Design</h2>
          <img className="img-category" src={foto2} alt="Interior Design" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={isTouchDevice ? {} : { opacity: 0.6 }}
        className="img-container lifestyle"
      >
        <Link to="/PhotoList/lifestyle">
          <img
            className="img-category h2-lifestyle"
            src={foto3}
            alt="Lifestyle"
          />
          <h2 className="h2-categories">Lifestyle</h2>
        </Link>
      </motion.div>
    </div>
  );
};

export default Categories;
