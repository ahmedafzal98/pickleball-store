import React, { useRef } from "react";
import Navbar from "./Navbar";
import CoverflowManager from "../custom-swiper/CoverflowManager";

export default function HomePage() {
  const coverflowRef = useRef(null);

  const handleNavbarCategoryClick = () => {
    coverflowRef.current?.scrollToLayer2();
  };

  return (
    <>
      <Navbar onCategoryClick={handleNavbarCategoryClick} />
      <CoverflowManager ref={coverflowRef} />
    </>
  );
}
