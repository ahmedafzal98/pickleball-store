import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import image1 from "../assets/images/apparel.webp";
import image2 from "../assets/images/apparel2.webp";
import Counter from "../Components/Counter";
import { useState } from "react";
import { Badge, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
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
  ]);
  const cartOptions = ["Image", "Product", "Price", "Quantity", "SubTotal"];

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((cart) => {
        if (cart.id === id) {
          return { ...cart, quantity: cart.quantity + 1 };
        } else {
          return cart;
        }
      })
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((cart) => {
        if (cart.id === id) {
          return { ...cart, quantity: cart.quantity - 1 };
        } else {
          return cart;
        }
      })
    );
  };

  const handleBadgeClick = (id) => {
    setCartItems(cartItems.filter((cart) => cart.id !== id));
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-2/3 mt-8">
          <span className="text-4xl text-[#B9E018]">Cart</span>

          {/* Table Structure */}
          <div className="mt-[5%]">
            {/* Table Header */}
            <div className="grid grid-cols-5 h-[70px] items-center bg-[#B9E0181F] py-2 px-4 rounded-sm ">
              {cartOptions &&
                cartOptions.map((option, index) => (
                  <span
                    key={index}
                    className="text-white text-base font-semibold text-center"
                  >
                    {option}
                  </span>
                ))}
            </div>
            <div className="mt-5 text-center">
              {cartItems.length === 0 && (
                <span className="text-white font-bold text-4xl">
                  No Items in Cart
                </span>
              )}
            </div>
            {cartItems &&
              cartItems.map((cart, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 bg-[#B9E0181F] py-3 px-4 mt-[3%] rounded-sm items-center"
                >
                  <div className="relative flex justify-center mt-3">
                    <Badge
                      onClick={() => handleBadgeClick(cart.id)}
                      sx={{ cursor: "pointer" }}
                      badgeContent="X"
                      color="error"
                      className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2"
                    >
                      <img
                        className="w-12 h-12"
                        src={cart.image}
                        alt="Product"
                      />
                    </Badge>
                  </div>

                  <span className="text-white text-center">{cart.name}</span>
                  <span className="text-white text-center">{`$${cart.price}`}</span>
                  <div className="flex justify-center">
                    <Counter
                      id={cart.id}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      quantity={cart.quantity}
                    />
                  </div>
                  <span className="text-white text-center">
                    {`$${cart.quantity * cart.price}`}
                  </span>
                </div>
              ))}
          </div>
          <Button
            sx={{
              width: "218px",
              height: "56px",
              marginTop: "3%",
              border: "1px solid #B9E018",
              color: "white",
            }}
            variant="outlined"
          >
            Return To Shop
          </Button>

          <div className="flex justify-between mt-[5%] bg-[#B9E0181F] w-[527px] h-[56px]">
            <input
              className="text-white w-[300px] h-full pl-2"
              type="text"
              placeholder="Coupon Code"
            />
            <Button
              sx={{
                height: "auto",
                width: "211px",
                backgroundColor: "#B9E018",
                color: "black",
              }}
              variant="contained"
            >
              Apply Coupon
            </Button>
          </div>
          <div className="w-[470px] h-[324px] float-right">
            <span className="text-white text-2xl font-medium">Cart Total</span>
            <div className="flex justify-between mt-[5%]">
              <span className="text-base font-normal text-white">
                Subtotal:
              </span>
              <span className="text-base font-normal text-white">$1750</span>
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
              <span className="text-base font-normal text-white">Total:</span>
              <span className="text-base font-normal text-white">$1750</span>
            </div>
            <div className="flex justify-center items-center">
              <Link to="/checkout">
                <Button
                  sx={{
                    width: "260px",
                    height: "56px",
                    marginTop: "20px",
                    color: "black",
                    backgroundColor: "#B9E018",
                  }}
                  variant="contained"
                >
                  Process To Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
