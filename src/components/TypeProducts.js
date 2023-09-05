import React from "react";
import imgProduct from "../assets/img/type0.avif";
import { Link } from "react-router-dom";
import { category } from "./../services/category.service";

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

const TypeProducts = () => {
  return (
    <section className="type">
      <div className="type-desc">
        <p>
          Clothing / <span>Woman</span>
        </p>
        <h5 className="type-title">WOMEN'S CLOTHES</h5>
      </div>
    </section>
  );
};

export default TypeProducts;
