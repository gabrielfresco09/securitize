const express = require("express");
const routes = express.Router();
const { getCurrencies } = require("../api/requests");
const _ = require("lodash");

const favourites = [];

routes.get("/currencies", async function(req, res, next) {
  try {
    const { data } = await getCurrencies(req.query);
    const finalData = data.data.map(currency => {
      const fav = _.find(favourites, fav => fav.id == currency.id);
      currency.isFav = !!fav;
      return currency;
    });
    res.send(finalData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.get("/currencies/favourites", function(req, res, next) {
  res.send(favourites);
});

routes.post("/currencies/favourites", function(req, res, next) {
  try {
    const newFav = req.body;
    favourites.push(newFav);
    res.send(newFav);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.delete("/currencies/favourites/:id", function(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = _.remove(favourites, fav => fav.id == id);
    res.send(deleted);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = routes;
