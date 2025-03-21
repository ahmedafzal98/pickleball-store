import { Button, TextField } from "@mui/material";
import authLogo from "../assets/images/auth-img.png";
import googleIcon from "../assets/icons/Icon-Google.svg";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    console.log("Handle Submit");

    e.preventDefault();

    await signup(email, password);

    console.log(error);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="lg:flex items-center justify-center gap-10 h-screen overflow-x-hidden">
        <img className="w-fit h-fit" src={authLogo} alt="" srcset="" />
        <div className="flex flex-col md:mt-4 ml-4">
          <span className="text-[#B9E018] xl:text-4xl text-3xl font-medium">
            Create an account
          </span>
          <span className="text-[#B9E018] text-base font-normal mt-3">
            Enter your details below
          </span>
          <TextField
            variant="standard"
            label="Name"
            sx={{
              color: "white",
              marginRight: "20px",
              marginTop: "20px",
              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
                opacity: 0.42,
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "white",
                opacity: 0.42,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
                opacity: 0.42,
              },
              "& .MuiInputLabel-root": { color: "white", opacity: 0.42 }, // Label color
              "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Label color when focused
            }}
          />
          <TextField
            variant="standard"
            label="Email or Phone Number"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              color: "white",
              marginTop: "20px",
              marginRight: "20px",
              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
                opacity: 0.42,
              }, // Default state
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "white",
                opacity: 0.42,
              }, // Hover state
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
                opacity: 0.42,
              }, // Focus state
              "& .MuiInputLabel-root": { color: "white", opacity: 0.42 }, // Label color
              "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Label color when focused
            }}
          />
          <TextField
            variant="standard"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              color: "white",
              marginTop: "20px",
              marginRight: "20px",
              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
                opacity: 0.42,
              }, // Default state
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "white",
                opacity: 0.42,
              }, // Hover state
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
                opacity: 0.42,
              }, // Focus state
              "& .MuiInputLabel-root": { color: "white", opacity: 0.42 }, // Label color
              "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Label color when focused
            }}
          />
          <Button
            sx={{
              marginTop: "20px",
              backgroundColor: "#B9E018",
              color: "black",
              marginRight: "20px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Create Account
          </Button>
          <Button
            sx={{
              marginTop: "20px",
              display: "flex",
              marginRight: "20px",
              alignItems: "center",
              border: "1px solid #B9E018",
              color: "white",
              fontSize: "16px",
            }}
            variant="outlined"
          >
            <img src={googleIcon} alt="Google Icon" className="mr-3" />
            Sign up with Google
          </Button>
          <div className="flex text-whiteitems-center justify-center text-white opacity-50 mt-2 mb-4">
            <span>Already have account ? </span>
            <span>
              <Link to="/login" href="">
                Login
              </Link>
            </span>
          </div>

          {error && <p className="font-bold text-red-700">{error}</p>}
        </div>
      </div>
    </form>
  );
};
export default Signup;
