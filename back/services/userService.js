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

async function getAllCategories() {
    let categories = await category.getAllCategory();
    console.log(categories);
    return categories;
}

async function getProductsByCategory(categoryId) {
    let products = await product.findProductsByCategory(categoryId);
    console.log(products);
    return products;
}

async function getProductsSortedByPrice(order) {
    let products = await product.getProductsSortedByPrice(order);
    console.log(products);
    return products;   
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

module.exports = {getAllProducts, getAllCategories, getProductsByCategory, getProductsSortedByPrice};