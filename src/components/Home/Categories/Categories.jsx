import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Categories.css";
import { motion, AnimatePresence } from "framer-motion";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import LoaderHome from "../../Loader/LoaderHome";

const Categories = () => {
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
    const fetchData = async () => {
      try {
        const [url1, url2, url3] = await Promise.all([
          getFirebaseImage("fashionCover2.jpg"),
          getFirebaseImage("interior-design-cover.jpg"),
          getFirebaseImage("lifestyle-cover.jpg"),
        ]);

        setFoto(url1);
        setFoto2(url2);
        setFoto3(url3);
        setIsPending(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isPending && (
          <motion.div
            className="loader-home"
            exit={{ opacity: 0 }}
            transition={{ delay: 0 }}
          >
            {" "}
            <LoaderHome />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isPending && (
          <div className="categories-container">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, delay: 0.5 },
              }}
              className="img-container fashion"
            >
              <Link to="/photo-list/fashion">
                <img className="img-category" src={foto} alt="Fashion" />{" "}
                <h2 className="h2-categories h2-fashion">
                  {" "}
                  <span style={{ textDecoration: "underline" }}>Fashion</span> →
                </h2>
              </Link>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, delay: 0.5 },
              }}
              className="img-container interior-design"
            >
              <Link to="/photo-list/interiorDesign">
                <img
                  className="img-category"
                  src={foto2}
                  alt="Interior Design"
                />{" "}
                <h2 className="h2-categories h2-interior-design">
                  <span style={{ textDecoration: "underline" }}>
                    Interior Design
                  </span>{" "}
                  →
                </h2>
              </Link>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, delay: 0.5 },
              }}
              className="img-container lifestyle"
            >
              <Link to="/photo-list/lifestyle">
                <img
                  className="img-category h2-lifestyle"
                  src={foto3}
                  alt="Lifestyle"
                />
                <h2 className="h2-categories">
                  <span style={{ textDecoration: "underline" }}>Lifestyle</span>{" "}
                  →
                </h2>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Categories;
