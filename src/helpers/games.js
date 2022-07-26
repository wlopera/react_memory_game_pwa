import {
  CARD_DOWN,
  CARD_UP,
  CARD_BACKGROUND,
  GAME_WINNER,
  GAME_OVER,
  GAME_TIED,
} from "../util/Constants";

import { getRandom } from "../util/Utilities";
import { updateCard } from "../helpers/cards";

export const evaluatEndGame = (numPlayer, numMachine, amountCards) => {
  let imgEnd = null;

  if (numPlayer + numMachine === amountCards) {
    const random = getRandom(1, 3);
    if (numPlayer > numMachine) {
      imgEnd = GAME_WINNER;
    } else if (numMachine > numPlayer) {
      imgEnd = GAME_OVER;
    } else {
      imgEnd = GAME_TIED;
    }
    imgEnd = imgEnd + random;
  }

  return imgEnd;
};

export const secondClick = (
  numPlayer,
  arrCards,
  amountCards,
  setCards,
  setNumPlayer,
  setIdentifiedCards,
  setAttemps,
  setClick,
  setDisabled
) => {
  // Validar si las dos cartas seleccionadas son iguales
  if (arrCards[0].id === arrCards[1].id) {
    setCards((cards) => {
      const newCards = updateCard(
        cards,
        "status",
        CARD_UP,
        CARD_BACKGROUND,
        numPlayer
      );
      const totalBackground = newCards.filter(
        (card) => card.status === CARD_BACKGROUND
      );

      if (totalBackground.length === amountCards) {
        setNumPlayer(0);
      }
      return newCards;
    });
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
    setCards((cards) => updateCard(cards, "status", CARD_UP, CARD_DOWN, 0));
    setIdentifiedCards((current) => [...current, ...arrCards]);
  }

  setAttemps((current) => current + 1);
  setClick(0);
  setDisabled(false);
};