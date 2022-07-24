const morgan = require("morgan");
const logger = require("./logger");

morgan.token(
  "body",
  (getBody = (req) => {
    return JSON.stringify(req.body);
  })
);

const errorHandler = (err, req, res, next) => {
  logger.error(err.name);

  //if the error is a castError
  if (err.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

module.exports = {
  morgan,
  errorHandler,
  unknownEndpoint,
};
