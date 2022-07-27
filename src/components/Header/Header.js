import React from "react";

import {
  options,
  levels,
  GAME_NAME,
  GAME_CARDS,
  GAME_ATTEMPTS,
  GAME_POINTS,
  GAME_HUMAN,
  GAME_MACHINE,
  BUTTON_INIT,
  GAME_LEVEL,
} from "../../util/Constants";

const Header = ({
  amountCards,
  onAmountCards,
  level,
  onChangeLevel,
  attemps,
  onRestart,
  player,
  machine,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary text-white">
      <span className="fs-6 ms-2">{GAME_NAME}</span>
      <span className="ps-4">{GAME_CARDS}</span>
      <select
        className="ms-2"
        onChange={onAmountCards}
        value={amountCards}
        style={{ fontSize: "15px" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="ps-2 ">{GAME_LEVEL}</span>
      <select
        className="ms-2"
        onChange={onChangeLevel}
        value={level}
        style={{ fontSize: "15px" }}
      >
        {levels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
      <span className="ms-2">
        {GAME_ATTEMPTS}: {attemps}
      </span>

      <span className="ms-2">{GAME_POINTS} </span>
      <span className="ms-2">
        {GAME_HUMAN}: {player.length}{" "}
      </span>
      <span className="ms-2">
        {GAME_MACHINE}: {machine.length}
      </span>
      <button
        className="ms-2"
        style={{
          padding: "1px",
          fontSize: "15px",
          backgroundColor: "#81EC8E",
          border: "none",
          borderRadius: "6px",
        }}
        onClick={onRestart}
      >
        {BUTTON_INIT}
      </button>
    </div>
  );
};

export default Header;
