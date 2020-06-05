const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use("/", (req, res, next) => {
  try {
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.use("/", routes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
