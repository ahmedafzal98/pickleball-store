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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );
  const swiperRef = useRef(null);
  let interval = null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("isLandscape", isLandscape);

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
        {isMobile && !isLandscape && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#B9E018] text-gray-800 text-center py-3 animate-slideUp">
            <p className="text-lg font-medium">
              Rotate your device to landscape mode for a better viewing
              experience!
            </p>
          </div>
        )}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={isLandscape ? 3 : 2} // Adjust slides for landscape
          spaceBetween={20}
          modules={[EffectCoverflow, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: isLandscape ? 3 : 2, // Adjust for landscape
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
          {from === "categories"
            ? categories.map((category, index) => (
                <SwiperSlide key={index}>{category}</SwiperSlide>
              ))
            : products.map((product, index) => (
                <SwiperSlide key={index}>{product}</SwiperSlide>
              ))}
        </Swiper>
      </div>
    </>
  );
}
