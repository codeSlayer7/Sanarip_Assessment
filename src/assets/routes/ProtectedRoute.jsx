import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuth(user);
    }
    console.log(user);
    if (!user) {
      navigate("/signUp", { replace: true });
    }
  }, []);

  return children;
};
