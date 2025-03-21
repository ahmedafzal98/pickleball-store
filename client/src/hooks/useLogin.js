import { useState } from "react";
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:3000/api/user/login", {
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
      isLoading(false);
    }
  };
  return { login, error, isLoading };
};
