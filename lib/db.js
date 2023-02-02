const mongoose = require('mongoose');
const Bio = require('../models/Bio.model')


const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return;
  return mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}


const models = { Bio }

module.exports = {models, connectDb}