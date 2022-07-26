import React, { useEffect } from "react";
import { getRandom } from "../../util/Utilities";
import {
  CARD_DOWN,
  CARD_UP,
  GAME_HUMAN,
  GAME_MACHINE,
} from "../../util/Constants";

const Player = ({ number, cards, click, disabled, identifiedCards }) => {
  useEffect(() => {
    if (number === 2 && !disabled) {
      // Revisar proxima jugada
      const upCard = cards.filter((card) => card.status === CARD_UP);
      const activeCards = cards.filter((card) => card.status === CARD_DOWN);

      console.log(123, identifiedCards);
      // const showsCard = cards.filter(
      //   (card) => card.status === CARD_DOWN && card.player !== -1
      // );

      // console.log(12345, cards, activeCards, showsCard);

      let seletionCard = null;
      if (upCard && upCard.length > 0) {
        seletionCard = identifiedCards.filter(
          (card) =>
            card.id === upCard[0].id && card.position !== upCard[0].position
        );
      }

      const timer = setTimeout(() => {
        // Enviar click automatico
        if (seletionCard && seletionCard.length > 0) {
          click(seletionCard[0]);
        } else {
          const numRandom = getRandom(0, activeCards.length - 1);
          const card = activeCards[numRandom];
          click(card);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="bg-success text-center fs-6 text-white">
      {number === 1 ? GAME_HUMAN.toUpperCase() : GAME_MACHINE.toUpperCase()}
    </div>
  );
};

export default Player;
