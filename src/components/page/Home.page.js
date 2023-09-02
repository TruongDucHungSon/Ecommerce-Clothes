import React, { useEffect } from "react";
import Hero from "../Hero";
import NewArivals from "../NewArivals";
import Trending from "../Trending";
import Styles from "../Styles";
import Build from "../Build";
import Cart from "../Cart";
import { useDispatch } from "react-redux";
import { fetchApiData } from "../../features/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApiData());
  }, []);

  return (
    <>
      <Cart />
      <Hero />
      <NewArivals />
      <Trending />
      <Styles />
      <Build />
    </>
  );
};

export default Home;
