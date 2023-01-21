const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
require('dotenv').config()
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  mongoose.set('strictQuery', false);
  throw new Error('You must provide a MongoDB URI');
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI)  
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error(err)
  }
}
start()

// mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI, {useMongoClient: true});
// mongoose.connection
//     .once('open', () => console.log('Connected to MongoDB instance.'))
//     .on('error', error => console.log('Error connecting to MongoDB:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
