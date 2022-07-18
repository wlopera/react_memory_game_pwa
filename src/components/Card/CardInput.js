import React, { useState } from "react";
import Card from "./Card";

const CardInput = (props) => {
  const [card, setCard] = useState({ name: "back-1", position: 0, status: 0 });
  const width = 180;
  const height = 180;

  const handleOnClick = () => {
    setCard((current) => {
      if (current.status === 0) {
        if (current.name === "back") {
          return { name: props.name, position: props.position, status: 0 };
        }
        return {
          ...current,
          name: "back-1",
        };
      }
      return current;
    });
  };

  return (
    <Card
      name={card.name}
      position={card.position}
      width={width}
      height={height}
      click={handleOnClick}
    />
  );
};

export default CardInput;
