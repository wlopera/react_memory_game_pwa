import React from "react";
import { CARD_BACKGROUND, CARD_NAME_BACKGROUND } from "../../util/Constants";

import classes from "./Card.module.css";

const Card = ({ id, name, click, status, width }) => {
  const context =
    status === CARD_BACKGROUND ? (
      <img
        id={id}
        // className={classes.card}
        src={`/cards/${CARD_NAME_BACKGROUND}.svg`}
        alt="logo1"
        width={width}
      />
    ) : (
      <img
        id={id}
        // className={classes.card}
        src={`/cards/${name}.svg`}
        alt="logo"
        onClick={click}
        width={width}
      />
    );
  return context;
};

export default Card;
