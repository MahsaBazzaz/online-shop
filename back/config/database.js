const Sequelize = require("sequelize");
const config = require('../config.json');
const defaultConfig = config.dev;

console.log(defaultConfig.databaseUsername);
module.exports = new Sequelize('OnlineShop', defaultConfig.databaseUsername, defaultConfig.databasePassword, {
    host: 'localhost',
    port: defaultConfig.databasePort,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    },
    
    define: {
        "createdAt": "createdat",
        "updatedAt": "updatedat"
      }
});