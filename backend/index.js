const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getCurrencies } = require("./api/requests");

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get("/currencies", async function(req, res, next) {
  try {
    const response = await getCurrencies(req.query);
    console.log(response)
    res.send(response.data.data);
  } catch (err) {
    console.error("Error during request validation, invalid params", err);
    res.status(400).send({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
