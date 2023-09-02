import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "./../utils/routes";

const Logo = ({ className }) => {
  return (
    <h1>
      <Link to={ROUTES.HOME} className={`header-item ${className}`}>
        SonKhan's
      </Link>
    </h1>
  );
};

export default Logo;
