import { Rating } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({ data }) => {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  console.log(data);

  return (
    <section>
      <div
        key={data.itemId}
        className="p-3 cursor-pointer hover:transition-transform duration-300"
      >
        <div className="relative">
          <img
            className="h-full"
            style={{
              WebkitBoxReflect:
                "below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05), transparent)",
              filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))",
              transition: "transform 0.3s ease-in-out",
              borderRadius: "10px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            src={data.image.imageUrl}
            alt={data.title}
          />
        </div>
        {/* <div className="flex items-center p-2">
          <Rating name="half-rating" value={data.rating} precision={1} />
          <span className="text-white opacity-60 text-base xl:text-1xl">
            (1,203)
          </span>
        </div> */}
        <div className="max-w-md">
          <span className="font-semibold text-base xl:text-2xl text-white whitespace-normal break-words line-clamp-4">
            {data.title}
          </span>
        </div>

        <div className="flex items-center gap-2 p-2">
          <span className="text-[#B9E018] font-bold text-base xl:text-2xl">
            ${data.price.value}
          </span>
          {/* <span className="text-white font-normal text-base xl:text-1xl opacity-60 line-through">
            $350.99
          </span> */}
        </div>
      </div>
    </section>
  );
};
export default Product;
