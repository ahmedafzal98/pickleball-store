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
  const [setSwiperRef] = useState(null);
  return (
    <div className="flex flex-col items-center mt-[3%]">
      <span className="text-4xl font-semibold text-white">
        Explore Our Products
      </span>
      <SwiperCoverflow from="products" data={pickleballProducts} />
    </div>
  );
}
