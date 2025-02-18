import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import leftPaddle from "../assets/icons/leftPaddle.svg";
import rightPaddle from "../assets/icons/rightPaddle.svg";
import Product from "./Product";
import pickleballProducts from "../../data/pickleballProducts";
import BasicModal from "./Modal";

export default function SwiperCoverflow({ from, data }) {
  const [openModal, setOpenModal] = useState(false);
  const [path, setPath] = useState("");
  const swiperRef = useRef(null);
  let interval = null;

  // Function to start fast navigation
  const startFastNavigation = (direction) => {
    if (interval) return;

    interval = setInterval(() => {
      if (swiperRef.current) {
        direction === "next"
          ? swiperRef.current.slideNext()
          : swiperRef.current.slidePrev();
      }
    }, 100); // Adjust speed if needed
  };

  const stopFastNavigation = () => {
    clearInterval(interval);
    interval = null;
  };

  const handleModal = (path) => {
    setOpenModal(true);
    setPath(path);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const categories =
    data &&
    data.map((path, index) => {
      return (
        <SwiperSlide className="mt-[3%]" key={index}>
          <div
            onClick={() => handleModal(path)}
            className="w-full flex items-center justify-center rounded-lg"
          >
            <img src={path} alt="Category" className="h-full" />
          </div>
        </SwiperSlide>
      );
    });

  const products =
    pickleballProducts &&
    pickleballProducts.map((item) => {
      return (
        <SwiperSlide className="mt-[3%]">
          <Product data={item} />
        </SwiperSlide>
      );
    });

  return (
    <>
      {<BasicModal path={path} open={openModal} close={closeModal} />}
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
          centeredSlides={true}
          slidesPerView={5} // Display 5 slides at a time
          spaceBetween={20}
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
          {from === "categories" ? categories : products}
        </Swiper>
      </div>
    </>
  );
}
