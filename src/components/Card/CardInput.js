import React, { useEffect, useState } from "react";
import Card from "./Card";
import { CARD_DOWN, CARD_NAME_BACK } from "../../util/Constants";

const CardInput = ({ onChange, id, name, position, status, disabled }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (status === CARD_DOWN) {
      setCard({
        id: 0,
        name: CARD_NAME_BACK,
        position: 0,
        status: CARD_DOWN,
      });
    } else {
      setCard({
        id: id,
        name: name,
        position: position,
        status: status,
      });
    }
  }, [id, name, position, status]);

  const handleOnClick = () => {
    if (disabled) {
      return;
    }
    if (card.status === CARD_DOWN) {
      let newCard = null;
      if (card.status === CARD_DOWN) {
        if (card.name === CARD_NAME_BACK) {
          newCard = {
            id: id,
            name: name,
            position: position,
            status: status,
          };
          return onChange(newCard);
        }
        newCard = {
          ...card,
          name: CARD_NAME_BACK,
        };
        return onChange(newCard);
      }
      return onChange(card);
    }
  };

  return card ? (
    <Card
      id={id}
      name={card.name}
      position={card.position}
      click={handleOnClick}
      status={status}
    />
  ) : null;
};

export default CardInput;
