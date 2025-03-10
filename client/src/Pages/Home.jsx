import { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Products from "../Components/Products";
import axios from "axios";
import SwiperCoverflow from "../Components/SwiperCoverflow";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
};
export default Home;
