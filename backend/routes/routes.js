const express = require("express");
const routes = express.Router();
const { getCurrencies } = require("../api/requests");
const _ = require("lodash");

const favorites = [];

routes.get("/currencies", async function(req, res, next) {
  try {
    const { data } = await getCurrencies(req.query);
    const finalData = data.data.map(currency => {
      /* assuming that iterating over this array won't be too expensive,
       I prefer to do the work here to give the possibility to the frontend 
       to already know if it's a favorite */
      const fav = _.find(favorites, fav => fav.id == currency.id);
      currency.isFav = !!fav;
      return currency;
    });
    res.send(finalData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.get("/currencies/favorites", function(req, res, next) {
  res.send(favorites);
});

routes.post("/currencies/favorites", function(req, res, next) {
  try {
    const newFav = req.body;
    newFav.isFav = true;
    favorites.push(newFav);
    res.send(newFav);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.delete("/currencies/favorites/:id", function(req, res, next) {
  try {
    const { id } = req.params;
    const [deleted] = _.remove(favorites, fav => fav.id == id);
    deleted.isFav = false;
    res.send(deleted);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = routes;
