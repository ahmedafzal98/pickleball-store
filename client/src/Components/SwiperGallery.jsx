import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import categoryImages from "../../data/categoryImages";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SwiperGallery() {
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
        {categoryImages &&
          categoryImages.map((path) => {
            return (
              <SwiperSlide className="w-full h-[600px] overflow-x-hidden">
                <img
                  className="w-full h-full object-contain rounded-md"
                  src={path}
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
        {categoryImages &&
          categoryImages.map((path) => {
            return (
              <SwiperSlide className="mt-4 opacity-50 cursor-pointer overflow-x-hidden">
                <img className="rounded-sm w-fit" src={path} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
