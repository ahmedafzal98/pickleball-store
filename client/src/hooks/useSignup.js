import { useState } from "react";
export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
    }
  };
  return { signup, error, isLoading };
};
