import Product from "./Product";
import React, { useRef, useState } from "react";

import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCoverflow from "./SwiperCoverflow";
import pickleballProducts from "../../data/pickleballProducts";
export default function App() {
  return (
    <div className="flex flex-col items-center mt-[3%]">
      <SwiperCoverflow from="products" data={pickleballProducts} />
    </div>
  );
}
