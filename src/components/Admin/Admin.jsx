import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Admin.css";
import { auth } from "../../firebase";

const Admin = () => {
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
      <Link className="btn" to="/CategoriesAdmin">
        Edit
      </Link>
      <Link className="btn" to="/Post">
        Upload
      </Link>
    </div>
  );
};

export default Admin;
