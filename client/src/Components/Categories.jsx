import SwiperCoverflow from "./SwiperCoverflow";

const Categories = () => {
  return (
    <div className="flex flex-col items-center justify-centerm mt-4">
      <span className="text-white font-semibold text-4xl ">All Categories</span>
      <SwiperCoverflow />
    </div>
  );
};
export default Categories;
