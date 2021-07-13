const Category = require('../services/db/categories');
const Product = require('../services/db/products');
const Receipt = require('../services/db/receipts');
const Admin = require("../services/adminService");
const User = require("../services/db/users");

async function testGetAllReceipts() {
    let receipts = await Admin.getAllReceipts(user.dataValues.id);
    console.log(receipts.length);
}

module.exports = {
    testGetAllReceipts
};