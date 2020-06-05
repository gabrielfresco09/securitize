const mongoose = require("mongoose");

const connect = () =>
  mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

module.exports = connect;
