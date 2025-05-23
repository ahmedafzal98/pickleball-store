import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  setSelectedCategory,
  fetchCategoryProducts,
} from "../../store/features/productSlice";
import Product from "./Product";

const CoverflowSlider = ({ allCategories, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subActiveIndex, setSubActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategoryState] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [dragging, setDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const isDragging = useRef(false);

  const dispatch = useDispatch();

  const handleDragStart = (e) => {
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX);
    dragCurrentX.current = dragStartX.current;
    isDragging.current = true;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    dragCurrentX.current = currentX;
  };

  const handleDragEnd = (type) => {
    setDragging(false);
    if (!isDragging.current) return;
    const delta = dragStartX.current - dragCurrentX.current;
    if (Math.abs(delta) > 100) {
      if (delta > 0) {
        type === "main" ? nextSlide() : nextSubSlide();
      } else {
        type === "main" ? prevSlide() : prevSubSlide();
      }
    }
    isDragging.current = false;
  };

  useEffect(() => {
    console.log("Items", items);
  }, [items]);

  const nextSlide = () => {
    // Check if allCategories is defined and has items
    if (allCategories && Array.isArray(allCategories)) {
      setActiveIndex((prev) => (prev + 1) % allCategories.length);
    } else {
      console.error("allCategories is not defined or is not an array.");
    }
  };

  const prevSlide = () => {
    // Check if allCategories is defined and has items
    if (allCategories && Array.isArray(allCategories)) {
      setActiveIndex(
        (prev) => (prev - 1 + allCategories.length) % allCategories.length
      );
    } else {
      console.error("allCategories is not defined or is not an array.");
    }
  };

  const nextSubSlide = () => {
    setSubActiveIndex((prev) => (prev + 1) % subcategories.length);
  };

  const prevSubSlide = () => {
    setSubActiveIndex(
      (prev) => (prev - 1 + subcategories.length) % subcategories.length
    );
  };

  const handleCategoryClick = (category) => {
    if (!category.subcategories || category.subcategories.length === 0) {
      dispatch(setSelectedCategory(category.name));
      dispatch(fetchCategoryProducts(category.name));
      setSelectedCategoryState(category);
      setSubcategories([]);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategoryState(category);
      setSubcategories(category.subcategories);
      setSelectedSubcategory(null);
      setSubActiveIndex(0);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    dispatch(setSelectedCategory(subcategory.name));
    dispatch(fetchCategoryProducts(subcategory.name));
    setSelectedSubcategory(subcategory);
  };

  const renderImages = (items, currentIndex, onClickHandlers = []) => {
    return (
      items &&
      items.map((category, index) => {
        const offset = index - currentIndex;
        const absOffset = Math.abs(offset);
        const scale = 1 - Math.min(absOffset * 0.2, 1);
        const translateX = offset * 300;
        const rotateY = offset * -45;

        return (
          <motion.div
            key={index}
            animate={{
              scale,
              x: translateX,
              rotateY,
              opacity: absOffset > 3 ? 0 : 1,
            }}
            transition={{ type: "tween", duration: 0.2, ease: "linear" }}
            className="absolute flex flex-col items-center cursor-pointer flex-shrink-0"
            style={{
              width: "300px",
              transformStyle: "preserve-3d",
              zIndex: 10 - absOffset,
            }}
            drag="x"
            onDragStart={() => setDragging(true)}
            onDragEnd={() => handleDragEnd("main")}
            dragConstraints={{ left: -300, right: 300 }}
            dragElastic={0.2}
            onClick={() =>
              onClickHandlers.forEach((handler) => handler(category))
            }
          >
            <p className="mt-2 text-center text-3xl text-white font-Altone bg-black/60 w-full py-1 rounded-md">
              {category.name} {/* Ensure you're rendering category.name */}
            </p>
            {/* If you have an image, display it */}
            {category.image_url && (
              <img src={category.image_url} alt={category.name} />
            )}
          </motion.div>
        );
      })
    );
  };

  return (
    <div className="w-full flex flex-col items-center space-y-10">
      <div
        className="relative flex items-center justify-center h-[400px] w-full overflow-hidden max-w-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={() => handleDragEnd("main")}
        onMouseLeave={() => handleDragEnd("main")}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={() => handleDragEnd("main")}
      >
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 z-20 w-[80px] h-[80px] bg-[#B9E018] rounded-full items-center justify-center"
        >
          ←
        </button>
        <div className="relative flex items-center justify-center w-full h-full">
          {renderImages(allCategories, activeIndex, [handleCategoryClick])}
        </div>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 z-20 w-[80px] h-[80px] bg-[#B9E018] rounded-full items-center justify-center"
        >
          →
        </button>
      </div>

      {subcategories.length > 0 && (
        <div
          className="relative flex items-center justify-center h-[300px] w-full overflow-hidden mt-4"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={() => handleDragEnd("sub")}
          onMouseLeave={() => handleDragEnd("sub")}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={() => handleDragEnd("sub")}
        >
          <button
            onClick={prevSubSlide}
            className="hidden md:flex absolute left-4 z-20 w-[60px] h-[60px] bg-[#FDD835] rounded-full items-center justify-center"
          >
            ←
          </button>
          <div className="relative flex items-center justify-center w-full h-full">
            {renderImages(subcategories, subActiveIndex, [
              handleSubcategoryClick,
            ])}
          </div>
          <button
            onClick={nextSubSlide}
            className="hidden md:flex absolute right-4 z-20 w-[60px] h-[60px] bg-[#FDD835] rounded-full items-center justify-center"
          >
            →
          </button>
        </div>
      )}

      <div className="flex">
        {items &&
          items.map((item, index) => {
            return <Product key={index} data={item} />;
          })}
      </div>
    </div>
  );
};

export default CoverflowSlider;
