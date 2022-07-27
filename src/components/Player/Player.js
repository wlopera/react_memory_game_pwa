import React, { useEffect } from "react";
import { getRandom } from "../../util/Utilities";
import {
  CARD_DOWN,
  CARD_UP,
  GAME_HUMAN,
  GAME_MACHINE,
} from "../../util/Constants";
import { getCardRepeat } from "../../helpers/games";

const Player = ({ number, cards, click, disabled, identifiedCards }) => {
  useEffect(() => {
    if (number === 2 && !disabled) {
      // Revisar proxima jugada
      const upCard = cards.filter((card) => card.status === CARD_UP);
      const activeCards = cards.filter((card) => card.status === CARD_DOWN);

      console.log(123, identifiedCards);

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
          // Segundo click
          click(seletionCard[0]);
        } else {
          // primer click

          // Busca la primera carta repetida que se alla mostrado previamente
          const data = getCardRepeat(identifiedCards);
          console.log(12345, data);
          if (data) {
            click(data);
          } else {
            const numRandom = getRandom(0, activeCards.length - 1);
            const card = activeCards[numRandom];
            click(card);
          }
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
