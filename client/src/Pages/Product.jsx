import SwiperGallery from "../Components/SwiperGallery";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Button, Rating } from "@mui/material";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DelieveryIcon from "../assets/icons/icon_delivery.svg";
import ReturnIcon from "../assets/icons/icon_return.svg";
import SwiperCoverflow from "../Components/SwiperCoverflow";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Product = () => {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  const { legacyItemId } = selectedProduct;
  const campaignID = "5339094537";

  const sizes = ["XS", "S", "M", "L", "XL"];

  const [activeSize, setActiveSize] = useState();
  const [counter, setCounter] = useState(0);
  const [activeOperator, setActiveOperator] = useState();
  const [affiliateId, setAffiliateId] = useState();

  const epnParams =
    "mkcid=1&campid=5339094537&customid=testClick&toolid=10001&mkevt=1";

  const handleActiveSize = (index) => {
    setActiveSize(index);
  };
  const handleIncrement = () => {
    setActiveOperator("+");
    setCounter((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setActiveOperator("-");
    setCounter((prevCount) => prevCount - 1);
  };

  const fetchAffiliateId = async () => {
    try {
      const res = await fetch(
        "https://pickleball-store-backend.onrender.com/get-affiliate",
        {
          method: "GET",
          credentials: "include", // ✅ ensures cookies are sent
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAffiliateId(data.affiliateId);
    } catch (err) {
      console.error("Error fetching affiliateId:", err);
    }
  };

  useEffect(() => {
    fetchAffiliateId();
  }, []);

  const affiliateLink = affiliateId
    ? `https://www.ebay.com/itm/${legacyItemId}?campid=${campaignID}&customid=${affiliateId}`
    : null;

  console.log(affiliateLink);

  return (
    <>
      <Navbar />

      <section className="mt-[3%] ml-[3%] w-full h-full xl:flex justify-center gap-[3%]">
        <div className="w-1/2">
          <SwiperGallery />
        </div>
        <div className="w-2/3">
          <div className="flex flex-col w-2/5 gap-4">
            <span className="text-white font-semibold text-2xl tracking-widest">
              {selectedProduct.title}
            </span>
            {/* <div className="flex w-3/4 justify-between">
              <Rating defaultValue={5} />
              <span className="text-white font-normal text-[14px] opacity-60">
                (150 Reviews)
              </span>
              <span>|</span>
              <span className="text-[#B9E018] font-normal text-[14px] opacity-60">
                In Stock
              </span>
            </div> */}
            <span className="text-white text-2xl font-normal">
              {`$${selectedProduct.price.value}`}
            </span>
            {/* <div className="w-100 h-20 overflow-auto">
              <span className="text-white whitespace-normal">
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </span>
            </div> */}
            <div className="flex mt-7 items-center">
              <span className="text-white fon">Size:</span>
              <div className="flex ml-5 w-1/2 justify-between">
                {sizes &&
                  sizes.map((size, index) => {
                    return (
                      <div
                        onClick={() => handleActiveSize(index)}
                        className={`flex w-8 h-8 items-center justify-center rounded-sm border border-white opacity-50 cursor-pointer text-white ${
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
                    );
                  })}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex w-4/5 h-11 rounded-sm">
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
                {/* <div className="w-[1px] h-full bg-white"></div> */}
                <div className="flex w-20 h-full justify-center items-center">
                  <span className="text-white text-[20px] font-medium">
                    {counter}
                  </span>
                </div>
                {/* <div className="w-[1px] h-full bg-white"></div> */}
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
                {/* <div className="w-[1px] h-full bg-white"></div> */}
                {affiliateLink && (
                  <Button
                    href={affiliateLink}
                    target="_blank"
                    sx={{
                      marginLeft: "20px",
                      backgroundColor: "#B9E018",
                      color: "black",
                    }}
                    variant="contained"
                  >
                    Buy Now
                  </Button>
                )}
              </div>
              <div className="w-full h-[180px] flex flex-col items-center justify-evenly border rounded-sm mt-[8%] border-[rgba(255,255,255,0.5)]">
                <div className="w-[332px] h-[50px] flex justify-start items-center">
                  <div className="flex">
                    <img src={DelieveryIcon} alt="Delievery Icon" srcset="" />
                  </div>
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
                  <div className="flex">
                    <img src={ReturnIcon} alt="Delievery Icon" srcset="" />
                  </div>
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
      <section className="flex flex-col">
        <div className="w-2/5 ml-[5%] flex items-center gap-6 mt-[5%]">
          <div className="w-5 h-10 rounded-md bg-[#B9E018]"></div>
          <span className="text-[16px] text-[#B9E018] font-semibold">
            Related Item
          </span>
        </div>
        <SwiperCoverflow />
      </section>
      <Footer />
    </>
  );
};
export default Product;
