import { useEffect, useState } from "react";
import Banner from "../Components/marketing/Banner";
import Footer from "../Components/layout/Footer";
import Navbar from "../Components/layout/Navbar";
import NewsLetter from "../Components/marketing/NewsLetter";
import Products from "../Components/product/ProductsListContainer";
import { useSelector } from "react-redux";
import CoverflowManager from "../Components/custom-swiper/CoverflowManager";

const Home = () => {
  const { selectedCategory } = useSelector((state) => state.products);

  const subcategories = selectedCategory?.subcategories;

  return (
    <>
      <Navbar />
      <Banner />
      {/* <Categories /> */}
      {/* <Coverflow /> */}
      <CoverflowManager />
      {/* <Subcategories /> */}
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
};
export default Home;
