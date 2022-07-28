import CardInput from "../components/Card/CardInput";
import Player from "../components/Player/Player";

import { MACHINE_WINNER, PLAYERS_TIED, PLAYER_WINNER } from "../util/Constants";

export const getContextPlayer = (
  image,
  numPlayer,
  cards,
  onClick,
  disabled,
  identifiedCards,
  level
) => {
  if (image) {
    return (
      <h1 className="fs-4 bg-danger text-white">
        {image.includes("winner")
          ? PLAYER_WINNER
          : image.includes("over")
          ? MACHINE_WINNER
          : PLAYERS_TIED}
      </h1>
    );
  } else
    return (
      <Player
        number={numPlayer}
        cards={cards}
        click={onClick}
        disabled={disabled}
        identifiedCards={identifiedCards}
        level={level}
      />
    );
};

export const getBodyMobile = (image, cards, onChange, disabled, isMobile) => {
  if (image) {
    return <img src={`/cards/${image}.gif`} alt="logoEnd" />;
  } else
    return (
      <div className="row">
        {cards.map((data) => (
          <div
            className="col-3 pe-2 pt-2 d-flex justify-content-center"
            key={data.position}
          >
            <CardInput
              id={data.id}
              name={data.name}
              position={data.position}
              status={data.status}
              onChange={onChange}
              disabled={disabled}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>
    );
};

export const getBodyWidthWEB = (rows) => {
  let width = "70%";
  if (rows === 3) {
    width = "45%";
  } else if (rows === 4) {
    width = "35%";
  } else if (rows === 5) {
    width = "45%";
  } else if (rows === 6) {
    width = "55%";
  } else if (rows === 7) {
    width = "65%";
  } else if (rows === 8) {
    width = "75%";
  }
  return width;
};

export const getBodyWEB = (
  image,
  rows,
  cards,
  onChange,
  disabled,
  isMobile
) => {
  if (image) {
    return <img src={`/cards/${image}.gif`} alt="logoEnd" width="55%" />;
  } else {
    let size = rows;
    if (size < 5) {
      size = 4;
    }
    const width = getBodyWidthWEB(rows);
    const records = [];
    let arrs = [];
    cards.forEach((data, index) => {
      arrs.push(
        <div className="col-sm" key={data.position}>
          <CardInput
            id={data.id}
            name={data.name}
            position={data.position}
            status={data.status}
            onChange={onChange}
            disabled={disabled}
            isMobile={isMobile}
            width={width}
          />
        </div>
      );
      if (arrs.length === size) {
        records.push(
          <div className="row pt-2" key={index}>
            {arrs}
          </div>
        );
        arrs = [];
      }
    });

    return records.map((record) => record);
  }
};
