import { Rating } from "@mui/material";

const Product = ({ data }) => {
  return (
    <section>
      <div
        key={data.id}
        className="p-3 cursor-pointer hover:transition-transform duration-300"
      >
        <div className="relative">
          <div className="absolute top-0 left-0 bg-[#E04243] text-white text-base p-0.5 xl:p-2">
            <span>Sale</span>
          </div>

          <img
            className="rounded-2xl w-[300px] h-auto md:w-auto"
            src={data.image}
            alt={data.name} // Use meaningful alt text
          />
        </div>
        <div className="flex items-center p-2">
          <Rating name="half-rating" value={data.rating} precision={1} />
          <span className="text-white opacity-60 text-base xl:text-2xl">
            (1,203)
          </span>
        </div>
        <span className="font-semibold text-base lg:text-3xl xl:text-4xl text-white">
          {data.name}
        </span>
        <div className="flex items-center gap-2 p-2">
          <span className="text-[#B9E018] font-bold xl:text-[28px]">
            ${data.price}
          </span>
          <span className="text-white font-normal xl:text-[26px] opacity-60 line-through">
            $350.99
          </span>
        </div>
      </div>
    </section>
  );
};
export default Product;
