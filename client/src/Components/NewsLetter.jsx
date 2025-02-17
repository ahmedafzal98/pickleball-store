import email from "../assets/icons/email.svg";
const NewsLetter = () => {
  return (
    <section className="w-full flex justify-center mt-[5%]">
      <div className="bg-[#B9E018] w-4/5 h-[333px] rounded-4xl flex flex-col justify-center items-center opacity-80">
        <span className="font-bold text-[20px] xl:text-4xl">
          Subscribe to our newsletter
        </span>
        <span className="font-normal text-base text-black opacity-60 mt-2 text-center p-3">
          Please sign up so you will receive exclusive offers, steal deals and
          discounts especially for you.
        </span>
        <div className="flex items-center justify-between w-4/5 md:w-3/5 xl:w-1/5 h-16 rounded-3xl bg-white p-2">
          <img src={email} alt="Email" className="h-6 w-6 mr-2" />

          <input
            className="h-full w-full px-3 rounded-3xl border-none outline-none"
            type="text"
            placeholder="Enter Your Email Address"
          />

          <div className="bg-black h-12 w-[119px] rounded-3xl p-2 text-white flex justify-center items-center">
            <button className="text-sm font-semibold cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NewsLetter;
