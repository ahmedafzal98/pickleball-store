import React, { useEffect } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryProducts,
  setSelectedProduct,
} from "../../store/features/productSlice";
import Loader from "../shared/Loader";
import Coverflow from "../custom-swiper/Coverflow";
import { useNavigate } from "react-router-dom";
export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error, selectedCategory } = useSelector(
    (state) => state.products
  );

  const { items } = products;

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    dispatch(setSelectedProduct(item));
    navigate("/product");
  };

  useEffect(() => {
    let isSelectedCategories = Array.isArray(selectedCategory);

    if (selectedCategory && !isSelectedCategories) {
      dispatch(fetchCategoryProducts(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <h2>Error: {error}</h2>;
  return (
    <div className="flex flex-col items-center mt-[3%]">
      {items && (
        <Coverflow
          categories={items}
          onItemClick={(item) => handleItemClick(item)}
        />
      )}
    </div>
  );
}
