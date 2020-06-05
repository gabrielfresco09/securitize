const errorHandler = (err, res) => {
  // should use a loggin lib
  console.error("An error ocurred", err);
  // you could have multiple handlers to manage different kind of errors
  res.status(500).json({ error: err.message });
};

module.exports = errorHandler;
