import React from "react";
import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import { getRandom } from "../../util/Utilities";

const Board = () => {
  let cardList = [];

  const getData = () => {
    while (cardList.length < 16) {
      const value = getRandom(1, 52);
      const valueExist = cardList.filter((item) => item.id === value)[0];
      if (!valueExist) {
        const newData = data.filter((item) => item.id === value)[0];
        cardList.push({
          id: newData.id,
          name: newData.label,
          position: cardList.length + 1,
        });
        cardList.push({
          id: newData.id,
          name: newData.label,
          position: cardList.length + 1,
        });
      }
    }

    //Desordenar orden incial
    for (let index = 0; index < cardList.length / 2; index++) {
      const posx = getRandom(1, 15);
      const posy = getRandom(1, 15);

      var element = cardList[posx];
      cardList.splice(posx, 1);
      cardList.splice(posy, 0, element);
    }
  };

  getData();

  return (
    <div className="container">
      <div className="row">
        {cardList.map((data) => (
          <div className="col-3 pe-1 pt-2" key={data.position}>
            <CardInput name={data.name} position={data.position} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;

//  const handleGo = () => {
//    setCard((current) => ({ ...current, status: 1 }));
//  };
