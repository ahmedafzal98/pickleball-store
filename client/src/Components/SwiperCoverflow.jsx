import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Scrollbar,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import leftPaddle from "../assets/icons/leftPaddle.svg";
import rightPickleball from "../assets/icons/rightPaddle.svg";
import Product from "./Product";
import pickleballProducts from "../../data/pickleballProducts";
import BasicModal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCategoryProducts,
  setSelectedCategory,
  setSelectedProduct,
} from "../../store/features/productSlice";

export default function SwiperCoverflow({
  from,
  data,
  allCategories,
  title,
  items,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [path, setPath] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );
  const swiperRef = useRef(null);
  let interval = null;

  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getProduct = (id) => {
    const product = items.find((item) => item.itemId === id);
    dispatch(setSelectedProduct(product));
    navigate("/product");

    // navigate("/product", { state: { product: selectedProduct } });
  };

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
  const selectCategory = (category) => {
    if (category) {
      dispatch(setSelectedCategory(category));
    }
  };
  const categories =
    allCategories &&
    allCategories.map((category, index) => (
      <SwiperSlide className="" key={index}>
        <div
          style={{ height: "200px", perspective: "250px" }}
          onClick={() => handleModal(path)}
          className="w-full flex items-center justify-center rounded-lg"
        >
          <h1
            onClick={() => selectCategory(category)}
            className="text-white font-bold cursor-pointer"
          >
            {category}
          </h1>
          {/* <a href="#" style={{ width: "450px", display: "block" }}>
            <img
              style={{
                WebkitBoxReflect:
                  "below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05), transparent)",
                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))",
                transition: "transform 0.3s ease-in-out",
                borderRadius: "10px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              src={path}
              alt="Category"
              className="h-full"
              />
            
              </a> */}
        </div>
      </SwiperSlide>
    ));

  const products =
    items &&
    items.map((item) => (
      <SwiperSlide
        onClick={() => getProduct(item.itemId)}
        className="mt-[3%]"
        key={item.itemId}
      >
        <Product data={item} />
      </SwiperSlide>
    ));

  return (
    <>
      {/* <BasicModal path={path} open={openModal} close={closeModal} /> */}

      {/* Rotate Device Message for Mobile Portrait Mode */}
      {isMobile && !isLandscape && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#B9E018] text-gray-800 text-center py-3 animate-slideUp z-50 shadow-lg">
          <p className="text-lg font-medium">
            Rotate your device to landscape mode for a better viewing
            experience!
          </p>
        </div>
      )}

      {/* Cover Flow Container */}
      <span className="text-white font-semibold text-base xl:text-4xl">
        {title}
      </span>
      <div className="relative w-[80%] h-auto mx-auto mt-4">
        {/* Navigation Buttons */}
        {!isMobile && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              onMouseDown={() => startFastNavigation("prev")}
              onMouseUp={stopFastNavigation}
              onMouseLeave={stopFastNavigation}
              className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 cursor-pointer
                z-10 flex items-center justify-center w-30 h-30 rounded-full bg-[#B9E018] hover:bg-[#A0C816] transition duration-300 shadow-lg"
            >
              <img src={leftPaddle} alt="Previous" className="w-8 h-8" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              onMouseDown={() => startFastNavigation("next")}
              onMouseUp={stopFastNavigation}
              onMouseLeave={stopFastNavigation}
              className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 
                z-10 flex items-center justify-center w-30 h-30 rounded-full bg-[#B9E018] cursor-pointer hover:bg-[#A0C816] transition duration-300 shadow-lg"
            >
              <img src={rightPickleball} alt="Next" className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Swiper Component */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2} // Adjust slides for landscape
          spaceBetween={20}
          modules={[EffectCoverflow, Pagination, Navigation, Scrollbar]}
          scrollbar={{
            draggable: true,
            el: ".custom-scrollbar", // Add a custom class
          }}
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
            slideShadows: true, // Enable slide shadows
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper shadow-lg" // Add shadow to the Cover Flow
        >
          {from === "categories"
            ? categories &&
              categories.map((category, index) => (
                <SwiperSlide key={index}>{category}</SwiperSlide>
              ))
            : products &&
              products.map((product, index) => (
                <SwiperSlide key={index}>{product}</SwiperSlide>
              ))}
        </Swiper>

        <div className="custom-scrollbar mt-4"></div>
      </div>
    </>
  );
}
