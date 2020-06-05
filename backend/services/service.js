const _ = require("lodash");
const { getCurrencies } = require("../api/requests");

const listCurrencies = async (params, favorites) => {
  const { data } = await getCurrencies(params);
  const currencies = data.data.map(currency => {
    /* assuming that iterating over this array won't be too expensive,
       I prefer to do the work here to give the possibility to the frontend 
       to already know if it's a favorite */
    const fav = _.find(favorites, fav => fav.id == currency.id);
    currency.isFav = !!fav;
    return currency;
  });
  return currencies;
};

const addFav = (itemToAdd, favorites) => {
  itemToAdd.isFav = true;
  favorites.push(itemToAdd);
  return itemToAdd;
};

const deleteFav = (id, favorites) => {
  const [deleted] = _.remove(favorites, fav => fav.id == id);
  deleted.isFav = false;
  return deleted;
};

module.exports = { listCurrencies, addFav, deleteFav };
