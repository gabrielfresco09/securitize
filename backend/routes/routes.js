const express = require("express");
const routes = express.Router();
const service = require("../services/service");

routes.get("/currencies", async function(req, res, next) {
  try {
    const currencies = await service.listCurrencies(req.query);
    res.send(currencies);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.get("/currencies/favorites", function(req, res, next) {
  res.send(global.favorites);
});

routes.post("/currencies/favorites", function(req, res, next) {
  try {
    const fav = service.addFav(req.body);
    res.send(fav);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

routes.delete("/currencies/favorites/:id", function(req, res, next) {
  try {
    const deleted = service.deleteFav(req.params.id);
    res.send(deleted);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = routes;
