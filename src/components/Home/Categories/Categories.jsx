import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Categories.css";
import { motion, AnimatePresence } from "framer-motion";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import LoaderHome from "../../Loader/LoaderHome";

const Categories = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [foto, setFoto] = useState("");
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");
  const [isPending, setIsPending] = useState(true);

  const getFirebaseImage = async (imageName) => {
    const storage = getStorage();
    const imageRef = ref(storage, `media/img/${imageName}`);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  useEffect(() => {
    Promise.all([
      getFirebaseImage("fashionCover2.jpg"),
      getFirebaseImage("interiorDesignCover.jpeg"),
      getFirebaseImage("Lifestyle Cover.jpeg"),
    ])
      .then(([url1, url2, url3]) => {
        setFoto(url1);
        setFoto2(url2);
        setFoto3(url3);
        setIsPending(false);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });

    const isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
    setIsTouchDevice(isTouch);
  }, []);
  return (
    <>
      <AnimatePresence>
        {isPending && (
          <motion.div
            className="loader-home"
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {" "}
            <LoaderHome />
          </motion.div>
        )}
      </AnimatePresence>
      {!isPending && (
        <div className="categories-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
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
            transition={{ delay: 0.5, duration: 1 }}
            whileHover={isTouchDevice ? {} : { opacity: 0.6 }}
            whileTap={{ opacity: 0.6 }}
            className="img-container interior-design"
          >
            <Link to="/PhotoList/interiorDesign">
              <h2 className="h2-categories h2-interior-design">
                Interior Design
              </h2>
              <img className="img-category" src={foto2} alt="Interior Design" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
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
      )}
    </>
  );
};

export default Categories;
