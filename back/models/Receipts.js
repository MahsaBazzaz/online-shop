const Sequelize = require("sequelize");
const db = require("../config/database");

const Receipt = db.define('receipts', {
    
    product_name: {
        type: Sequelize.INTEGER
    },

    product_count: {
        type: Sequelize.INTEGER
    },

    user_firstname: {
        type: Sequelize.STRING
    },

    user_lastname: {
        type: Sequelize.STRING
    },

    user_address: {
        type: Sequelize.STRING
    },

    total_cost: {
        type: Sequelize.INTEGER
    },

    purchase_date: {
        type: Sequelize.DATE
    },

    tracking_code: {
        type: Sequelize.STRING
    },

    status: {
        type: Sequelize.STRING
    },

    createdat: {
        type: Sequelize.DATE
    },

    updatedat: {
        type: Sequelize.DATE
    }
});

module.exports = Receipt;