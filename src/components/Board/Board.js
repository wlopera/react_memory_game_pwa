import React, { useEffect, useState } from "react";
import CardInput from "../Card/CardInput";
import data from "../../store/data.json";
import { getRandom } from "../../util/Utilities";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [cardTemp, setCardTemp] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let cardList = [];
    while (cardList.length < 16) {
      const value = getRandom(1, 52);
      const valueExist = cardList.filter((item) => item.id === value)[0];
      if (!valueExist) {
        const newData = data.filter((item) => item.id === value)[0];
        cardList.push({
          id: newData.id,
          name: newData.label,
          position: cardList.length + 1,
          status: 0,
        });
        cardList.push({
          id: newData.id,
          name: newData.label,
          position: cardList.length + 1,
          status: 0,
        });
      }
    }

    // Desordenar orden incial
    for (let index = 0; index < cardList.length / 2; index++) {
      const posx = getRandom(1, 15);
      const posy = getRandom(1, 15);

      var element = cardList[posx];
      cardList.splice(posx, 1);
      cardList.splice(posy, 0, element);
    }

    setCards(cardList);
  }, [setCards]);

  const handleSetCard = (data) => {
    if (!cardTemp) {
      setCardTemp({ ...data, status: 1 });
      setCards((cards) =>
        cards.map((card) => {
          if (data.position === card.position) {
            return { ...card, status: 1 };
          }
          return card;
        })
      );
    } else {
      setCards((cards) =>
        cards.map((card) => {
          if (data.position === card.position) {
            return { ...card, status: 1 };
          }
          return card;
        })
      );
      setDisabled(true);
    }
    setTimeout(() => {
      if (cardTemp && data) {
        if (cardTemp.id === data.id) {
          setCards((cards) =>
            cards.map((card) => {
              if (cardTemp.id === card.id || data.id === card.id) {
                return { ...card, status: 2 };
              }
              return card;
            })
          );
        } else {
          setCards((cards) =>
            cards.map((card) => {
              if (cardTemp.id === card.id || data.id === card.id) {
                return { ...card, status: 0 };
              }
              return card;
            })
          );
        }
        setCardTemp(null);
        setDisabled(false);
        console.log("Listo: ", data);
      }
    }, 1000);
  };

  const doThis = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="row">
        {cards.map((data) => (
          <div className="col-3 pe-1 pt-2" key={data.position}>
            <CardInput
              id={data.id}
              name={data.name}
              position={data.position}
              status={data.status}
              onChange={handleSetCard}
              disabled={disabled}
            />
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
