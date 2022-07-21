import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardInput = ({ onChange, id, name, position, status, disabled }) => {
  const [card, setCard] = useState(null);
  const width = 180;
  const height = 180;

  useEffect(() => {
    if (status === 0) {
      setCard({
        id: 0,
        name: "back",
        position: 0,
        status: 0,
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
    if (card.status === 0) {
      let newCard = null;
      if (card.status === 0) {
        if (card.name === "back") {
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
          name: "back",
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
      width={width}
      height={height}
      click={handleOnClick}
      disabled={disabled}
    />
  ) : null;
};

export default CardInput;
