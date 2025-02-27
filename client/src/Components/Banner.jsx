import { Link } from "react-router-dom";
import Button from "./Button";
import SearchBar from "./SearchBar";

const Banner = () => {
  return (
    <>
      <div className="bg-[#B9E018] opacity-50 h-[0.5px] w-full]"></div>
      <section className="flex flex-col items-center">
        <div className="flex flex-col items-center w-4/5">
          <span className="sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-normal text-[#B9E018] p-4">
            Shop easily, quickly, and stylishly
          </span>
          <span className="xl:w-3/5 sm:w-4/5 flex justify-center text-center sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] font-normal text-white">
            NEW! CRBN TruFoam Genesis Pickleball Paddles
          </span>
          <SearchBar />`
          <div className="flex space-x-4">
            <Link to="/cart">
              <Button title="CART" backgroundColor="bg-[#B9E018]" />
            </Link>
            <Button title="ABOUT US" textColor="#B9E018" isIcon="true" />
          </div>
          `
        </div>
      </section>
    </>
  );
};

export default Banner;
