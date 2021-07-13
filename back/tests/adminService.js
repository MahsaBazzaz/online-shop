const Category = require('../services/db/categories');
const Product = require('../services/db/products');
const Receipt = require('../services/db/receipts');
const Admin = require("../services/adminService");
const User = require("../services/db/users");

async function testGetAllReceipts() {
    let user = await User.createUser({ "firstname": "david", "lastname": "david zade", "credit": 100, "username": "davidd", "password": "123", "address": "LA" });
    console.log(user);
    let receipts = await Admin.getAllReceipts(user.id);
    console.log(receipts.length);
}

module.exports = {
    testGetAllReceipts
};