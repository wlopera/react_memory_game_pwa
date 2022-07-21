import React from "react";

const Card = ({ id, name, width, height, click, disabled }) => {
  return (
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
  );
};

export default Card;
