import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";

import image1 from "../assets/images/apparel.webp";
import image2 from "../assets/images/apparel2.webp";
import creditCard from "../assets/images/credit-card.png";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#B9E018] font-medium">
              Billing Details
            </h1>
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Billing Details Form - Left Side */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                    First Name*
                  </label>
                  <input
                    type="text"
                    className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                  Street Address*
                </label>
                <input
                  type="text"
                  className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                  placeholder="House number and street name"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                  Apartment, suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                    Town/City*
                  </label>
                  <input
                    type="text"
                    className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm sm:text-base text-white opacity-60 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  className="w-full outline-none text-white pl-3 py-3 h-12 bg-[#B9E0181F] rounded-sm focus:bg-[#B9E0182F] transition-colors"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-1 accent-[#B9E018] bg-transparent border-white"
                  id="save-info"
                />
                <label
                  htmlFor="save-info"
                  className="text-sm sm:text-base text-white cursor-pointer"
                >
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:pl-8">
              <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-lg">
                <h2 className="text-xl sm:text-2xl text-white font-medium mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order &&
                    order.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
                            alt={item.name}
                          />
                          <div>
                            <span className="text-white text-sm sm:text-base">
                              {item.name}
                            </span>
                            <div className="text-white/60 text-xs sm:text-sm">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <span className="text-white font-medium">
                          ${item.price}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 border-t border-white/20 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-white">
                      Subtotal:
                    </span>
                    <span className="text-sm sm:text-base text-white font-medium">
                      $1750
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-white">
                      Shipping:
                    </span>
                    <span className="text-sm sm:text-base text-[#B9E018]">
                      Free
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg text-white font-medium">
                        Total:
                      </span>
                      <span className="text-base sm:text-lg text-[#B9E018] font-bold">
                        $1750
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <Box sx={{ marginTop: "24px" }}>
                  <FormControl component="fieldset" className="w-full">
                    <RadioGroup name="payment-method" defaultValue="bank">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border border-white/20 rounded-lg">
                          <FormControlLabel
                            value="bank"
                            control={
                              <Radio
                                sx={{
                                  color: "white",
                                  "&.Mui-checked": { color: "#B9E018" },
                                }}
                              />
                            }
                            label="Bank Transfer"
                            sx={{
                              color: "white",
                              "& .MuiFormControlLabel-label": {
                                fontSize: { xs: "14px", sm: "16px" },
                              },
                            }}
                          />
                          <img
                            src={creditCard}
                            alt="Credit Card"
                            className="h-6 sm:h-8"
                          />
                        </div>

                        <div className="p-3 border border-white/20 rounded-lg">
                          <FormControlLabel
                            value="cod"
                            control={
                              <Radio
                                sx={{
                                  color: "white",
                                  "&.Mui-checked": { color: "#B9E018" },
                                }}
                              />
                            }
                            label="Cash On Delivery"
                            sx={{
                              color: "white",
                              "& .MuiFormControlLabel-label": {
                                fontSize: { xs: "14px", sm: "16px" },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </Box>

                {/* Coupon Code */}
                <div className="mt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      className="flex-1 h-12 sm:h-14 text-white pl-3 pr-3 border border-[#B9E018] outline-none bg-transparent rounded-sm focus:border-[#B9E018] focus:ring-1 focus:ring-[#B9E018]"
                      type="text"
                      placeholder="Coupon Code"
                    />
                    <Button
                      sx={{
                        color: "black",
                        backgroundColor: "#B9E018",
                        height: { xs: "48px", sm: "56px" },
                        minWidth: { xs: "100%", sm: "140px" },
                        fontSize: { xs: "14px", sm: "16px" },
                        fontWeight: "600",
                        "&:hover": {
                          backgroundColor: "#A5CC16",
                        },
                      }}
                      variant="contained"
                    >
                      Apply Coupon
                    </Button>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  sx={{
                    color: "black",
                    marginTop: "24px",
                    backgroundColor: "#B9E018",
                    height: { xs: "48px", sm: "56px" },
                    width: "100%",
                    fontSize: { xs: "16px", sm: "18px" },
                    fontWeight: "700",
                    "&:hover": {
                      backgroundColor: "#A5CC16",
                    },
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
