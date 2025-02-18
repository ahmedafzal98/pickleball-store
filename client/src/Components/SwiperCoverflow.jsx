import React, { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State for screen size
  const swiperRef = useRef(null);
  let interval = null;

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startFastNavigation = (direction) => {
    if (interval) return;
    interval = setInterval(() => {
      if (swiperRef.current) {
        direction === "next"
          ? swiperRef.current.slideNext()
          : swiperRef.current.slidePrev();
      }
    }, 100);
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
    data.map((path, index) => (
      <SwiperSlide className="mt-[3%]" key={index}>
        <div
          onClick={() => handleModal(path)}
          className="w-full flex items-center justify-center rounded-lg"
        >
          <img src={path} alt="Category" className="h-full" />
        </div>
      </SwiperSlide>
    ));

  const products =
    pickleballProducts &&
    pickleballProducts.map((item) => (
      <SwiperSlide className="mt-[3%]" key={item.id}>
        <Product data={item} />
      </SwiperSlide>
    ));

  return (
    <>
      <BasicModal path={path} open={openModal} close={closeModal} />
      <div className="relative w-[80%] h-auto mx-auto mt-4">
        {!isMobile && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              onMouseDown={() => startFastNavigation("prev")}
              onMouseUp={stopFastNavigation}
              onMouseLeave={stopFastNavigation}
              className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 cursor-pointer
                z-10 flex items-center justify-center w-30 h-30 rounded-full bg-[#B9E018] hover:text-[#B9E018] transition duration-300 shadow-lg"
            >
              <img src={leftPaddle} alt="Prev" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              onMouseDown={() => startFastNavigation("next")}
              onMouseUp={stopFastNavigation}
              onMouseLeave={stopFastNavigation}
              className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 
                z-10 flex items-center justify-center w-30 h-30 rounded-full bg-[#B9E018] cursor-pointer hover:text-[#B9E018] transition duration-300 shadow-lg"
            >
              <img src={rightPaddle} alt="Next" />
            </button>
          </>
        )}

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper"
        >
          {from === "categories" ? categories : products}
        </Swiper>
      </div>
    </>
  );
}
