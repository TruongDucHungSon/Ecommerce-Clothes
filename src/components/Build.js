import React from "react";
import Title from "./Title";
import imgBuild0 from "../assets/img/build0.avif";
import imgBuild1 from "../assets/img/build1.avif";
import imgBuild2 from "../assets/img/build2.avif";
import { Link } from "react-router-dom";

const displayBuild = [
  {
    id: 1,
    image: `${imgBuild0}`,
    content: "Shop",
    path: "Men",
  },
  {
    id: 2,
    image: `${imgBuild1}`,
    content: "Shop",
    path: "Woman",
  },
  {
    id: 3,
    image: `${imgBuild2}`,
    content: "Shop",
    path: "Accessories",
  },
  {
    id: 4,
    image: `${imgBuild2}`,
    content: "Shop",
    path: "Accessories",
  },
];

const Build = () => {
  return (
    <section className="buil container">
      <Title className="title-left">BUILD-A-FIT</Title>
      <div className="buil-group">
        <div className="buil-list">
          {/* render item */}
          {displayBuild.map((item) => (
            <div className="buil-item" key={item.id}>
              <div className="buil-img">
                <img src={item.image} alt={item.content} />
              </div>
              <div className="buil-desc">
                <h5 className="buil-link">
                  <span>{item.content}</span> / {item.path}
                </h5>
              </div>
            </div>
          ))}
        </div>
        <div className="buil-form">
          <h4>
            JOIN THE RED <span>TAB™</span> MEMBER PROGRAM FOR EXCLUSIVE PERKS
          </h4>
          <p>
            Membership is free and open to all. Get free shipping on every
            order, exclusive access to product, a birthday gift and much, much
            more.
          </p>
          <div className="buil-feid">
            <Link className="buil-sign">Sign up</Link>
            <Link className="buil-login">Log In</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Build;
