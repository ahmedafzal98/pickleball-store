import { useSelector } from "react-redux";
import SwiperCoverflow from "./SwiperCoverflow";
import { useEffect } from "react";

const Subcategories = ({ items }) => {
  const { selectedCategory } = useSelector((state) => state.products);

  let isSubcategories = Array.isArray(selectedCategory);

  return selectedCategory && isSubcategories ? (
    <div className="flex flex-col items-center mt-[3%]">
      <SwiperCoverflow from="subcategories" subcategories={selectedCategory} />
    </div>
  ) : null;
};

export default Subcategories;
