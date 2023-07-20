import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Header.css";
import { auth } from "../../firebase";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/Admin";
  const isCategoryAdmin = location.pathname === "/CategoriesAdmin";
  const isAdminLogin = location.pathname === "/AdminLogin";
  const isPhotoDetailsPage = location.pathname.includes("/PhotoDetails");

  const logoClassName =
    isHome || isAdmin || isCategoryAdmin || isAdminLogin
      ? "logo-class-1"
      : "logo-class-2";

  const headerBgWhite = isHome ? null : "header-bg-white";
  const headerHide = isPhotoDetailsPage ? "header-hide" : null;

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <div className={`header-container ${headerBgWhite} ${headerHide}`}>
        <Link to="/">
          <h1 className={logoClassName}>THE END</h1>
        </Link>
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
      </div>
    </>
  );
};

export default Header;
