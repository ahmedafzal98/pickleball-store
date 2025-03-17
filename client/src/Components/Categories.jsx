import SwiperCoverflow from "./SwiperCoverflow";
import categoryImages from "../../data/categoryImages";
import allCategories from "../../data/allCategories";

const Categories = () => {
  return (
    <div className="flex flex-col items-center justify-centerm mt-4">
      <SwiperCoverflow
        from="categories"
        data={categoryImages}
        allCategories={allCategories}
        title="All Categories"
      />
    </div>
  );
};
export default Categories;
