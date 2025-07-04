import React, { useState } from "react";
import rightArrow from "../assets/icons/rightPickleball.png";
import leftArrow from "../assets/icons/leftPickleball.png";

// Category image imports
import category1 from "../assets/images/categories/category1.png";
import category2 from "../assets/images/categories/category2.png";
import category3 from "../assets/images/categories/category3.png";
import category4 from "../assets/images/categories/category4.png";
import category5 from "../assets/images/categories/category5.png";
import category6 from "../assets/images/categories/category6.png";
import category7 from "../assets/images/categories/category7.png";
import category8 from "../assets/images/categories/category8.png";
import category9 from "../assets/images/categories/category9.png";
import category10 from "../assets/images/categories/category10.png";

// Local fallback images
const fallbackImages = [
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8,
  category9,
  category10,
];

// Fallback generator
const getFallbackImage = () =>
  fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

// Get proper image for each item
const getImageUrl = (item) =>
  item?.image_url?.trim()
    ? item.image_url
    : item?.image?.imageUrl?.trim()
    ? item.image.imageUrl
    : getFallbackImage();

const Coverflow = ({ categories = [], onItemClick }) => {
  // Sort A-Z
  const sortedCategories = [...categories].sort((a, b) =>
    (a?.name || "").localeCompare(b?.name || "")
  );

  // Ensure at least 9 items (repeat if needed)
  const loopedCategories =
    sortedCategories.length === 0
      ? []
      : sortedCategories.length >= 9
      ? sortedCategories
      : Array(Math.ceil(9 / sortedCategories.length))
          .fill(sortedCategories)
          .flat();

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [speed, setSpeed] = useState(500);

  const total = loopedCategories.length;

  const mod = (n, m) => ((n % m) + m) % m;

  const prev = () => {
    setActiveIndex((prevIndex) => mod(prevIndex - 1, total));
  };

  const next = () => {
    setActiveIndex((prevIndex) => mod(prevIndex + 1, total));
  };

  const startScrolling = (direction) => {
    if (scrollInterval) return;
    let currentSpeed = speed;

    const scroll = () => {
      direction === "left" ? prev() : next();
      currentSpeed = Math.max(50, currentSpeed - 50);
      const interval = setTimeout(scroll, currentSpeed);
      setScrollInterval(interval);
    };

    scroll();
  };

  const stopScrolling = () => {
    if (scrollInterval) {
      clearTimeout(scrollInterval);
      setScrollInterval(null);
      setSpeed(500);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center mt-5 overflow-hidden">
      {/* Arrows */}
      <div className="absolute top-[40%] left-2 z-50">
        <button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer active:scale-90 transition-transform"
        >
          <img src={leftArrow} alt="Prev" className="w-full h-full" />
        </button>
      </div>

      <div className="absolute top-[40%] right-2 z-50">
        <button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer active:scale-90 transition-transform"
        >
          <img src={rightArrow} alt="Next" className="w-full h-full" />
        </button>
      </div>

      {/* Coverflow Cards */}
      <div className="relative flex items-center justify-center w-full max-w-7xl h-[400px] perspective-[1200px] z-10 overflow-visible">
        {[...Array(9)].map((_, i) => {
          const offset = i - 4;
          const index = mod(activeIndex + offset, total);
          const item = loopedCategories[index];
          if (!item) return null;
          const isActive = offset === 0;

          const scale =
            offset === 0
              ? 1.25
              : Math.abs(offset) === 1
              ? 1.0
              : Math.abs(offset) === 2
              ? 0.9
              : Math.abs(offset) === 3
              ? 0.8
              : 0.7;

          const translateX =
            offset === -4
              ? -620
              : offset === -3
              ? -480
              : offset === -2
              ? -330
              : offset === -1
              ? -190
              : offset === 1
              ? 190
              : offset === 2
              ? 330
              : offset === 3
              ? 480
              : offset === 4
              ? 620
              : 0;

          const rotateY = offset === 0 ? 0 : offset < 0 ? 60 : -60;
          const translateZ = offset === 0 ? 0 : -Math.abs(offset) * 80;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 cursor-pointer rounded-xl overflow-hidden active:scale-95 hover:scale-[1.03] ${
                isActive
                  ? "border-4 border-[#B9E018] shadow-[0_0_20px_#B9E018]"
                  : "border-2 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              }`}
              onClick={() => {
                setActiveIndex(index);
                onItemClick?.(item);
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: isActive ? 999 : 100 - Math.abs(offset),
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px]">
                <img
                  src={getImageUrl(item)}
                  alt={item?.name || "category"}
                  onError={(e) => {
                    const target = e.target;
                    target.src = getFallbackImage();
                  }}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-white text-center drop-shadow-md px-4 ${
                      isActive
                        ? "text-xl md:text-2xl font-extrabold"
                        : Math.abs(offset) === 1
                        ? "text-base md:text-lg font-bold"
                        : "text-xs md:text-sm font-semibold"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* A-Z Strip */}
      <div
        className="mt-10 w-full max-w-5xl mx-auto z-50 py-4 px-4 rounded-full overflow-x-auto whitespace-nowrap text-center scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800"
        style={{
          background: `radial-gradient(circle at left center, #b8e01873 0.25%, transparent 40%),
                      radial-gradient(circle at right center, #b8e01873 0.25%, transparent 40%),
                      #000000fb`,
        }}
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => {
              const index = loopedCategories.findIndex((cat) =>
                cat.name?.toUpperCase().startsWith(letter)
              );
              if (index !== -1) setActiveIndex(index);
            }}
            className="inline-block text-[#B9E018] cursor-pointer font-bold mx-2 sm:mx-3 text-base sm:text-lg hover:scale-110 transition"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Coverflow;
