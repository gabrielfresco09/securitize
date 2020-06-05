const _ = require("lodash");
const { getCurrencies } = require("../api/requests");

const listCurrencies = async params => {
  const { data } = await getCurrencies(params);
  const currencies = data.data.map(currency => {
    /* assuming that iterating over this array won't be too expensive,
       I prefer to do the work here to give the possibility to the frontend 
       to already know if it's a favorite */
    const fav = _.find(global.favorites, fav => fav.id == currency.id);
    currency.isFav = !!fav;
    return currency;
  });
  return { data: currencies, totalCount: global.currenciesTotalCount };
};

const addFav = itemToAdd => {
  itemToAdd.isFav = true;
  global.favorites.push(itemToAdd);
  return itemToAdd;
};

const deleteFav = id => {
  const [deleted] = _.remove(global.favorites, fav => fav.id == id);
  deleted.isFav = false;
  return deleted;
};

module.exports = { listCurrencies, addFav, deleteFav };
