import React, { useEffect, useState } from "react";

import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import Header from "../Header/Header";
import Player from "../Player/Player";

import { getCards, updateCard } from "../../helpers/cards";
import { secondClick, evaluatEndGame } from "../../helpers/games";

import {
  CARD_UP,
  CARD_BACKGROUND,
  AMOUNT_CARDS_DEFAULT,
  TIME_WAIT,
} from "../../util/Constants";

const Board = () => {
  const [amountCards, setAmountCards] = useState(AMOUNT_CARDS_DEFAULT);
  const [cards, setCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [attemps, setAttemps] = useState(0);
  const [click, setClick] = useState(0);
  const [numPlayer, setNumPlayer] = useState(0);
  const [identifiedCards, setIdentifiedCards] = useState([]);

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
        secondClick(
          numPlayer,
          arrCards,
          amountCards,
          setCards,
          setNumPlayer,
          setIdentifiedCards,
          setAttemps,
          setClick,
          setDisabled
        );
      }, TIME_WAIT);
      return () => clearTimeout(timer);
    }
  }, [disabled, click, cards]);

  const handleSetCard = (data) => {
    // Permite solo procesar las opcione de click de manera manual (humano)
    if (numPlayer === 1) {
      handlePlayerSetCard(data);
    }
  };

  // Permite solo procesar las opcione de click de manera automatica (PC)
  const handlePlayerSetCard = (data) => {
    setClick((current) => current + 1);
    setCards((cards) =>
      updateCard(cards, "position", data.position, CARD_UP, numPlayer)
    );
    setDisabled(true);
  };

  const handleAmountCards = (event) => {
    setAmountCards(parseInt(event.target.value));
    setCards(getCards(data, parseInt(event.target.value)));
    setDisabled(false);
    setClick(0);
    setAttemps(0);
    setNumPlayer(1);
    setIdentifiedCards([]);
  };

  const restart = () => {
    setCards(getCards(data, amountCards));
    setDisabled(false);
    setAttemps(0);
    setClick(0);
    setNumPlayer(1);
    setIdentifiedCards([]);
  };

  const player1 = cards.filter(
    (card) => card.player === 1 && card.status === CARD_BACKGROUND
  );
  const player2 = cards.filter(
    (card) => card.player === 2 && card.status === CARD_BACKGROUND
  );

  const imgEnd = evaluatEndGame(player1.length, player2.length, amountCards);

  const contextPlayer = imgEnd ? (
    <h1 className="fs-4 bg-danger text-white">
      {imgEnd.includes("winner")
        ? "Eres el ganador"
        : "La computadora es la ganadora"}
    </h1>
  ) : (
    <Player
      number={numPlayer}
      cards={cards}
      click={handlePlayerSetCard}
      disabled={disabled}
      identifiedCards={identifiedCards}
    />
  );

  const contextBody = imgEnd ? (
    <img src={`/cards/${imgEnd}.gif`} alt="logoEnd" />
  ) : (
    cards.map((data) => (
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
    ))
  );

  return (
    <div className="container pb-2 " style={{ border: "1px solid black" }}>
      <Header
        amountCards={amountCards}
        onAmountCards={handleAmountCards}
        attemps={attemps}
        onRestart={restart}
        player={player1}
        machine={player2}
      />
      {contextPlayer}
      <div className="row">{contextBody}</div>
    </div>
  );
};

export default Board;
