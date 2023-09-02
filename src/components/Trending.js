import React from "react";
import imageTrending0 from "../assets/img/Hero0.avif";
import imageTrending1 from "../assets/img/Hero1.avif";
import imageTrending2 from "../assets/img/Hero2.avif";
import imageTrending3 from "../assets/img/Hero3.avif";
import imgAnimation from "../assets/img/imgAnimation.gif";

const displayImg = [
  {
    id: 0,
    image: `${imageTrending0}`,
    title: "Learn into the losse look",
    content: "Sk8er style",
    btnPath: "Shop Men",
    path: "/",
  },
  {
    id: 1,
    image: `${imageTrending1}`,
    title: "Learn into the losse look",
    content: "Sk8er style",
    btnPath: "Shop Womnen",
    path: "/",
  },
  {
    id: 2,
    image: `${imageTrending2}`,
    title: "Learn into the losse look",
    content: "Sk8er style",
    btnPath: "Shop Accessories",
    path: "/",
  },
  {
    id: 3,
    image: `${imageTrending3}`,
    title: "Learn into the losse look",
    content: "Sk8er style",
    btnPath: "Shop Kids",
    path: "/",
  },
];

const Trending = () => {
  return (
    <div className="trending">
      <div className="trending-desc">
        <p className="trending-head">Noteworthy Styles</p>
        <img src={imgAnimation} alt="Img animation" height={64} />
      </div>
      {/* render */}
      <div className="trending-img">
        {displayImg.map((item) => (
          <div className="trending-thumnail">
            <img src={item.image} alt="Trending" />
            <div className="trending-img-desc">
              <p>{item.title}</p>
              <h4>{item.content}</h4>
              <a href={item.path}>{item.btnPath}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
