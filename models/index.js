const { Sequelize } = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'mssql', etc
});

const User = UserModel(sequelize, Sequelize.DataTypes);

async function syncDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection established.');
    await sequelize.sync({ force: true }); // WARNING: drops & recreates tables
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect or sync:', error);
  }
}

syncDb();
const { Sequelize } = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'mssql', etc
});

const User = UserModel(sequelize, Sequelize.DataTypes);

async function syncDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection established.');
    await sequelize.sync({ force: true }); // WARNING: drops & recreates tables
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect or sync:', error);
  }
}

syncDb();
