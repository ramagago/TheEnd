import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import { FaArrowLeft } from "react-icons/fa";

const CategoriesAdmin = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => !user && history.push("/admin-login")
    );
    return () => unsubscribe();
  }, [history]);

  return (
    <div className="admin-container">
      <Link to="/admin" className="back-arrow-admin">
        <FaArrowLeft />
      </Link>
      <Link className="btn" to="/photo-list-admin/fashion">
        Fashion
      </Link>
      <Link className="btn" to="/photo-list-admin/interiorDesign">
        Interior Design
      </Link>
      <Link className="btn" to="/photo-list-admin/lifestyle">
        Lifestyle
      </Link>
    </div>
  );
};

export default CategoriesAdmin;
