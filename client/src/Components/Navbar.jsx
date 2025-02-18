import { Tooltip, Backdrop } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import logo from "../assets/images/logo.png";
import search from "../assets/icons/search.svg";
import cart from "../assets/icons/cart.svg";
import user from "../assets/icons/user.svg";
import { useState, useEffect } from "react";
import categories from "../../data/categories";
import allCategories from "../../data/allCategories";
import CategoryIcon from "@mui/icons-material/Category";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const options = ["Brands", "Paddles", "Balls", "Shoes", "More", "Deals"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleAllCategoriesMouseEnter = () => {
    setShowAllCategories(true);
  };

  const handleAllCategoriesMouseLeave = () => {
    setShowAllCategories(false);
  };

  return (
    <nav className="flex flex-col justify-center items-center bg-black p-2">
      <div className="flex justify-around items-center w-4/5 text-white">
        <img
          className="w-[200px] xl:w-[295px] cursor-pointer hover:scale-125 transition-transform duration-300"
          src={logo}
          alt="Logo"
        />
        <ul className="hidden xl:flex">
          <li
            className="relative text-base font-sans font-semibold p-3"
            onMouseEnter={handleAllCategoriesMouseEnter}
            onMouseLeave={handleAllCategoriesMouseLeave}
            style={{ position: "static", overscrollBehavior: "contain" }} // 👈 Add this
          >
            <Tooltip title="All Categories">
              <CategoryIcon className="cursor-pointer" />
            </Tooltip>

            {/* Mega Menu */}
            {showAllCategories && (
              <div className="fixed left-0 right-0 top-[92px] w-full bg-black shadow-lg p-6 transition-all duration-300 ease-in-out opacity-100 max-h-[500px] overflow-y-auto z-50">
                <div className="container mx-auto">
                  {" "}
                  {/* 👈 Add a container for alignment */}
                  <div className="grid grid-cols-6 gap-3">
                    {allCategories.map((item, index) => (
                      <span
                        key={index}
                        className="text-white block p-3 rounded-md text-base font-semibold opacity-80 hover:bg-[#B9E018] cursor-pointer transition-all duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>

          {Object.keys(categories).map((category) => {
            return (
              <li
                key={category}
                className="relative text-base font-sans font-semibold p-3 group"
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href=""
                  className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[#B9E018] after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:bottom-[-4px]"
                >
                  {category}
                </a>
                {activeCategory === category && (
                  <div className="absolute top-full left-0 bg-black rounded-lg shadow-lg p-4 space-y-2 w-[200px] max-h-[300px] overflow-y-auto transition-all duration-300 ease-in-out opacity-100 transform translate-y-0">
                    {categories[category].map((item, index) => (
                      <span
                        key={index}
                        className="text-white block p-2 rounded-md opacity-80 hover:bg-[#A8D60F] cursor-pointer transition-all duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden xl:flex gap-10">
          <span className="text-base font-sans font-semibold">
            (123) 456 7890
          </span>

          <Tooltip title="Search">
            <img
              className="cursor-pointer hover:scale-125 transition-transform duration-300"
              src={search}
            />
          </Tooltip>

          <Tooltip title="Shopping Cart">
            <img
              className="cursor-pointer hover:scale-125 transition-transform duration-300"
              src={cart}
            />
          </Tooltip>

          <Tooltip title="Signup">
            <img
              className="cursor-pointer hover:scale-125 transition-transform duration-300"
              src={user}
            />
          </Tooltip>
        </div>
        <div
          className="xl:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
        </div>
      </div>

      {isOpen && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 9 })}
          open={isOpen}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div className="bg-black w-full absolute top-15 h-auto flex flex-col items-center shadow-amber-200">
            <div className="w-2/5 flex justify-evenly mt-3.5">
              <span className="text-base font-sans font-semibold">
                (123) 456 7890
              </span>

              <Tooltip title="Search">
                <img
                  className="cursor-pointer hover:scale-125 transition-transform duration-300"
                  src={search}
                />
              </Tooltip>

              <Tooltip title="Shopping Cart">
                <img
                  className="cursor-pointer hover:scale-125 transition-transform duration-300"
                  src={cart}
                />
              </Tooltip>

              <Tooltip title="Signup">
                <img
                  className="cursor-pointer hover:scale-125 transition-transform duration-300"
                  src={user}
                />
              </Tooltip>
            </div>
            {options.map((item, index) => {
              return (
                <ul key={index} className="mt-2.5">
                  <li className="text-base font-sans font-semibold p-3">
                    <a href="">{item}</a>
                  </li>
                </ul>
              );
            })}
          </div>
        </Backdrop>
      )}
    </nav>
  );
};

export default Navbar;
