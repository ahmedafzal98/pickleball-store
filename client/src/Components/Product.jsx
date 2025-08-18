import { useSelector } from "react-redux";

const Product = ({ data }) => {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  if (!data) return null;

  return (
    <div className="w-full max-w-sm mx-auto bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-black/30 transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square p-3 sm:p-4">
        <img
          src={data.image?.imageUrl}
          alt={data.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-out group-hover:scale-105"
          style={{
            WebkitBoxReflect:
              "below 8px linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.03), transparent)",
            filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.4))",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="px-4 pb-4 space-y-3">
        {/* Title */}
        <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-[#B9E018] transition-colors duration-200">
          {data.title}
        </h3>

        {/* Price and View Button */}
        <div className="flex items-center justify-between">
          <span className="text-[#B9E018] font-bold text-base sm:text-lg lg:text-xl">
            ${data.price?.value}
          </span>
          <button className="bg-[#B9E018] text-black px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-[#a0c916] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
