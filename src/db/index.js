const { Sequelize } = require('sequelize');
require('dotenv').config();
const DATABASE = process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE);  //heroku uses connection uri instead of passing parameters


module.exports = sequelize;