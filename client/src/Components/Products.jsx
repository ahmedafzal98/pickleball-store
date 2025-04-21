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
} from "../../store/features/productSlice";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import CustomSwiper from "./CustomSwiper";
import Loader from "./Loader";
export default function App() {
  const dispatch = useDispatch();
  const { products, status, error, selectedCategory } = useSelector(
    (state) => state.products
  );

  const { items } = products;
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
      {/* {items && <SwiperCoverflow from="products" items={items} />}
       */}
      {items && <CustomSwiper from="products" items={items} />}
    </div>
  );
}
