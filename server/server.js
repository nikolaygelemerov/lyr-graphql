const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const models = require('./models');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI =
  'mongodb+srv://deanhall:deanhall@cluster0.zxudk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const webpack = require('webpack');
const config = require(path.join(__dirname, '../webpack.config.js'));
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

//enable devServer middleware
app.use(webpackDevMiddleware);

//enable hot reloading
app.use(webpackHotMiddleware);

module.exports = app;
