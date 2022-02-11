const logger = require('./utils/logger');
const config = require('./utils/config');
const express = require('express');
const postRouter = require('./controllers/posts');
const userRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const path = require('path');

const sequelize = require('./db');
const app = express();
require('dotenv').config();

sequelize.authenticate()
  .then(() => {
    console.log('connected to database...');
  })
  .catch((err) => {
    console.log(err);
    console.log('error connecting to database');
  });

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;