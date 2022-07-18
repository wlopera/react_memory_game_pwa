import React from "react";

const Card = ({ name, width, height, click }) => {
  return (
    <div>
      <img
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
