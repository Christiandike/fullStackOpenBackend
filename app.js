const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const personRouter = require('./controllers/personController');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => logger.error('failed to connect to MongoDB:', err.msg));

// think of all the req/res cycles that happen
// when a req/res is made and load
// the middleware in that order
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.morgan(':method :url :status :body'));

app.use('/api/persons', personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
