import arrowOutward from "../../assets/icons/arrow_outward.svg";

const Button = ({ title, backgroundColor, textColor, isIcon }) => {
  return (
    <div
      className={`flex ${backgroundColor} justify-center items-center gap-2  text-[${textColor}] w-[150px] xl:w-[230px] h-14 border-1 border-[#B9E018] rounded-3xl mt-6`}
    >
      <button className="cursor-pointer">{title}</button>

      {isIcon && <img src={arrowOutward} alt="Arrow Outward" />}
    </div>
  );
};
export default Button;
