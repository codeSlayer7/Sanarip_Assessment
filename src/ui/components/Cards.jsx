import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useEffect } from "react";
import { customData } from "../../redux/slices/cardSlice";

const Cards = () => {
  const cards = useSelector((state) => state.card.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customData());
  }, [dispatch]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[100vh]  max-h-[100%]  mb-5">
        {cards.map((el) => (
          <Card
            img={el.img}
            title={el.title}
            description={el.description}
            key={el.id}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;
