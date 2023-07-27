import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Header.css";
import { auth } from "../../firebase";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";
  const isCategoryAdmin = location.pathname === "/categories-admin";
  const isAdminLogin = location.pathname === "/admin-login";
  const isPhotoDetailsPage = location.pathname.includes("/photo-details");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const isDarkBackground =
    isHome || isAdmin || isCategoryAdmin || isAdminLogin ? true : false;

  const logoClassName = isDarkBackground ? "logo-class-1" : "logo-class-2";
  const headerBgWhite = isDarkBackground ? null : "header-bg-white";
  const adminDark = isDarkBackground ? null : "admin-dark";
  const headerHide = isPhotoDetailsPage ? "header-hide" : null;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("cerraste sesion");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(user !== null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const handleMenu = () => setIsMenuOpen(!isMenuOpen);
  const dropdown = isMenuOpen ? "menu-dropdown-down" : null;

  return (
    <>
      <div className={`header-container ${headerBgWhite} ${headerHide}`}>
        <Link to="/">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={logoClassName}
          >
            THE END
          </motion.h1>
        </Link>
        {isUserLoggedIn && (
          <>
            {!isMenuOpen && (
              <AiOutlineMenu
                className={`admin-menu-mobile ${adminDark}`}
                onClick={handleMenu}
              />
            )}
            <Link className={`admin-btn-desktop ${adminDark}`} to="/admin">
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
      <div className={`menu-dropdown ${dropdown}`}>
        <button className="close-menu" onClick={handleMenu}>
          X
        </button>
        <Link className={`btn-mobile`} onClick={handleMenu} to="/admin">
          Admin
        </Link>
        <button className={`btn-mobile`} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
