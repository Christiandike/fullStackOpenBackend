require('dotenv').config();

const { MONGO_URI } = process.env;
const { PORT } = process.env;

module.exports = {
  MONGO_URI,
  PORT,
};
