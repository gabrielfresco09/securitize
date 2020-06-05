const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api-documentation.yaml");
const routes = require("./routes/routes");

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", routes);

app.listen(3001, () => {
  /* Just to mention, I tried to integrate mongoose, but I kept getting 
  { MongoError: user is not allowed to do action [find] on [test-db-2.favorites]
  ok: 0, code: 8000, codeName: 'AtlasError', name: 'MongoError' }` 
  so I left that integration behind */
  console.log("Server running on port 3001");
});
