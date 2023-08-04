import { FavoriteBorderOutlined } from "@mui/icons-material";
import useMediaQuery from "../../hook/useMeduaQuery";

/* eslint-disable react/prop-types */
const Card = ({ img, title, description } ) => {
  
  const isDesktop = useMediaQuery("(min-width: 960px)");
  return (
    <div>
      <div className="w-[100%] h-[30vh]  ">
        <div className="w-full h-full relative">
          <div className="absolute left-[85%] md:left-[88%] top-[2%] hover:opacity-50">
            <FavoriteBorderOutlined
              style={{ fontSize: isDesktop ? "40px" : "50px", color: "white" }}
            />
          </div>
          <img src={img} className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="px-2">
        <h2 className="font-medium text-lg">{title}</h2>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default Card;
