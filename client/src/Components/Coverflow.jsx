import React, { useEffect, useRef, useState } from "react";

import categories from "../../data/categories";
import rightArrow from "../assets/icons/rightArrow.png";
import leftArrow from "../assets/icons/leftArrow.png";

const Coverflow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderTimeout = useRef(null);
  const targetIndex = useRef(activeIndex);

  // Accelerated navigation on hold
  const intervalId = useRef(null);
  const delay = useRef(500);
  const accelerationFactor = 0.85;
  const minDelay = 50;

  const next = () => setActiveIndex((prev) => (prev + 1) % categories.length);
  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );

  const startContinuousMove = (directionFunc) => {
    if (intervalId.current) return;
    delay.current = 500;

    const step = () => {
      directionFunc();
      delay.current = Math.max(minDelay, delay.current * accelerationFactor);
      clearInterval(intervalId.current);
      intervalId.current = setInterval(step, delay.current);
    };

    intervalId.current = setInterval(step, delay.current);
  };

  const stopContinuousMove = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const handleSliderChange = (e) => {
    const newTarget = parseInt(e.target.value);
    targetIndex.current = newTarget;

    if (sliderTimeout.current) {
      clearTimeout(sliderTimeout.current);
    }

    const animate = () => {
      setActiveIndex((prev) => {
        if (prev === targetIndex.current) return prev;
        const step = targetIndex.current > prev ? 1 : -1;
        sliderTimeout.current = setTimeout(animate, 500);
        return prev + step;
      });
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (sliderTimeout.current) clearTimeout(sliderTimeout.current);
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center mt-[100px] min-h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Blur */}
      <div
        className="absolute opacity-20 scale-110 z-0 transition-all duration-500"
        style={{
          backgroundImage: `url(${categories[activeIndex]?.image_url})`,
        }}
      ></div>

      {/* Navigation Arrows (hidden on mobile/tablet) */}
      <button
        onClick={prev}
        onMouseDown={() => startContinuousMove(prev)}
        onMouseUp={stopContinuousMove}
        onMouseLeave={stopContinuousMove}
        className="hidden sm:block cursor-pointer absolute left-2 sm:left-4 top-[80px] sm:top-[150px] text-white text-2xl sm:text-4xl font-bold z-50 hover:scale-110 sm:hover:scale-125 transition select-none w-10 h-10 sm:w-16 sm:h-16"
      >
        <img
          src={leftArrow}
          alt="leftArrow"
          className="w-full h-full object-contain"
        />
      </button>

      <button
        onClick={next}
        onMouseDown={() => startContinuousMove(next)}
        onMouseUp={stopContinuousMove}
        onMouseLeave={stopContinuousMove}
        className="hidden sm:block cursor-pointer absolute right-2 sm:right-4 top-[80px] sm:top-[150px] text-white text-2xl sm:text-4xl font-bold z-50 hover:scale-110 sm:hover:scale-125 transition select-none w-10 h-10 sm:w-16 sm:h-16"
      >
        <img
          src={rightArrow}
          alt="rightArrow"
          className="w-full h-full object-contain"
        />
      </button>

      {/* Cards Container */}
      <div className="relative flex items-center justify-center w-full max-w-6xl h-[350px] perspective-[1200px] z-10">
        {categories.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = index === activeIndex;
          const translateX = offset * 220;
          const rotateY = offset * 25;
          const scale = isActive ? 1.1 : 0.9;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="absolute transition-all duration-500 ease-in-out rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: 100 - Math.abs(offset),
                opacity: Math.abs(offset) > 3 ? 0 : 1,
                border: isActive ? "2px solid #a8ff00" : "2px solid white",
              }}
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-[150px] h-[220px] md:w-[200px] opacity-20 md:h-[220px] object-cover rounded-2xl group-hover:scale-105 group-hover:shadow-2xl transition duration-300 ease-in-out"
              />
              <div className="absolute bottom-3 w-full text-center text-white font-bold text-sm md:text-lg drop-shadow-md">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrollbar */}
      <div className="w-full flex mt-[50px] justify-center z-50">
        <div
          className="w-[85%] p-4 border border-white opacity-80 rounded-md shadow-md"
          style={{
            background: `
              radial-gradient(circle at left center, #b8e01873 0.25%, transparent 40%),
              radial-gradient(circle at right center, #b8e01873 0.25%, transparent 40%),
              #000000fb
            `,
          }}
        >
          <input
            type="range"
            min={0}
            max={categories.length - 1}
            value={activeIndex}
            onChange={handleSliderChange}
            className="w-full accent-[#B9E018] transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Coverflow;
