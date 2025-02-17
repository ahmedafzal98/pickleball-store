import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import category from "../assets/images/category.png";
import leftPaddle from "../assets/icons/leftPaddle.svg";
import rightPaddle from "../assets/icons/rightPaddle.svg";
import categoryImages from "../../data/categoryImages";

export default function SwiperCoverflow() {
  const swiperRef = useRef(null);
  let interval = null;

  // Function to start fast navigation
  const startFastNavigation = (direction) => {
    if (interval) return; // Prevent multiple intervals

    interval = setInterval(() => {
      if (swiperRef.current) {
        direction === "next"
          ? swiperRef.current.slideNext()
          : swiperRef.current.slidePrev();
      }
    }, 100); // Adjust speed if needed
  };

  // Function to stop fast navigation
  const stopFastNavigation = () => {
    clearInterval(interval);
    interval = null;
  };

  return (
    <div className="relative w-[80%] h-auto mx-auto mt-4">
      <button
        onClick={() => swiperRef.current?.slidePrev()} // Normal navigation
        onMouseDown={() => startFastNavigation("prev")} // Start speed-up on hold
        onMouseUp={stopFastNavigation} // Stop on release
        onMouseLeave={stopFastNavigation} // Stop if cursor leaves
        className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 cursor-pointer
        z-10 flex items-center justify-center w-30 h-30 rounded-full bg-[#B9E018] hover:text-[#B9E018] transition duration-300 shadow-lg"
      >
        <img src={leftPaddle} alt="Prev" />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()} // Normal navigation
        onMouseDown={() => startFastNavigation("next")} // Start speed-up on hold
        onMouseUp={stopFastNavigation} // Stop on release
        onMouseLeave={stopFastNavigation} // Stop if cursor leaves
        className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 
        z-10 flex items-center justify-center w-30 h-30 rounded-full bg-[#B9E018] cursor-pointer hover:text-[#B9E018] transition duration-300 shadow-lg"
      >
        <img src={rightPaddle} alt="Next" />
      </button>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        onClick={() => console.log("Clicked")}
        centeredSlides={true}
        slidesPerView={5} // Display 5 slides at a time
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
        className="mySwiper"
      >
        {categoryImages &&
          categoryImages.map((path, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="w-full flex items-center justify-center rounded-lg">
                  <img src={path} alt="Category" className="h-full" />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
