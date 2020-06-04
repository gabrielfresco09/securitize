const axios = require("axios");

const getCurrencies = params =>
  axios.get(process.env.API_URL, {
    params,
    headers: {
      "X-CMC_PRO_API_KEY": process.env.API_KEY
    }
  });

module.exports = { getCurrencies };
