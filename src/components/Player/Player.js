import React, { useEffect } from "react";
import { getRandom } from "../../util/Utilities";
import {
  CARD_DOWN,
  CARD_UP,
  GAME_HUMAN,
  GAME_MACHINE,
} from "../../util/Constants";
import { getCardRepeat } from "../../helpers/game";

const Player = ({ number, cards, click, disabled, identifiedCards, level }) => {
  useEffect(() => {
    if (number === 2 && !disabled) {
      // Revisar proxima jugada
      const upCard = cards.filter((card) => card.status === CARD_UP);
      const activeCards = cards.filter((card) => card.status === CARD_DOWN);

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
          let data = null;

          // Nivel 2: Busca la primera carta repetida ya descubierta
          if (level === 2 || level === 3) {
            data = getCardRepeat(identifiedCards);
          }

          // Nivel 3: Si no hay carta primera carta repetida, seleccionar nueva carta no mostrada previamente
          if (!data && level === 3) {
            const listCards = cards.filter((card) => card.player === -1);
            if (listCards.length > 0) {
              const random = getRandom(0, listCards.length - 1);
              data = listCards[random];
            }
          }

          if (data) {
            click({ ...data, player: number });
          } else {
            const numRandom = getRandom(0, activeCards.length - 1);
            const card = activeCards[numRandom];
            click({ ...card, player: number });
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
