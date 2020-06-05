import axios from "axios";

export const getCurrencies = queryParams =>
  axios.get("http://localhost:3001/currencies", {
    params: { ...queryParams }
  });

export const getIcon = name =>
  axios.get(
    `https://s2.coinmarketcap.com/static/img/coins/64x64/${name.toLowerCase()}.png`
  );

export const addFavourite = favourite =>
  axios.post("http://localhost:3001/currencies/favourites", favourite);

export const removeFavourite = id =>
  axios.delete(`http://localhost:3001/currencies/favourites/${id}`);

export const getFavourites = () =>
  axios.get("http://localhost:3001/currencies/favourites");
