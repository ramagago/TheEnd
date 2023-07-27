import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Admin.css";
import { FaArrowLeft } from "react-icons/fa";
import { auth } from "../../firebase";

const Admin = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => !user && history.push("/admin-login")
    );

    return unsubscribe;
  }, [history]);

  return (
    <div className="admin-container">
      <Link to="/" className="back-arrow-admin">
        <FaArrowLeft />
      </Link>
      <Link className="btn" to="/categories-admin">
        Edit
      </Link>
      <Link className="btn" to="/post">
        Upload
      </Link>
    </div>
  );
};

export default Admin;
