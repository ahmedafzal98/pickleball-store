import { Button, TextField } from "@mui/material";
import authLogo from "../assets/images/auth-img.png";
import googleIcon from "../assets/icons/Icon-Google.svg";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="lg:flex items-center ml-[10%] h-screen">
      <img className="w-fit h-fit" src={authLogo} alt="" srcset="" />
      <div className="flex flex-col ml-[10%] md:mt-4">
        <span className="text-[#B9E018] text-4xl font-medium">
          Create an account
        </span>
        <span className="text-[#B9E018] text-base font-normal mt-3">
          Enter your details below
        </span>
        <TextField
          variant="standard"
          label="Name"
          sx={{
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
          sx={{
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
          sx={{
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
            width: "370px",
            backgroundColor: "#B9E018",
            color: "black",
            marginRight: "20px",
            fontSize: "16px",
            fontWeight: 400,
          }}
          variant="contained"
        >
          Create Account
        </Button>
        <Button
          sx={{
            marginTop: "20px",
            width: "370px",
            display: "flex",
            justifyContent: "space-evenly",
            marginRight: "20px",
            alignItems: "center",
            border: "1px solid #B9E018",
            color: "white",
            fontSize: "16px",
          }}
          variant="outlined"
        >
          <img src={googleIcon} alt="Google Icon" srcset="" />
          Sign up with Google
        </Button>
        <div className="flex text-whiteitems-center justify-center text-white opacity-50 mt-2">
          <span>Already have account ? </span>
          <span>
            <Link to="/login" href="">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Signup;
