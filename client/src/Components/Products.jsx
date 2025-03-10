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
import { fetchProducts } from "../../store/features/productSlice";
import { Backdrop, Box, CircularProgress } from "@mui/material";
export default function App({ product }) {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const { itemSummaries } = products;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress sx={{ color: "#B9E018" }} />
      </Box>
    );
  if (status === "failed") return <h2>Error: {error}</h2>;
  return (
    <div className="flex flex-col items-center mt-[3%]">
      <SwiperCoverflow from="products" items={itemSummaries} />
    </div>
  );
}
