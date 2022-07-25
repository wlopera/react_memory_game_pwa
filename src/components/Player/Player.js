import React, { useEffect } from "react";
import { getRandom } from "../../util/Utilities";
import { CARD_DOWN, CARD_UP } from "../../util/Constants";

const Player = ({ number, cards, click, disabled, identifiedCards }) => {
  useEffect(() => {
    if (number === 2 && !disabled) {
      const upCard = cards.filter((card) => card.status === CARD_UP);
      const listCard = cards.filter((card) => card.status === CARD_DOWN);
      // const showsCard = cards.filter(
      //   (card) => card.status === CARD_DOWN && card.player !== -1
      // );

      // console.log(12345, cards, listCard, showsCard);

      let seletionCard = null;
      if (upCard && upCard.length > 0) {
        seletionCard = identifiedCards.filter(
          (card) =>
            card.id === upCard[0].id && card.position !== upCard[0].position
        );
      }

      const timer = setTimeout(() => {
        if (seletionCard && seletionCard.length > 0) {
          click(seletionCard[0]);
        } else {
          const numRandom = getRandom(0, listCard.length - 1);
          const card = listCard[numRandom];
          click(card);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="bg-success text-center fs-6 text-white">
      {number === 1 ? "RETADOR" : "COMPUTADORA"}
    </div>
  );
};

export default Player;
