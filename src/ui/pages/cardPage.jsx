import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CardPage = () => {
  const { id } = useParams();
  const card = useSelector((state) =>
    state.card.data.find((el) => el.id === id)
  );

  return (
    <div className=" flex justify-center flex-col items-center">
      <div className="px-2  ">
        <h2 className="font-medium text-lg">{card.title}</h2>
        <span>{card.description}</span>
        <h1> {card.title}</h1>
      </div>
      <div className="w-[90%] h-[70%]  ">
        <img src={card.img} className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default CardPage;
