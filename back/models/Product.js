const Sequelize = require("sequelize");
const db = require("../config/database");

const Product = db.define('products', {
    name: {
        type: Sequelize.STRING
    },
    category_id: {
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
    image: {
        type: Sequelize.STRING
    },
    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Product;