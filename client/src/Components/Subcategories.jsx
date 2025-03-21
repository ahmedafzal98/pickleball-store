import { useSelector } from "react-redux";
import SwiperCoverflow from "./SwiperCoverflow";
import { useEffect } from "react";

const Subcategories = ({ items }) => {
  const { selectedCategory } = useSelector((state) => state.products);

  // const subcategories = selectedCategory?.subcategories;
  console.log(selectedCategory);

  // useEffect(() => {
  //   console.log("Updated selectedCategory:", selectedCategory);
  // }, [selectedCategory]);

  console.log(items);

  return selectedCategory ? (
    <div className="flex flex-col items-center mt-[3%]">
      <SwiperCoverflow
        from="subcategories"
        subcategories={selectedCategory.subcategories}
      />
    </div>
  ) : null;
};

export default Subcategories;
