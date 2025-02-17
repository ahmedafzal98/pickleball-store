import { Rating } from "@mui/material";
import product from "../assets/images/product1.png";
import RatingComponent from "./Rating";

const Product = () => {
  return (
    <section>
      <div className="p-3 cursor-pointer hover:transition-transform duration-300">
        <div className="relative">
          <div className="absolute top-0 left-0 bg-[#E04243] text-white p-2">
            <span>Sale</span>
          </div>

          <img
            className="rounded-2xl w-[300px] h-auto md:w-auto"
            src={product}
            alt="Product"
          />
        </div>
        <div className="flex items-center p-2">
          <Rating name="half-rating" defaultValue={5} precision={1} />
          <span className="text-white opacity-60 text-base xl:text-2xl">
            (1.203)
          </span>
        </div>{" "}
        <span className="font-semibold text-base lg:text-3xl xl:text-4xl text-white">
          CRBN3X Power Series Pickleball Paddle
        </span>
        <div className="flex items-center gap-2 p-2">
          <span className="text-[#B9E018] font-bold xl:text-[28px]">
            $229.99
          </span>
          <span className="text-white font-normal xl:text-[ 26px] opacity-60">
            $350.99
          </span>
        </div>
      </div>
    </section>
  );
};
export default Product;
