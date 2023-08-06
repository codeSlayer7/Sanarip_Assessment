import { FavoriteBorderOutlined } from "@mui/icons-material";
import useMediaQuery from "../../hook/useMeduaQuery";
import { useDispatch } from "react-redux";
import { likedItem } from "../../redux/slices/cardSlice";

export const Card = ({ img, title, description, id, liked }) => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 960px)");
  return (
    <div>
      <div className="w-[100%] h-[30vh]  ">
        <div className="w-full h-full relative">
          {!liked ? (
            <div
              className="absolute left-[85%] md:left-[88%] top-[2%] hover:opacity-50"
              onClick={() =>
                dispatch(
                  likedItem({
                    id,
                  })
                )
              }
            >
              <FavoriteBorderOutlined
                style={{
                  fontSize: isDesktop ? "40px" : "50px",
                  color: "white",
                }}
              />
            </div>
          ) : (
            <div
              onClick={() =>
                dispatch(
                  likedItem({
                    id,
                  })
                )
              }
              className="absolute left-[85%] md:left-[88%] top-[2%] hover:opacity-50 "
            >
              <FavoriteBorderOutlined
                style={{
                  fontSize: isDesktop ? "40px" : "50px",
                  color: "#EE4B2B",
                  textShadow: " white 2px 5px",
                }}
              />
            </div>
          )}

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
