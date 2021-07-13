const {Sequelize} = require("sequelize");
const db = require("../config/database");

const User = db.define('users', {
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

    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = User;