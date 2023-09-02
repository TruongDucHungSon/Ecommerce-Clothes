import React from "react";
import Product from "./Product";
import Title from "./Title";
import { useSelector } from "react-redux";
import { selectproducts } from "../features/product/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.min.css"; // Import the full bundle
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
const NewArivals = () => {
  const productsNewArivals = useSelector(selectproducts);

  return (
    <section className="newarivals container">
      <Title className="newarivals-title">NEW ARRIALS</Title>
      <div className="product-list">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 15 },
            420: { slidesPerView: 2.5, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 32 },
            992: { slidesPerView: 5, spaceBetween: 32 },
            1024: { slidesPerView: 6, spaceBetween: 32 },
          }}
        >
          {productsNewArivals?.map((item) => (
            <SwiperSlide key={item?._id}>
              <Product
                id={item?._id}
                name={item.name}
                image={item.images[0]}
                price={item.price}
                newprice={item.newprice}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArivals;
