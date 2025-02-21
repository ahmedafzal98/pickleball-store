import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import image1 from "../assets/images/apparel.webp";
import image2 from "../assets/images/apparel2.webp";
import creditCard from "../assets/images/credit-card.png";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const Checkout = () => {
  const order = [
    {
      id: 1,
      image: image1,
      name: "Apparel",
      price: 650,
      quantity: 1,
    },
    {
      id: 2,
      image: image2,
      name: "Apparel",
      price: 650,
      quantity: 2,
    },
  ];
  const styles = (theme) => ({
    radio: {
      "&$checked": {
        color: "#4B8DF8",
      },
    },
    checked: {},
  });
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-2/3 mt-[3%]">
          <span className="text-4xl text-[#B9E018] font-medium">
            Billing Details
          </span>

          <form className="flex justify-between" action="">
            <div className="mt-[2%] flex flex-col">
              <div className="mt-[4%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  First Name*
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="mt-[5%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  Company Name*
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="mt-[5%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  Street Address*
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="mt-[5%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  Appartment, floor, etc (optional)
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="mt-[5%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  Town/City*
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="mt-[5%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  Phone Number*
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="mt-[5%] flex flex-col">
                <label className="text-base text-white opacity-60">
                  Email Address*
                </label>
                <input
                  type="text"
                  className="w-[470px] outline-none text-white pl-3 mt-2 h-12 bg-[#B9E0181F] rounded-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white flex items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    className="w-6 outline-none text-white pl-3 mt-2 h-6"
                  />
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center w-[500px] h-[600px]">
              <div className="w-4/5">
                {order &&
                  order.map((item) => {
                    return (
                      <div className="flex justify-between mt-10">
                        <img src={item.image} className="w-12 h-12" />
                        <span className="text-white">{item.name}</span>
                        <span className="text-white">{item.price}</span>
                      </div>
                    );
                  })}
                <div className="flex justify-between mt-[10%]">
                  <span className="text-base font-normal text-white">
                    Subtotal:
                  </span>
                  <span className="text-base font-normal text-white">
                    $1750
                  </span>
                </div>
                <div className="w-full h-0.5 bg-white mt-4 opacity-50"></div>
                <div className="flex justify-between mt-[5%]">
                  <span className="text-base font-normal text-white">
                    Shipping:
                  </span>
                  <span className="text-base font-normal text-white">Free</span>
                </div>
                <div className="w-full h-0.5 bg-white mt-4 opacity-50"></div>
                <div className="flex justify-between mt-[5%]">
                  <span className="text-base font-normal text-white">
                    Total:
                  </span>
                  <span className="text-base font-normal text-white">
                    $1750
                  </span>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    marginTop: "20px",
                  }}
                >
                  <FormControl>
                    <RadioGroup name="radio-buttons">
                      {/* First Radio Button with Label and Image */}
                      <div className="flex items-center justify-between">
                        <FormControlLabel
                          value="ahmed"
                          control={
                            <Radio
                              sx={{
                                color: "white",
                                "&.Mui-checked": { color: "white" }, // Checked state white color
                              }}
                            />
                          }
                          label="Bank"
                          sx={{ color: "white" }} // Label text white
                        />
                        <img src={creditCard} alt="Credit Card" />
                      </div>

                      {/* Second Radio Button */}
                      <FormControlLabel
                        value="b"
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": { color: "white" }, // Checked state white color
                            }}
                          />
                        }
                        label="Cash On Delievery"
                        sx={{ color: "white" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <div className="flex justify-between mt-3 gap-2">
                  <input
                    className="w-[300px] h-14 text-white pl-3 border border-[#B9E018] outline-none bg-transparent rounded-sm"
                    type="text"
                    placeholder="Coupon Code"
                  />
                  <Button
                    sx={{
                      color: "black",
                      backgroundColor: "#B9E018",
                      height: "56px",
                      width: "211px",
                    }}
                    variant="contained"
                  >
                    Apply Coupon
                  </Button>
                </div>
                <Button
                  sx={{
                    color: "black",
                    marginTop: "30px",
                    backgroundColor: "#B9E018",
                    height: "56px",
                    width: "211px",
                  }}
                  variant="contained"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Checkout;
