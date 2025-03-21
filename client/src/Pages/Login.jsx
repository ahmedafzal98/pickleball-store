import { Button, TextField } from "@mui/material";
import authLogo from "../assets/images/auth-img.png";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <div className="lg:flex items-center justify-center h-screen gap-10 overflow-x-hidden">
      <img className="w-fit h-fit" src={authLogo} alt="" srcset="" />
      <div className="flex flex-col ml-4 mr-4">
        <span className="text-[#B9E018] text-3xl xl:text-4xl font-medium">
          Log in to Exclusive
        </span>
        <span className="text-[#B9E018] text-base font-normal mt-4">
          Enter your details below
        </span>
        <TextField
          variant="standard"
          label="Email or Phone Number"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginTop: "20px",
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
            }, // Focus state
            "& .MuiInputLabel-root": { color: "white", opacity: 0.42 },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        />
        <div className="flex justify-between items-center mt-3">
          {!isLoading && (
            <Button
              onClick={handleSubmit}
              sx={{
                width: "30%",
                marginTop: "20px",
                backgroundColor: "#B9E018",
                color: "black",
                fontSize: "16px",
                fontWeight: 400,
              }}
              variant="contained"
            >
              Login
            </Button>
          )}
          <span className="text-[#B9E018] text-base font-normal mt-2">
            <Link to="/forget-password"> Forget Password?</Link>
          </span>
        </div>

        {error && <p className="font-bold text-red-700">{error}</p>}
      </div>
    </div>
  );
};
export default Login;
