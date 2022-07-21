export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getCards = (data) => {
  let cardList = [];
  while (cardList.length < 16) {
    const value = getRandom(1, 52);
    const valueExist = cardList.filter((item) => item.id === value)[0];
    if (!valueExist) {
      const newData = data.filter((item) => item.id === value)[0];
      if (newData) {
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
  }

  // Desordenar orden incial
  for (let index = 0; index < cardList.length / 2; index++) {
    const posx = getRandom(1, 15);
    const posy = getRandom(1, 15);

    var element = cardList[posx];
    cardList.splice(posx, 1);
    cardList.splice(posy, 0, element);
  }

  return cardList;
};

export const updateCard = (cards, field, valueField, status) => {
  return cards.map((card) => {
    if (valueField === card[field]) {
      return { ...card, status };
    }
    return card;
  });
};
