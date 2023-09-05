// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchApiData } from "../features/product/productSlice";
import { ROUTES } from "../utils/routes";

const displayNav = [
  {
    id: 1,
    display: "Shop",
    path: "/product?page=1",
  },
  {
    id: 2,
    display: "Order",
    path: `${ROUTES.YOURORDER}`,
  },
  {
    id: 3,
    display: "Secondhand",
    path: "/",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();

  const handleShopClick = () => {
    dispatch(fetchApiData({ page: 1 }));
  };

  return (
    <ul className="nav margin-right">
      {displayNav.map((item) => (
        <li className="nav-item" key={item.id}>
          {item.id === 1 ? (
            <Link to={item.path} className="nav-link" onClick={handleShopClick}>
              {item.display}
            </Link>
          ) : (
            <Link to={item.path} className="nav-link">
              {item.display}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
