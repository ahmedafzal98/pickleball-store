import SwiperCoverflow from "./SwiperCoverflow";
import categoryImages from "../../data/categoryImages";

const Categories = () => {
  return (
    <div className="flex flex-col items-center justify-centerm mt-4">
      <span className="text-white font-semibold text-base xl:text-4xl">
        All Categories
      </span>
      <SwiperCoverflow from="categories" data={categoryImages} />
    </div>
  );
};
export default Categories;
