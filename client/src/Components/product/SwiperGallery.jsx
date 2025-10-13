import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useSelector } from "react-redux";

export default function SwiperGallery() {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  console.log(selectedProduct);

  const { additionalImages = [] } = selectedProduct || {};

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!additionalImages || additionalImages.length === 0) {
    return (
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={selectedProduct.image_url || selectedProduct.imageUrl}
          alt={selectedProduct.title}
          className="rounded-xl shadow-lg border border-white/30 w-[400px] h-[400px] object-contain bg-black/20"
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* 🖼️ Main Image Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: "600px",
        }}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 w-full max-w-[800px]"
      >
        {additionalImages.map((image, index) => (
          <SwiperSlide
            key={image.imageUrl || index}
            className="w-full h-[600px]"
          >
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900/10 to-black/10 rounded-lg">
              <img
                className="w-full h-full object-contain rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                src={image.imageUrl}
                alt={`Product image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🧿 Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-full max-w-[800px] mt-4"
      >
        {additionalImages.map((image, index) => (
          <SwiperSlide
            key={`thumb-${image.imageUrl || index}`}
            className={`cursor-pointer rounded-lg transition-all duration-300 overflow-hidden ${
              activeIndex === index
                ? "opacity-100 border-2 border-[#B9E018] shadow-[0_0_15px_#B9E018]"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              className="w-full h-[120px] object-cover rounded-md"
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
