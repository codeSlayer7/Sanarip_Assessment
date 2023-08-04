import {
  FavoriteBorderOutlined as FavoriteLined,
  // FavoriteOutlined as FavoriteFilled,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";
import { MenuComp } from "./Menu";
import { Container, IconButton } from "@mui/material";
import DropDown from "./DropDown";


export const Navbar = ({ children }) => {
  return (
    <>
      <div className="w-[100vw] h-[10vh] px-[3vw] mb-[10vh] bg-slate-800 flex  items-center justify-between">
        <h2 className="text-2xl text-slate-200">Sanarip Dolboor</h2>

        <div className="hidden md:flex">
       
          <IconButton>
            
            <DropDown
            label={<ProfileIcon style={{ fontSize: "50px" }} />}
            onOptionClick={(option) => console.log(option)}
            options={['Profile', 'Favorites']}
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
