import React, { useEffect, useState } from "react";
import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import { getCards, updateCard } from "../../util/Utilities";
import {
  CARD_UP,
  CARD_DOWN,
  CARD_BACKGROUND,
  options,
  AMOUNT_CARDS_DEFAULT,
  TIME_WAIT,
} from "../../util/Constants";

const Board = () => {
  const [amountCards, setAmountCards] = useState(AMOUNT_CARDS_DEFAULT);
  const [cards, setCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [attemps, setAttemps] = useState(0);
  const [click, setClick] = useState(0);

  useEffect(() => {
    setCards(getCards(data, amountCards));
  }, [setCards, amountCards]);

  useEffect(() => {
    if (click === 1) {
      setDisabled(false);
    } else if (click === 2) {
      setTimeout(() => {
        const arrCards = cards.filter((card) => card.status === CARD_UP);

        // Validar si las dos cartas seleccionadas son iguales
        if (arrCards[0].id === arrCards[1].id) {
          setCards((cards) =>
            updateCard(cards, "status", CARD_UP, CARD_BACKGROUND)
          );
        } else {
          setCards((cards) => updateCard(cards, "status", CARD_UP, CARD_DOWN));
        }

        setAttemps((current) => current + 1);
        setClick(0);
        setDisabled(false);
      }, TIME_WAIT);
    }
  }, [disabled, click, cards]);

  const handleSetCard = (data) => {
    setClick((current) => current + 1);
    setCards((cards) => updateCard(cards, "position", data.position, CARD_UP));
    setDisabled(true);
  };

  const handleAmountCards = (event) => {
    setClick(0);
    setAmountCards(parseInt(event.target.value));
    setDisabled(false);
    setAttemps(0);
    setCards(getCards(data, parseInt(event.target.value)));
  };

  const restart = () => {
    setDisabled(false);
    setAttemps(0);
    setClick(0);
    setCards(getCards(data, amountCards));
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
          style={{ fontSize: "15px" }}
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
            fontSize: "15px",
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
          <div
            className="col-3 pe-2 pt-2 d-flex justify-content-center"
            key={data.position}
          >
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
