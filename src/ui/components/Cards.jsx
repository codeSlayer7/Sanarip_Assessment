import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { useEffect } from "react";
import { customData } from "../../redux/slices/cardSlice";
import { Link } from "react-router-dom";

const Cards = () => {
  const cards = useSelector((state) => state.card.data);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(customData());
  // }, [dispatch]);
  console.log(cards, "cards");
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[100vh]  max-h-[100%]  mb-5">
        {cards.map((el) => (
          <Link to={`/${el.id}`}>
            <Card
              img={el.img}
              title={el.title}
              description={el.description}
              key={el.id}
              id={el.id}
              liked={el.liked}
            />
          </Link>
        ))}
        {!cards.length && (
          <h3 className="absolute justify-center items-center">
            {" "}
            Sorry, No Cards
          </h3>
        )}
      </div>
    </>
  );
};

export default Cards;
