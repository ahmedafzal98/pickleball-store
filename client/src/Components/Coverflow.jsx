import React, { useState } from "react";
import rightArrow from "../assets/icons/rightPickleball.png";
import leftArrow from "../assets/icons/leftPickleball.png";

const Coverflow = ({ categories, onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [speed, setSpeed] = useState(500);

  const prev = () =>
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );

  const next = () =>
    setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);

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

  // if (!categories || categories.length === 0) {
  //   return (
  //     <div className="text-center text-gray-400">No items to display.</div>
  //   );
  // }

  return (
    <div className="relative w-full flex flex-col items-center mt-5 overflow-hidden">
      {/* Navigation Arrows */}
      <div className="absolute top-[40%] left-2 z-50 ">
        <button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 cursor-pointer md:h-12 active:scale-90 transition-transform duration-150"
        >
          <img src={leftArrow} alt="Prev" className="w-full h-full" />
        </button>
      </div>

      <div className="absolute top-[40%] right-2 z-50 ">
        <button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 cursor-pointer md:h-12 active:scale-90 transition-transform duration-150"
        >
          <img src={rightArrow} alt="Next" className="w-full h-full" />
        </button>
      </div>

      {/* Coverflow Cards */}
      <div className="relative flex items-center justify-center w-full max-w-7xl h-[400px] perspective-[1200px] z-10 overflow-visible">
        {Array.isArray(categories) &&
          categories.map((item, index) => {
            const offset = index - activeIndex;
            if (Math.abs(offset) > 4) return null;

            const isActive = offset === 0;

            // Scaling logic
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

            // 3D spacing logic
            const translateX =
              offset === -4
                ? -650
                : offset === -3
                ? -500
                : offset === -2
                ? -330
                : offset === -1
                ? -190
                : offset === 1
                ? 190
                : offset === 2
                ? 330
                : offset === 3
                ? 500
                : offset === 4
                ? 650
                : 0;

            const rotateY =
              offset === 0
                ? 0
                : offset < 0
                ? 60 // left cards rotate right (towards center)
                : -60;

            // New: Z-depth for curve effect
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
                    src={item.image_url || (item.image && item.image.imageUrl)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: isActive
                        ? "brightness(90%)"
                        : Math.abs(offset) === 1
                        ? "brightness(75%)"
                        : "brightness(50%)",
                    }}
                  />

                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      isActive ? "bg-black/30" : "bg-black/50"
                    }`}
                  >
                    <span
                      className={`text-white text-center drop-shadow-md px-4 ${
                        isActive
                          ? "text-xl md:text-2xl font-extrabold"
                          : Math.abs(offset) === 1
                          ? "text-base md:text-lg font-bold"
                          : "text-xs md:text-sm font-semibold"
                      }`}
                    >
                      {item.name || item.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* A-Z Alphabet Strip */}
      <div
        className="mt-10 w-full max-w-5xl mx-auto z-50 py-4 px-4 rounded-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800 text-center"
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
              const index = categories.findIndex((cat) =>
                cat.name.toUpperCase().startsWith(letter)
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
