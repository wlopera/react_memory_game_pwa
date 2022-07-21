import React from "react";

const Card = ({ id, name, width, height, click, disabled, status }) => {
  const context =
    status !== 2 ? (
      <div style={disabled ? { pointerEvents: "none" } : null}>
        <img
          id={id}
          className=""
          src={`/cards/${name}.svg`}
          alt="logo"
          width={width}
          height={height}
          onClick={click}
        />
      </div>
    ) : (
      <div style={disabled ? { pointerEvents: "none" } : null}>
        <img
          id={id}
          className=""
          src={`/cards/fondo5.svg`}
          alt="logo1"
          width={width}
          height={height}
        />
      </div>
    );
  return context;
};

export default Card;
