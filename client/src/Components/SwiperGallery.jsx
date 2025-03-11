import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import categoryImages from "../../data/categoryImages";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useSelector } from "react-redux";

export default function SwiperGallery() {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  const { additionalImages } = selectedProduct;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: "600px",
        }}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {additionalImages &&
          additionalImages.map((image) => {
            return (
              <SwiperSlide className="w-full h-[600px] overflow-x-hidden">
                <img
                  className="w-full h-full object-contain rounded-md"
                  src={image.imageUrl}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        height={200}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {additionalImages &&
          additionalImages.map((image) => {
            return (
              <SwiperSlide className="mt-4 opacity-50 cursor-pointer overflow-x-hidden">
                <img
                  className="w-full h-full object-contain rounded-md"
                  src={image.imageUrl}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
