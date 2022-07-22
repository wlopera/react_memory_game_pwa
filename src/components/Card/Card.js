import React from "react";
import {
  CARD_BACKGROUND,
  POINTER_EVENT_NONE,
  CARD_NAME_BACKGROUND,
} from "../../util/Constants";

const Card = ({ id, name, width, height, click, disabled, status }) => {
  const context =
    status === CARD_BACKGROUND ? (
      <div style={disabled ? { pointerEvents: POINTER_EVENT_NONE } : null}>
        <img
          id={id}
          className="img-fluid"
          src={`/cards/${CARD_NAME_BACKGROUND}.svg`}
          alt="logo1"
          width={width}
          height={height}
        />
      </div>
    ) : (
      <div style={disabled ? { pointerEvents: POINTER_EVENT_NONE } : null}>
        <img
          id={id}
          className="img-fluid"
          src={`/cards/${name}.svg`}
          alt="logo"
          width={width}
          height={height}
          onClick={click}
        />
      </div>
    );
  return context;
};

export default Card;
