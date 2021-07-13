const Sequelize = require("sequelize");
const db = require("../config/database");

const Admin = db.define('admins', {
    username: {
        type: Sequelize.STRING
    },

    password: {
        type: Sequelize.STRING
    },

    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Admin;