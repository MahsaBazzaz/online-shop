const Sequelize = require("sequelize");

module.exports = new Sequelize('OnlineShop', 'postgres', 'admin', {
    host: 'localhost',
    port: 4321,
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000
    }
  });