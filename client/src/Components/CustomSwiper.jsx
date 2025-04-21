import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const CoverflowSlider = ({ allCategories, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subActiveIndex, setSubActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const dragX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

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
    setOffset(offset + 300);
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

  const handleWheel = (e, type) => {
    if (e.deltaY > 0) {
      type === "main" ? nextSlide() : nextSubSlide();
    } else {
      type === "main" ? prevSlide() : prevSubSlide();
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % allCategories.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + allCategories.length) % allCategories.length
    );
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
    setSelectedCategory(category);
    setSubcategories(category.subcategories || []);
    setSelectedSubcategory(null);
    setSubActiveIndex(0);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const renderImages = (items, currentIndex, onClickHandler) => {
    return items.map(({ name, image_url }, index) => {
      const offset = index - currentIndex;
      const absOffset = Math.abs(offset);
      const scale = 1 - Math.min(absOffset * 0.2, 1);
      const translateX = offset * 300;
      const rotateY = offset * -45;

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
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
          drag="x" // Use drag functionality for the x-axis
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: -300, right: 300 }} // Set constraints to prevent going off-screen
          dragElastic={0.2} // Add some elasticity for smoother drag
          onClick={() => onClickHandler && onClickHandler(items[index])}
        >
          <div className="relative">
            <img
              src={image_url || "/fallback.jpg"}
              alt={name}
              className="rounded-xl object-cover shadow-lg"
              style={{ width: "300px", height: "200px" }}
            />
            <img
              src={image_url || "/fallback.jpg"}
              alt={`${name} reflection`}
              className="rounded-xl object-cover opacity-20 blur-md rotate-180"
              style={{ width: "300px", height: "100px", marginTop: "-10px" }}
            />
          </div>
          <p className="mt-2 text-center text-white font-semibold bg-black/60 w-full py-1 rounded-md">
            {name}
          </p>
        </motion.div>
      );
    });
  };

  const renderProducts = (products) => {
    return (
      <div className="flex flex-wrap justify-center gap-6 mt-6 px-4">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-white w-64 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300"
          >
            <img
              src={product.image_url || "/fallback.jpg"}
              alt={product.name}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-bold text-gray-800 text-center">
              {product.name}
            </h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center space-y-10">
      {/* Main Category Slider */}
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
          className="hidden md:flex cursor-pointer absolute left-4 z-20 w-[80px] h-[80px] bg-[#B9E018] rounded-full items-center justify-center shadow-md hover:bg-[#A0C814]"
        >
          ←
        </button>

        <div className="relative flex items-center justify-center w-full h-full">
          {renderImages(allCategories, activeIndex, handleCategoryClick)}
        </div>

        <button
          onClick={nextSlide}
          className="hidden md:flex cursor-pointer absolute right-4 z-20 w-[80px] h-[80px] bg-[#B9E018] rounded-full items-center justify-center shadow-md hover:bg-[#A0C814]"
        >
          →
        </button>
      </div>

      {/* Subcategory Slider */}
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
          onWheel={(e) => handleWheel(e, "sub")}
        >
          <button
            onClick={prevSubSlide}
            className="hidden md:flex cursor-pointer absolute left-4 z-20 w-[60px] h-[60px] bg-[#FDD835] rounded-full items-center justify-center shadow-md hover:bg-[#FBC02D]"
          >
            ←
          </button>

          <div className="relative flex items-center justify-center w-full h-full">
            {renderImages(
              subcategories,
              subActiveIndex,
              handleSubcategoryClick
            )}
          </div>

          <button
            onClick={nextSubSlide}
            className="hidden md:flex cursor-pointer absolute right-4 z-20 w-[60px] h-[60px] bg-[#FDD835] rounded-full items-center justify-center shadow-md hover:bg-[#FBC02D]"
          >
            →
          </button>
        </div>
      )}

      {/* Product Slider */}
      <div className="w-full">
        {selectedSubcategory ? (
          <div className="mt-4">
            <h3 className="text-center text-xl font-bold text-white mb-2">
              Products in {selectedSubcategory.name}
            </h3>
            {renderProducts(selectedSubcategory.products || [])}
          </div>
        ) : selectedCategory && subcategories.length === 0 ? (
          <div className="mt-4">
            <h3 className="text-center text-xl font-bold text-white mb-2">
              Products in {selectedCategory.name}
            </h3>
            {renderProducts(selectedCategory.products || [])}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CoverflowSlider;
