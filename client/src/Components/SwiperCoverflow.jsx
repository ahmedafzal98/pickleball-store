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
  subcategories,
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
    if (!category.hasOwnProperty("subcategories")) {
      dispatch(setSelectedCategory(category.name));
      return;
    }
    const { subcategories } = category;
    if (subcategories.length === 0) {
      dispatch(setSelectedCategory(category.name));
    } else {
      dispatch(setSelectedCategory(subcategories));
    }
  };
  const categories =
    allCategories &&
    allCategories.map((category, index) => (
      <SwiperSlide className="" key={index}>
        <div
          style={{ height: "auto", perspective: "250px" }}
          className="w-full flex flex-col items-center justify-center rounded-lg cursor-pointer"
        >
          <div
            onClick={() => selectCategory(category)}
            style={{ width: "400px", display: "block" }}
          >
            <img
              style={{
                width: "350px",
                height: "250px",
                objectFit: "cover",
                WebkitBoxReflect:
                  "below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05), transparent)",
                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                borderRadius: "15px", // More rounded corners for a sleek look
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)", // Better shadow effect
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0, 0, 0, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.3)";
              }}
              src={category.image_url}
              alt="Category"
              className="h-full"
            />
          </div>
          <h1 className="text-white font-bold cursor-pointer text-3xl w-auto mt-3">
            {category.name}
          </h1>
        </div>
      </SwiperSlide>
    ));
  const subCategories =
    subcategories &&
    subcategories.map((category, index) => (
      <SwiperSlide className="" key={index}>
        <div
          style={{ height: "auto", perspective: "250px" }}
          className="w-full flex flex-col items-center justify-center rounded-lg cursor-pointer"
        >
          <div
            onClick={() => selectCategory(category)}
            style={{ width: "400px", display: "block" }}
          >
            <img
              style={{
                width: "350px",
                height: "250px",
                objectFit: "cover",
                WebkitBoxReflect:
                  "below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05), transparent)",
                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                borderRadius: "15px", // More rounded corners for a sleek look
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)", // Better shadow effect
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0, 0, 0, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.3)";
              }}
              src={category.image_url}
              alt="Category"
              className="h-full"
            />
          </div>
          <h1
            onClick={() => selectCategory(category.subcategories)}
            className="text-white font-bold cursor-pointer text-3xl w-auto mt-3"
          >
            {category.name}
          </h1>
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

  const renderSlides = () => {
    switch (from) {
      case "categories":
        return (
          categories &&
          categories.map((category, index) => (
            <SwiperSlide key={index}>{category}</SwiperSlide>
          ))
        );
      case "subcategories":
        return (
          subCategories &&
          subCategories.map((subcategory, index) => (
            <SwiperSlide key={index}>{subcategory}</SwiperSlide>
          ))
        );
      case "products":
        return (
          products &&
          products.map((product, index) => (
            <SwiperSlide key={index}>{product}</SwiperSlide>
          ))
        );
      default:
        return null;
    }
  };

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
          slidesPerView={isLandscape ? 3 : 2}
          spaceBetween={20}
          modules={[EffectCoverflow, Pagination, Navigation, Scrollbar]}
          // breakpoints={{
          //   640: {
          //     slidesPerView: isLandscape ? 3 : 2, // Adjust for landscape
          //     spaceBetween: 20,
          //   },
          //   768: {
          //     slidesPerView: 4,
          //     spaceBetween: 40,
          //   },
          //   1024: {
          //     slidesPerView: 5,
          //     spaceBetween: 50,
          //   },
          // }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper shadow-lg" // Add shadow to the Cover Flow
        >
          {renderSlides()}
        </Swiper>

        <div className="custom-scrollbar mt-4"></div>
      </div>
    </>
  );
}
