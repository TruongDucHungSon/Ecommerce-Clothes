import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import Logo from "./Logo";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgSearch } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ROUTES } from "./../utils/routes";

const HeaderMobile = ({ onOpen, openModal }) => {
  const [openNav, SetOpenNav] = useState(false);

  const handleOpenNav = () => {
    SetOpenNav(true);
  };
  const handleCloseNav = () => {
    SetOpenNav(false);
  };

  return (
    <div className="header-mb-group">
      {/* Header  */}
      <header className="header-mb container">
        <HiMenuAlt4 onClick={handleOpenNav} />
        <Logo />
        <div className="header-mb-ic">
          <CgSearch />
          <HiOutlineShoppingBag onClick={onOpen} />
        </div>
      </header>
      <div
        className={`header-overlay ${openNav ? "openOverlay" : ""}`}
        onClick={handleCloseNav}
      >
        {/* NavBar  */}
        <nav className="header-mb-nav">
          <div className="header-mb-top">
            <Logo className="header-mb-logo" />
            <div className="header-mb-ic">
              <CgSearch />
              <GrClose onClick={handleCloseNav} />
            </div>
          </div>
          <ul className="header-mb-menu">
            <li>
              <Link to={ROUTES.PRODUCT} className="txt-red">
                New arrivals
              </Link>
            </li>

            <li>
              <Link to={ROUTES.PRODUCT}>Men</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCT}>Woman</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCT}>Kids</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCT}>Accessories</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCT}>Collections</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCT} className="txt-red">
                Sale - extra 40% off
              </Link>
            </li>
          </ul>
          <div className="button-box header-mb-bottom">
            <Link className="button header-mb-link">Log in</Link>
            <Link className="button header-mb-link" onClick={openModal}>
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMobile;
