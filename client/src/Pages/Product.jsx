import SwiperGallery from "../Components/product/SwiperGallery";
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DelieveryIcon from "../assets/icons/icon_delivery.svg";
import ReturnIcon from "../assets/icons/icon_return.svg";
import { useSelector } from "react-redux";

const Product = () => {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  const [activeSize, setActiveSize] = useState();
  const [counter, setCounter] = useState(1);
  const [activeOperator, setActiveOperator] = useState();
  const [affiliateId, setAffiliateId] = useState();

  const campaignID = "5339094537"; // eBay Campaign ID
  const epnParams = "mkcid=1&toolid=10001&mkevt=1";

  const fetchAffiliateId = async () => {
    try {
      const res = await fetch(
        "https://pickleball-store-backend.onrender.com/get-affiliate",
        { method: "GET", credentials: "include" }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAffiliateId(data.affiliateId);
    } catch (err) {
      console.error("Error fetching affiliateId:", err);
    }
  };

  useEffect(() => {
    fetchAffiliateId();
  }, []);

  // 🔗 Generate affiliate link based on source
  let affiliateLink = "";
  if (selectedProduct) {
    if (selectedProduct.source === "amazon") {
      // Amazon product → use itemWebUrl directly
      affiliateLink = selectedProduct.itemWebUrl;
    } else if (selectedProduct.legacyItemId) {
      // eBay product → generate custom affiliate URL
      affiliateLink = `https://www.ebay.com/itm/${
        selectedProduct.legacyItemId
      }?${epnParams}&campid=${campaignID}&customid=${affiliateId || "default"}`;
    } else if (selectedProduct.itemWebUrl?.includes("ebay.com")) {
      // fallback if itemWebUrl exists for eBay
      affiliateLink = `${
        selectedProduct.itemWebUrl
      }&campid=${campaignID}&customid=${affiliateId || "default"}`;
    }
  }

  // 🖼️ Image handling
  const productImage =
    selectedProduct.image_url ||
    selectedProduct.image?.imageUrl ||
    selectedProduct.thumbnailImages?.[0]?.imageUrl ||
    "https://via.placeholder.com/300x300?text=No+Image";

  const productTitle = selectedProduct.title || "Product Title";
  const productPrice = selectedProduct.price?.value || "N/A";
  const productCurrency = selectedProduct.price?.currency || "USD";

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleActiveSize = (index) => setActiveSize(index);
  const handleIncrement = () => {
    setActiveOperator("+");
    setCounter((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setActiveOperator("-");
    setCounter((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <>
      <Navbar />

      <section className="mt-[3%] ml-[3%] w-full h-full xl:flex justify-center gap-[3%]">
        {/* 🖼️ Product Gallery */}
        <div className="w-1/2">
          <SwiperGallery />
        </div>

        {/* 🧾 Product Details */}
        <div className="w-2/3">
          <div className="flex flex-col w-2/5 gap-4">
            <span className="text-white font-semibold text-2xl tracking-widest">
              {productTitle}
            </span>

            <span className="text-[#B9E018] text-3xl font-bold tracking-wide">
              {productPrice !== "N/A"
                ? `$${Number(productPrice).toFixed(2)} ${productCurrency}`
                : "Price Not Available"}
            </span>

            <div className="flex mt-7 items-center">
              <span className="text-white font-medium">Size:</span>
              <div className="flex ml-5 w-1/2 justify-between">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    onClick={() => handleActiveSize(index)}
                    className={`flex w-8 h-8 items-center justify-center rounded-sm border border-white opacity-60 cursor-pointer text-white ${
                      activeSize === index
                        ? "bg-[#B9E018] opacity-100 border-none"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        activeSize === index ? "text-black" : "text-white"
                      } `}
                    >
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex w-4/5 h-11 rounded-sm items-center">
                <div
                  onClick={handleDecrement}
                  className={`${
                    activeOperator === "-" ? "bg-[#B9E018]" : ""
                  } w-10 h-full flex items-center justify-center cursor-pointer border border-white rounded-sm`}
                >
                  <RemoveIcon
                    sx={{
                      color: ` ${activeOperator === "-" ? "black" : "white"}`,
                    }}
                  />
                </div>

                <div className="flex w-20 h-full justify-center items-center">
                  <span className="text-white text-[20px] font-medium">
                    {counter}
                  </span>
                </div>

                <div
                  onClick={handleIncrement}
                  className={`${
                    activeOperator === "+" ? "bg-[#B9E018]" : ""
                  } w-10 h-full flex items-center justify-center cursor-pointer border border-white rounded-sm`}
                >
                  <AddIcon
                    sx={{
                      color: ` ${activeOperator === "+" ? "black" : "white"}`,
                    }}
                  />
                </div>

                {/* 🛒 Buy Now Button */}
                {affiliateLink && (
                  <Button
                    href={affiliateLink}
                    target="_blank"
                    sx={{
                      marginLeft: "20px",
                      backgroundColor: "#B9E018",
                      color: "black",
                      fontWeight: "bold",
                      padding: "10px 25px",
                      "&:hover": { backgroundColor: "#A3CA10" },
                    }}
                    variant="contained"
                  >
                    Buy Now
                  </Button>
                )}
              </div>

              {/* 🚚 Delivery + Return Info */}
              <div className="w-full h-[180px] flex flex-col items-center justify-evenly border rounded-sm mt-[8%] border-[rgba(255,255,255,0.5)]">
                <div className="w-[332px] h-[50px] flex justify-start items-center">
                  <img src={DelieveryIcon} alt="Delivery Icon" />
                  <div className="flex flex-col ml-3">
                    <span className="text-white font-medium text-[16px]">
                      Free Delivery
                    </span>
                    <span className="text-white font-medium text-[12px] mt-2 underline">
                      <a href="">
                        Enter your postal code for Delivery Availability
                      </a>
                    </span>
                  </div>
                </div>

                <div className="w-[100%] h-[1px] bg-white opacity-45"></div>

                <div className="w-[332px] h-[50px] flex justify-start items-center">
                  <img src={ReturnIcon} alt="Return Icon" />
                  <div className="flex flex-col ml-3">
                    <span className="text-white font-medium text-[16px]">
                      Return Delivery
                    </span>
                    <span className="text-white font-medium text-[12px] mt-2">
                      <a href="">Free 30 Days Delivery Returns. Details</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Product;
