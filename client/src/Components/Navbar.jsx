import { Tooltip, Backdrop } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import logo from "../assets/images/logo.png";
import search from "../assets/icons/search.svg";
import cart from "../assets/icons/cart.svg";
import user from "../assets/icons/user.svg";
import { useState } from "react";
import { useEffect } from "react";
const Navbar = () => {
  const [isopen, setIsOpen] = useState(false);

  const options = ["Brands", "Paddles", "Balls", "Shoes", "More", "Deals"];

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isopen]);

  return (
    <nav className="flex flex-col justify-center items-center bg-black p-2">
      <div className="flex justify-around items-center w-4/5 text-white ">
        <img
          className="w-[200px] xl:w-[295px] cursor-pointer hover:scale-125 transition-transform duration-300"
          src={logo}
          alt="Logo"
        />
        <ul className="hidden xl:flex">
          {options &&
            options.map((item) => {
              return (
                <li className="text-base font-sans font-semibold p-3">
                  <a href="">{item}</a>
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
          onClick={() => setIsOpen(!isopen)}
        >
          {isopen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
        </div>
      </div>
      {isopen && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 9 })}
          open={isopen}
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
            {options &&
              options.map((item) => {
                return (
                  <ul className="mt-2.5">
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
