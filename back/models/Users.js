const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define('users', {


    id: {
        type: Sequelize.I
    },

    username: {
        type: Sequelize.STRING
    },

    password: {
        type: Sequelize.STRING
    },

    firstname: {
        type: Sequelize.STRING
    },

    lastname: {
        type: Sequelize.STRING
    },

    address: {
        type: Sequelize.STRING
    },

    credit: {
        type: Sequelize.INTEGER
    },

});

module.exports = User;