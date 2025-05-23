import React, { useState } from "react";
import categories from "../../data/categories";
import rightArrow from "../assets/icons/rightArrow.png";
import leftArrow from "../assets/icons/leftArrow.png";

const Coverflow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [speed, setSpeed] = useState(500);

  const prev = () =>
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );

  const next = () =>
    setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);

  // Start Auto Scroll (Click and Hold)
  const startScrolling = (direction) => {
    if (scrollInterval) return;

    let currentSpeed = speed;

    const scroll = () => {
      if (direction === "left") prev();
      else next();

      currentSpeed = Math.max(50, currentSpeed - 50); // Speed up
      const interval = setTimeout(scroll, currentSpeed);
      setScrollInterval(interval);
    };

    scroll();
  };

  // Stop Auto Scroll
  const stopScrolling = () => {
    if (scrollInterval) {
      clearTimeout(scrollInterval);
      setScrollInterval(null);
      setSpeed(500);
    }
  };

  return (
    <div className="relative min-h-screen w-full mx-auto md:w-[100%] flex flex-col mt-5 overflow-hidden">
      {/* Navigation Arrows */}
      <div className="absolute top-[17%] left-4 z-50 hidden sm:block">
        <button
          className="cursor-pointer"
          onClick={prev}
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          onTouchStart={() => startScrolling("left")}
          onTouchEnd={stopScrolling}
        >
          <img src={leftArrow} alt="Prev" className="w-12 h-12" />
        </button>
      </div>
      <div className="absolute top-[17%] right-4 z-50 hidden sm:block">
        <button
          className="cursor-pointer"
          onClick={next}
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          onTouchStart={() => startScrolling("right")}
          onTouchEnd={stopScrolling}
        >
          <img src={rightArrow} alt="Next" className="w-12 h-12" />
        </button>
      </div>
      {/* Coverflow Cards */}
      <div className="relative flex items-center justify-center w-full max-w-7xl h-[350px] perspective-[1200px] z-10 overflow-hidden">
        {categories.map((item, index) => {
          const offset = index - activeIndex;
          if (Math.abs(offset) > 5) return null;

          const baseX = offset * 80 + (offset > 0 ? 20 : offset < 0 ? -20 : 0);
          const rotateY = offset === 0 ? 0 : offset < 0 ? 25 : -25;
          const scale = offset === 0 ? 1.15 : 0.9;

          return (
            <div
              key={index}
              className="absolute rounded-xl overflow-hidden transition-all duration-500 cursor-pointer bg-transparent"
              onClick={() => setActiveIndex(index)}
              style={{
                transform: `translateX(${baseX}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: offset === 0 ? 999 : 100 - Math.abs(offset),
                border:
                  offset === 0
                    ? "2px solid #B9E018"
                    : "1px solid rgba(255,255,255,0.3)",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="relative w-[140px] h-[200px] md:w-[180px] md:h-[220px]">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                  style={{
                    filter: offset === 0 ? "none" : "brightness(50%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-white font-bold text-center text-sm px-2">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* A-Z Alphabet Strip */}
      {/* // Alphabet Bar with Scroll */}
      <div
        className="mt-10 max-w-[95%] mx-auto z-50 py-4 px-6 rounded-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800"
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
            className="inline-block text-[#B9E018] cursor-pointer  font-bold mx-3 text-lg hover:scale-110 transition"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Coverflow;
