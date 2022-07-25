import React, { useEffect, useState } from "react";
import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import { getCards, updateCard } from "../../util/Utilities";
import Player from "../Player/Player";

import {
  CARD_UP,
  CARD_DOWN,
  CARD_BACKGROUND,
  options,
  AMOUNT_CARDS_DEFAULT,
  TIME_WAIT,
} from "../../util/Constants";
//import useMousePosition from "../Hooks/UseMousePosition";

const Board = () => {
  const [amountCards, setAmountCards] = useState(AMOUNT_CARDS_DEFAULT);
  const [cards, setCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [attemps, setAttemps] = useState(0);
  const [click, setClick] = useState(0);
  const [numPlayer, setNumPlayer] = useState(0);
  const [identifiedCards, setIdentifiedCards] = useState([]);
  //const mousePosition = useMousePosition();

  useEffect(() => {
    const newCards = getCards(data, amountCards);
    setCards(newCards);
    setNumPlayer(1);
  }, [setCards, amountCards]);

  useEffect(() => {
    const arrCards = cards.filter((card) => card.status === CARD_UP);
    if (click === 1) {
      setDisabled(false);
    } else if (click === 2) {
      const timer = setTimeout(() => {
        // Validar si las dos cartas seleccionadas son iguales
        if (arrCards[0].id === arrCards[1].id) {
          setCards((cards) =>
            updateCard(cards, "status", CARD_UP, CARD_BACKGROUND, numPlayer)
          );
          setIdentifiedCards((current) => {
            let oldCards = current.filter((card) => card.id !== arrCards[0].id);
            oldCards = oldCards.filter((card) => card.id !== arrCards[1].id);

            return oldCards;
          });
        } else {
          setNumPlayer((current) => {
            if (current === 1) {
              return 2;
            } else {
              return 1;
            }
          });
          setCards((cards) =>
            updateCard(cards, "status", CARD_UP, CARD_DOWN, 0)
          );
          setIdentifiedCards((current) => [...current, ...arrCards]);
        }

        setAttemps((current) => current + 1);
        setClick(0);
        setDisabled(false);
      }, TIME_WAIT);
      return () => clearTimeout(timer);
    }
  }, [disabled, click, cards]);

  const handleSetCard = (data) => {
    setClick((current) => current + 1);
    setCards((cards) =>
      updateCard(cards, "position", data.position, CARD_UP, numPlayer)
    );
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

  const player1 = cards.filter(
    (card) => card.player === 1 && card.status === CARD_BACKGROUND
  );
  const player2 = cards.filter(
    (card) => card.player === 2 && card.status === CARD_BACKGROUND
  );

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
        <span className="ms-2">Puntos </span>
        <span className="ms-2">Tu:{player1.length} </span>
        <span className="ms-2">Máquina:{player2.length}</span>
      </div>
      {/* <div id="MyDiv" onClick={() => console.log("Click LAPTOP")}>
        <p>
          Posición actual:
          <br />
          {JSON.stringify(mousePosition)}
        </p>
      </div> */}
      {cards && (
        <Player
          number={numPlayer}
          cards={cards}
          click={handleSetCard}
          disabled={disabled}
          identifiedCards={identifiedCards}
        />
      )}
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
