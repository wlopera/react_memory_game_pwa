import React, { useEffect, useState } from "react";
import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import { getCards, updateCard } from "../../util/Utilities";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [cardTemp, setCardTemp] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(getCards(data));
  }, [setCards]);

  const handleSetCard = (data) => {
    if (!cardTemp) {
      setCardTemp({ ...data, status: 1 });
      setCards((cards) => updateCard(cards, "position", data.position, 1));
    } else {
      setCards((cards) => updateCard(cards, "position", data.position, 1));
      setDisabled(true);
    }
    setTimeout(() => {
      if (cardTemp && data) {
        if (cardTemp.id === data.id) {
          setCards((cards) => updateCard(cards, "status", 1, 2));
        } else {
          setCards((cards) => updateCard(cards, "status", 1, 0));
        }
        setCardTemp(null);
        setDisabled(false);
        console.log("Listo: ", data);
      }
    }, 500);
  };

  return (
    <div className="container">
      <div className="row">
        {cards.map((data) => (
          <div className="col-3 pe-1 pt-2" key={data.position}>
            <CardInput
              id={data.id}
              name={data.name}
              position={data.position}
              status={data.status}
              onChange={handleSetCard}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
