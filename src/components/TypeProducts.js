import React from "react";
import imgProduct from "../assets/img/type0.avif";

const displayTypeProducts = [
  {
    id: 1,
    imgSrc: `${imgProduct}`,
    nameType: "Short",
  },
  {
    id: 2,
    imgSrc: `${imgProduct}`,
    nameType: "Jeans",
  },
  {
    id: 3,
    imgSrc: `${imgProduct}`,
    nameType: "Pants",
  },
  {
    id: 4,
    imgSrc: `${imgProduct}`,
    nameType: "Sweaters",
  },
  {
    id: 5,
    imgSrc: `${imgProduct}`,
    nameType: "T-Shirt",
  },
  {
    id: 6,
    imgSrc: `${imgProduct}`,
    nameType: "Dresses",
  },
  {
    id: 7,
    imgSrc: `${imgProduct}`,
    nameType: "Plus Size",
  },
  {
    id: 8,
    imgSrc: `${imgProduct}`,
    nameType: "Accessories",
  },
];

const TypeProducts = ({ category }) => {
  return (
    <section className="type">
      <div className="type-desc">
        <p>
          Clothing / <span>Woman</span>
        </p>
        <h5 className="type-title">WOMEN'S CLOTHES</h5>
      </div>
      <div className="type-list">
        {displayTypeProducts.map((item) => (
          <a href="/" className="type-item " key={item.id}>
            <div className="type-img">
              <img src={item.imgSrc} alt={item.nameType} />
            </div>
            <h5 className="type-name">{item.nameType}</h5>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TypeProducts;
