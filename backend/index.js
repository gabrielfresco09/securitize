const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api-documentation.yaml");
const routes = require("./routes/routes");
const { getCurrencies } = require("./api/requests");

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", routes);

app.listen(3001, async () => {
  /* Just to mention, I tried to integrate mongoose, but I kept getting 
  { MongoError: user is not allowed to do action [find] on [test-db-2.favorites]
  ok: 0, code: 8000, codeName: 'AtlasError', name: 'MongoError' }` 
  so I left that integration behind */
  global.favorites = [];

  /* This is a hack to allow the front to work normally since coinmarketcap API 
  doesn't return the total count of available coins, I make a big query on start up 
  that is why I set the limit to the maximum allow by the API*/
  try {
    const { data } = await getCurrencies({
      start: 1,
      limit: 5000
    });
    global.currenciesTotalCount = data.data.length;
  } catch (err) {
    console.error("Error fetching the total count", err);
    global.currenciesTotalCount = 3000;
  }

  console.log("Server running on port 3001");
});
