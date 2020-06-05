const express = require("express");
const routes = express.Router();
const service = require("../services/service");
const errorHandler = require("../middlewares/errorHandler");

routes.get("/currencies", async function(req, res, next) {
  try {
    const currencies = await service.listCurrencies(req.query);
    res.send(currencies);
  } catch (err) {
    next(err);
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
    next(err);
  }
});

routes.delete("/currencies/favorites/:id", function(req, res, next) {
  try {
    const deleted = service.deleteFav(req.params.id);
    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

routes.use("*", function(err, req, res, next) {
  errorHandler(err, res);
});

module.exports = routes;
