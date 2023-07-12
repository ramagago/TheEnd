import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../styles/Header.css";
import { auth } from "../firebase"; // Asegúrate de importar el objeto 'auth' desde tu archivo 'firebase'

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/Admin";
  const isCategoryAdmin = location.pathname === "/CategoriesAdmin";
  const isAdminLogin = location.pathname === "/AdminLogin";

  const logoClassName =
    isHome || isAdmin || isCategoryAdmin || isAdminLogin
      ? "logo-class-1"
      : "logo-class-2";

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("cerraste sesion");
        // Redirigir al inicio después de cerrar sesión
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(user !== null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="header-container">
        <Link to="/">
          <h1 className={logoClassName}>THE END</h1>
        </Link>
      </div>
      {isUserLoggedIn && (
        <>
          <Link className="admin-btn" to="/Admin">
            Admin
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default Header;
