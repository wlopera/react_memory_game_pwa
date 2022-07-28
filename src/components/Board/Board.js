import React, { useEffect, useState } from "react";

import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import Header from "../Header/Header";
import Player from "../Player/Player";

import { getCards, updateCard } from "../../helpers/card";
import { secondClick, evaluatEndGame } from "../../helpers/game";

import {
  CARD_UP,
  CARD_BACKGROUND,
  AMOUNT_CARDS_DEFAULT,
  TIME_WAIT,
  LEVEL_MACHINE_DEFAULT,
  PLAYER_START_GAME,
} from "../../util/Constants";

import { getBodyMobile, getBodyWEB } from "../../helpers/board";

const Board = () => {
  const [amountCards, setAmountCards] = useState(AMOUNT_CARDS_DEFAULT);
  const [cards, setCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [attemps, setAttemps] = useState(0);
  const [click, setClick] = useState(0);
  const [numPlayer, setNumPlayer] = useState(0);
  const [identifiedCards, setIdentifiedCards] = useState([]);
  const [level, setLevel] = useState(LEVEL_MACHINE_DEFAULT);

  useEffect(() => {
    const newCards = getCards(data, amountCards);
    setCards(newCards);
    setNumPlayer(PLAYER_START_GAME);
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
  }, [disabled, click, cards, numPlayer, amountCards]);

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

  const onChangeLevel = (event) => {
    setLevel(parseInt(event.target.value));
    setCards(getCards(data, amountCards));
    setDisabled(false);
    setAttemps(0);
    setClick(0);
    setNumPlayer(PLAYER_START_GAME);
    setIdentifiedCards([]);
  };

  const restart = () => {
    setCards(getCards(data, amountCards));
    setDisabled(false);
    setAttemps(0);
    setClick(0);
    setNumPlayer(PLAYER_START_GAME);
    setIdentifiedCards([]);
  };

  const player1 = cards.filter(
    (card) => card.player === 1 && card.status === CARD_BACKGROUND
  );
  const player2 = cards.filter(
    (card) => card.player === 2 && card.status === CARD_BACKGROUND
  );

  const imgEnd = evaluatEndGame(player1.length, player2.length, amountCards);

  const contextPlayer = getBodyMobile(
    imgEnd,
    numPlayer,
    cards,
    handlePlayerSetCard,
    disabled,
    identifiedCards,
    level
  );
  const contextBodyWEB = getBodyWEB(
    imgEnd,
    amountCards / 4,
    cards,
    handleSetCard,
    disabled
  );

  return (
    <div className="container pb-2 " style={{ border: "1px solid black" }}>
      <Header
        amountCards={amountCards}
        onAmountCards={handleAmountCards}
        level={level}
        onChangeLevel={onChangeLevel}
        attemps={attemps}
        onRestart={restart}
        player={player1}
        machine={player2}
      />
      {contextPlayer}
      {contextBodyWEB}
    </div>
  );
};

export default Board;
