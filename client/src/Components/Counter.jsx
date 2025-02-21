import { useEffect } from "react";
import dropDownIcon from "../assets/icons/Drop-Down-Small.svg";
import dropUpIcon from "../assets/icons/Drop-Up-Small.svg";

const Counter = ({ id, increaseQuantity, decreaseQuantity, quantity }) => {
  const handleIncreaseQuantity = () => {
    increaseQuantity(id);
  };
  const handleDecreaseQuantity = () => {
    decreaseQuantity(id);
  };
  return (
    <div className="w-[72px] h-[44px] border-1 border-white rounded-sm opacity-70 flex items-center justify-evenly">
      <span className="text-white">{quantity}</span>
      <div className="flex flex-col">
        <img
          src={dropUpIcon}
          alt="Drop Up Icon"
          onClick={handleIncreaseQuantity}
        />
        <img
          src={dropDownIcon}
          alt="Drop Down Icon"
          onClick={handleDecreaseQuantity}
        />
      </div>
    </div>
  );
};
export default Counter;
