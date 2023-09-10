import React from "react";
import { Link } from "react-router-dom";

const ProductsPageItem = ({ id, name, image, price, newprice }) => {
  return (
    <div>
      <Link to={`/product/${id}`} className="product-page-item" key={id}>
        <div className="product-page-img">
          <img
            src={image}
            alt={name}
            defaultValue={
              "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVycm9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            }
          />
          <div className="product-page-btn">
            <Link to={`/product/${id}`}>Add to Bag</Link>
          </div>
        </div>
        <div className="product-page-desc">
          <p className="product-page-brand">Levi's® Premium</p>
          <h4 className="product-page-name">{name}</h4>
          <p className="product-page-price">
            {`$${price}`} <del>{`$${newprice}`}</del>
          </p>
          <h4 className="product-page-sale">49% Off. Price as Marked.</h4>
        </div>
      </Link>
    </div>
  );
};

export default ProductsPageItem;
