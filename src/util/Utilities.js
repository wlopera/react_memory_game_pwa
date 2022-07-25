import { CARD_DOWN } from "../util/Constants";

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getCards = (data, amountCards) => {
  let cardList = [];
  while (cardList.length < amountCards) {
    const value = getRandom(33, 52);
    const valueExist = cardList.filter((item) => item.id === value)[0];
    if (!valueExist) {
      const newData = data.filter((item) => item.id === value)[0];
      if (newData) {
        cardList.push({
          id: newData.id,
          name: newData.label,
          position: cardList.length + 1,
          status: CARD_DOWN,
          player: -1,
        });
        cardList.push({
          id: newData.id,
          name: newData.label,
          position: cardList.length + 1,
          status: CARD_DOWN,
          player: -1,
        });
      }
    }
  }

  // Desordenar orden incial
  for (let index = 0; index < amountCards * 5; index++) {
    const posx = getRandom(1, amountCards - 1);
    const posy = getRandom(1, amountCards - 1);

    var element = cardList[posx];
    cardList.splice(posx, 1);
    cardList.splice(posy, 0, element);
  }

  return cardList;
};

export const updateCard = (cards, field, valueField, status, numPlayer) => {
  return cards.map((card) => {
    if (valueField === card[field]) {
      return { ...card, status, player: numPlayer };
    }
    return card;
  });
};
