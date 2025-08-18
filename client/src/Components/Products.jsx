import Product from "./Product";
import React, { useEffect, useRef, useState } from "react";

import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCoverflow from "./SwiperCoverflow";
import pickleballProducts from "../../data/pickleballProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryProducts,
  fetchProducts,
  setSelectedProduct,
} from "../../store/features/productSlice";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import CustomSwiper from "./CustomSwiper";
import Loader from "./Loader";
import Coverflow from "./Coverflow";
import { useNavigate } from "react-router-dom";
export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error, selectedCategory } = useSelector(
    (state) => state.products
  );

  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  const { items } = products;

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    dispatch(setSelectedProduct(item));
    navigate("/product");
  };

  useEffect(() => {
    let isSelectedCategories = Array.isArray(selectedCategory);

    if (selectedCategory && !isSelectedCategories) {
      dispatch(fetchCategoryProducts(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <h2>Error: {error}</h2>;
  return (
    <div className="flex flex-col items-center mt-[3%]">
      {items && (
        <Coverflow
          categories={items}
          onItemClick={(item) => handleItemClick(item)}
        />
      )}
    </div>
  );
}
