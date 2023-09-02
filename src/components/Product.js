import React from "react";
import { Link } from "react-router-dom";
const Product = ({ id, name, image, price, newprice }) => {
  return (
    <div>
      <Link to={`product/${id}`} className="product" key={id}>
        <div className="product-img">
          <img src={image} alt={name} />
        </div>
        <div className="product-desc">
          <h4 className="product-name">{name}</h4>
          <p className="product-price">
            {`$${price}`}{" "}
            <del style={{ color: "#433e3b" }}>{`$${newprice}`}</del>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
