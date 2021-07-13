const user = require("../../back/services/db/users");
const category = require("../../back/services/db/categories");
const product = require("../../back/services/db/products");
const receipt = require("../../back/services/db/receipts");
const { response } = require("express");


async function getAllProducts() {
    let products = await product.getAllProducts();
    console.log(products);
    return products;
}

function getAllCategories() {
    categories = category.getAllCategories();
    console.log(categories);
}

function getProductsByCategory(categoryId) {

}

function getProductsSortedByPrice(order) {
    
}

function getProductsSortedBySold(order) {
    
}

function getProductsInPriceRange(range) {
    
}

function signup(userInfo) {
    
}

function login(userInfo) {
    
}

function editProfile(userId, newFields) {
    
}

function getReceipts(userId) {
    
}

function purchase(userId, productId, count) {
    
}

function chargeCredit(userId, chargeAmount) {
    
}

module.exports = {getAllProducts, getAllCategories};