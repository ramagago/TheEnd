import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Header.css";
import { auth } from "../../firebase";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/Admin";
  const isCategoryAdmin = location.pathname === "/CategoriesAdmin";
  const isAdminLogin = location.pathname === "/AdminLogin";
  const isPhotoDetailsPage = location.pathname.includes("/PhotoDetails");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDarkBackground =
    isHome || isAdmin || isCategoryAdmin || isAdminLogin ? true : false;

  const logoClassName = isDarkBackground ? "logo-class-1" : "logo-class-2";
  const headerBgWhite = isDarkBackground ? null : "header-bg-white";
  const adminDark = isDarkBackground ? null : "admin-dark";

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

    setIsMenuOpen(false);
  };
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(user !== null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // hacer un condicional si estoy en home va eso, sino no.
  }, [location]);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dropdown = isMenuOpen ? "menu-dropdown-down" : null;
  return (
    <>
      <div className={`header-container ${headerBgWhite} ${headerHide}`}>
        <Link to="/">
          <h1 className={logoClassName}>THE END</h1>
        </Link>
        {isUserLoggedIn && (
          <>
            {!isMenuOpen && (
              <AiOutlineMenu
                className={`admin-menu-mobile ${adminDark}`}
                onClick={handleMenu}
              />
            )}
            <Link className={`admin-btn-desktop ${adminDark}`} to="/Admin">
              Admin
            </Link>
            <button
              className={`logout-btn-desktop ${adminDark}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
      {/* {isMenuOpen && ( */}
      <div className={`menu-dropdown ${dropdown}`}>
        <button className="close-menu" onClick={handleMenu}>
          X
        </button>
        <Link className={`btn-mobile`} onClick={handleMenu} to="/Admin">
          Admin
        </Link>
        <button className={`btn-mobile`} onClick={handleLogout}>
          Logout
        </button>
      </div>
      {/* )} */}
    </>
  );
};

export default Header;
