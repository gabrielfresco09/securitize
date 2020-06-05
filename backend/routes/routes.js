const express = require("express");
const routes = express.Router();
const service = require("../services/service");

const favorites = [];

routes.get("/currencies", async function(req, res, next) {
  try {
    const currencies = await service.listCurrencies(req.query, favorites);
    res.send(currencies);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.get("/currencies/favorites", function(req, res, next) {
  res.send(favorites);
});

routes.post("/currencies/favorites", function(req, res, next) {
  try {
    const fav = service.addFav(req.body, favorites);
    res.send(fav);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.delete("/currencies/favorites/:id", function(req, res, next) {
  try {
    const deleted = service.deleteFav(req.params.id, favorites);
    res.send(deleted);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = routes;
