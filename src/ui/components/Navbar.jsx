import {
  Favorite,
  FavoriteBorderOutlined as FavoriteLined,
  // FavoriteOutlined as FavoriteFilled,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";
import { MenuComp } from "./Menu";
import { Container, IconButton } from "@mui/material";
import DropDown from "./DropDown";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { favorites } from "../../redux/slices/cardSlice";
import { logout } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

export const Navbar = ({ children }) => {
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuth(user);
    }
  }, []);
  const getOptionFunc = (option) => {
    if (option === "Favorites") {
      dispatch(favorites());
    } else if (option === "Profile") {
      navigate("Profile", { replace: true });
    } else if (option === "Sign up") {
      navigate("/signUp", { replace: true });
    } else if (option === "Log out") {
      dispatch(logout());
      navigate("/signIn", { replace: true });
    }
  };
  return (
    <>
      <div className="w-[100vw] h-[10vh] px-[3vw] mb-[10vh] bg-slate-800 flex  items-center justify-between">
        <Link to="/">
          <h2 className="text-2xl text-slate-200">Sanarip Dolboor</h2>
        </Link>
        <div className="hidden md:flex">
          <IconButton>
            <DropDown
              label={<ProfileIcon style={{ fontSize: "50px" }} />}
              onOptionClick={(option) => getOptionFunc(option)}
              options={[
                ...(typeof isAuth === "boolean" ? [] : ["Profile"]),
                "Favorites",
                ...(typeof isAuth === "boolean" ? ["Sign Up"] : ["Log out"]),
              ]}
            />
          </IconButton>
        </div>
        <div className="md:hidden">
          <MenuComp />
        </div>
      </div>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};
