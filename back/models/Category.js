const Sequelize = require("sequelize");
const db = require("../config/database");

const Category = db.define('categories', {
    name: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Category;