import React, { useEffect, useState } from "react";
import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import { getCards, updateCard } from "../../util/Utilities";
import {
  CARD_UP,
  CARD_DOWN,
  CARD_BACKGROUND,
  options,
} from "../../util/Constants";

const Board = () => {
  const [amountCards, setAmountCards] = useState(16);
  const [cards, setCards] = useState([]);
  const [cardTemp, setCardTemp] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [attemps, setAttemps] = useState(0);

  useEffect(() => {
    setCards(getCards(data, amountCards));
  }, [setCards, amountCards]);

  const handleSetCard = (data) => {
    if (!cardTemp) {
      setCardTemp({ ...data, status: CARD_UP });
      setCards((cards) =>
        updateCard(cards, "position", data.position, CARD_UP)
      );
    } else {
      setCards((cards) =>
        updateCard(cards, "position", data.position, CARD_UP)
      );
      setDisabled(true);
    }
    setTimeout(() => {
      if (cardTemp && data) {
        if (cardTemp.id === data.id) {
          setCards((cards) =>
            updateCard(cards, "status", CARD_UP, CARD_BACKGROUND)
          );
        } else {
          setCards((cards) => updateCard(cards, "status", CARD_UP, CARD_DOWN));
        }
        setAttemps((current) => current + 1);
        setCardTemp(null);
        setDisabled(false);
      }
    }, 750);
  };

  const handleAmountCards = (event) => {
    setAmountCards(parseInt(event.target.value));
    setCardTemp(null);
    setDisabled(false);
    setAttemps(0);
  };

  const restart = () => {
    setCardTemp(null);
    setDisabled(false);
    setAttemps(0);
    setCards((current) =>
      current.map((card) => ({ ...card, status: CARD_DOWN }))
    );
  };

  return (
    <div className="container pb-2 " style={{ border: "1px solid black" }}>
      <div className="d-flex justify-content-center align-items-center bg-primary text-white">
        <span className="fs-4 ms-2">Memoria</span>
        <span className="ps-2 ">Cartas</span>
        <select
          className="ms-2"
          onChange={handleAmountCards}
          value={amountCards}
          style={{ fontSize: "10px" }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="ms-2">Intentos: {attemps}</span>
        <button
          className="ms-2"
          style={{
            padding: "1px",
            fontSize: "10px",
            backgroundColor: "#81EC8E",
            border: "none",
            borderRadius: "6px",
          }}
          onClick={restart}
        >
          Reiniciar
        </button>
      </div>
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
