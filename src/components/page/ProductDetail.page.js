import React, { useState, useEffect } from "react";
import Styles from "./../Styles";
import { TbHeart } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetail,
  selectProductDetail,
  setActiveImageIndex,
  selectActiveImageIndex,
} from "../../features/product/productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "./../../features/cart/CartSlice";

// or only core styles

const displayBtn = [
  {
    id: 1,
    methods: "Pickup In-Store",
    description: "Select size to see if item in stock",
  },
  {
    id: 2,
    methods: "Ship",
    description: "Select size to see if item in stock",
  },
];

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Lấy giá trị id từ URL
  const productDetail = useSelector(selectProductDetail);
  const activeImageIndex = useSelector(selectActiveImageIndex);
  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id]);

  const [quatity, setquatity] = useState(1);
  const [activeItemId, setActiveItemId] = useState(0);
  const [activeButtonId, setActiveButtonId] = useState(null);
  const handleItemClick = (itemId) => {
    setActiveItemId(itemId);
  };
  const handleButtonClick = (btnId) => {
    setActiveButtonId(btnId);
  };
  const handleSmallImageClick = (index) => {
    dispatch(setActiveImageIndex(index)); // Gửi action để cập nhật activeImageIndex
  };
  const increasequatity = () => {
    setquatity(quatity + 1);
  };
  const reducequatity = () => {
    if (quatity === 1) {
      return;
    } else {
      setquatity(quatity - 1);
    }
  };

  // const productData = {
  //   id: id,
  //   name: productDetail.name,
  //   price: productDetail.price,
  //   size: productDetail.size,
  //   newPrice: productDetail.newPrice,
  // };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: productDetail._id,
      images: productDetail.images,
      name: productDetail.name,
      price: productDetail.price,
      size: productDetail.size[activeItemId], // Kích thước đã chọn
      stock: productDetail.stock, // Kích thước đã chọn
      quantity: quatity, // Số lượng đã chọn
    };

    dispatch(addToCart({ newItem: itemToAdd, quantity: quatity }));
  };
  if (!productDetail) {
    return <p>Loading...</p>;
  }
  return (
    <section className="page-detail-group container" key={productDetail.id}>
      <div className="page-detail-box">
        <div className="page-detail-primary">
          <div className="page-detail-box-img">
            <div className="page-detail-img-small">
              {productDetail.images.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSmallImageClick(index)}
                  className={activeImageIndex === index ? "active-image" : ""}
                >
                  <img src={item} alt="Product Detail" />
                </div>
              ))}
            </div>
            <div className="page-detail-img">
              <img src={productDetail.images[activeImageIndex]} alt="" />
            </div>
            <div className="page-detail-icHeart">
              <TbHeart />
            </div>
          </div>
        </div>
        <div className="page-detail-secound">
          <div className="page-detail-desc">
            <h6 className="page-detail-trademark">SonKhan's® Premium</h6>
            <h4 className="page-detail-name">{productDetail.name}</h4>
            <p className="page-detail-price">{`$${productDetail.price}`}</p>
            <p className="page-detail-sale">30% Off Applied at Checkout</p>
            <div className="page-detail-size">
              <h6>Size</h6>
              <div className="page-detail-size-lists">
                {productDetail.size.map((item, index) => (
                  <button
                    key={index}
                    className={activeItemId === index ? "active-size" : ""}
                    onClick={() => handleItemClick(index)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="page-detail-quality">
              <p>Quatity:</p>
              <div
                onClick={reducequatity}
                className={quatity === 1 ? "hide" : ""}
              >
                -
              </div>
              <div>{quatity}</div>
              <div onClick={increasequatity}>+</div>
            </div>
            <div className="page-detail-payment">
              {displayBtn.map((item) => (
                <div
                  className={`page-detail-item ${
                    activeButtonId === item.id ? "active-btn" : ""
                  }`}
                  key={item.id}
                  onClick={() => handleButtonClick(item.id)}
                >
                  <p>{item.methods}</p>
                  <span>{item.description}</span>
                </div>
              ))}
            </div>
            <div className="page-detail-btn">
              <button
                className="page-detail-btn-items"
                onClick={handleAddToCart}
              >
                Add to Bag
              </button>
              <div className="page-detail-qty">
                <button>
                  <TbHeart />
                </button>
                <div
                  onClick={reducequatity}
                  className={quatity === 1 ? "hide" : ""}
                >
                  -
                </div>
                <div>{quatity}</div>
                <div onClick={increasequatity}>+</div>
              </div>
            </div>
            <div className="page-detail-bottom">
              Free Shipping and Returns for SonKhan's® Red Tab™ Members
            </div>
          </div>
        </div>
      </div>
      <div className="page-detail-description">
        <div className="page-detail-description-primary">
          A modern take on a vintage staple, this Baby Blue Sweater Vest will
          see you through seasonal transitions with ease. Wear it on its own to
          stay warm on summer nights, then layer it with a long sleeve T-shirt
          once colder weather sneaks back in. It's semi-tailored, like a
          button-up vest, and yet soft, like a sweatshirt. Win-win.
          <p>A modern take on a vintage staple for a sleeveless open knit</p>
          <p>A layering piece you can also wear on its own Soft yet tailored</p>
          <p>Amber yellow Style # A42470001 Color: Amber Yellow</p>
        </div>
        <div className="page-detail-description-secound">
          <div className="page-detail-description-items">
            <h6>How it fit</h6>
            <ul>
              <li>Slim fit</li>
            </ul>
          </div>
          <div className="page-detail-description-items">
            <h6>How it fit</h6>
            <ul>
              <li>Knit</li>
              <li>Crewneck</li>
              <li>Imported</li>
            </ul>
          </div>
        </div>
      </div>
      <Styles />
    </section>
  );
};

export default ProductDetail;
