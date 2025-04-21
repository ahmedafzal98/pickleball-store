import SwiperCoverflow from "./SwiperCoverflow";
import categoryImages from "../../data/categoryImages";
import allCategories from "../../data/allCategories";
import categories from "../../data/categories";
import CustomSwiper from "./CustomSwiper";

const Categories = () => {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      {/* <SwiperCoverflow
        from="categories"
        data={categoryImages}
        allCategories={categories}
        title="All Categories"
      /> */}

      <CustomSwiper allCategories={categories} />
    </div>
  );
};
export default Categories;
