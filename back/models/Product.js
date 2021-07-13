const Sequelize = require("sequelize");
const db = require("../config/database");

const Product = db.define('products', {
    name: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER
    },
    remaining: {
        type: Sequelize.INTEGER
    },
    sold: {
        type: Sequelize.INTEGER
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Product;