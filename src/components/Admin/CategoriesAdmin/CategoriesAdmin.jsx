import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./CategoriesAdmin.css";
import { auth } from "../../../firebase";

const CategoriesAdmin = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/AdminLogin"); // Redirige al componente AdminLogin si no hay usuario loggeado
      }
    });

    return () => unsubscribe();
  }, [history]);

  return (
    <div className="admin-container">
      <Link className="btn" to="/PhotoListAdmin/fashion">
        Fashion
      </Link>
      <Link className="btn" to="/PhotoListAdmin/interiorDesign">
        Interior Design
      </Link>
      <Link className="btn" to="/PhotoListAdmin/lifestyle">
        Lifestyle
      </Link>
    </div>
  );
};

export default CategoriesAdmin;
