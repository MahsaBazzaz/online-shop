const user = require("../../back/services/db/users");
const category = require("../../back/services/db/categories");
const product = require("../../back/services/db/products");
const receipt = require("../../back/services/db/receipts");
const { response } = require("express");


async function getAllProducts(page, productsInPage) {
    let products = await product.getAllProducts(page, productsInPage);
    for (pro of products) {
        pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
    }
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

async function getProductsSortedBySold(order) {
    let products = await product.getProductsSortedBySold(order);
    console.log(products);
    return products;
}

async function getProductsInPriceRange(range) {
    let products = await product.getProductsInPriceRange(range);
    console.log(products);
    return products;
}

async function signup(userInfo) {
    userInfo.credit = 0;
    let createdUser = await user.createUser(userInfo);
    console.log(createdUser);
    return createdUser;
}

function login(userInfo) {
    
}

async function editProfile(userId, newFields) {
    let editedUser = await user.editUser(newFields, userId);
    console.log(editedUser);
    return editedUser;
}

async function getReceipts(userId, requestedUserId) {
    if (userId != requestedUserId) {
        return console.error("Error: you can't see someone else's receipts")
    }
    let receipts = await receipt.getAllReceipts(userId);
    console.log(receipts);
    return receipts;
}

async function purchase(userId, productId, count) {
    //check if number of remaining products in stock is enough
    let purchasedProduct = await product.getProductById(productId);
    if (count > purchasedProduct.remaining) {
        return console.error("Not enough in stock");
    }
    //check if credit is enough
    let buyerUser = await user.getUserById(userId);
    totalCost = count*purchasedProduct.price;
    if (totalCost > buyerUser.credit) {
        return console.error("Not enough credit");
    }

    //create new receipt
    newReceipt = {};
    newReceipt.product_name = purchasedProduct.name;
    newReceipt.product_count = count;
    newReceipt.user_id = userId;
    newReceipt.user_firstname = buyerUser.firstname;
    newReceipt.user_lastname = buyerUser.lastname;
    newReceipt.user_address = buyerUser.address;
    newReceipt.total_cost = totalCost;
    newReceipt.tracking_code = ""; //must be generated uniqely for each receipt
    newReceipt.status = "در حال انجام";


    //add new receipt to receipts table
    purchaseReceipt = await receipt.createReceipt(newReceipt);


    //update user credit
    newCredit = buyerUser.credit - totalCost;
    let buyerUserAfterPurchase = await user.editUser({credit: newCredit}, userId);

    //update remaining products
    newRemaining = purchasedProduct.remaining - count;
    newSold = purchasedProduct.sold + count;
    let purchasedProductAfterPurchase = await product.editProduct({remaining: newRemaining, sold: newSold}, productId);
    
    
    console.log(buyerUserAfterPurchase);
}

async function chargeCredit(userId, chargeAmount) {
    if (chargeAmount <= 0) {
        return console.error("Error: Charge amount must be positive");
    }
    let userToBeCharged = await user.getUserById(userId);
    newCredit = userToBeCharged.credit + chargeAmount;
    let editedUser = await user.editUser({credit: newCredit}, userId);

    console.log(editedUser);
    return editedUser;
}

module.exports = {
    getAllProducts,
    getAllCategories,
    getProductsByCategory, 
    getProductsSortedByPrice, 
    getProductsSortedBySold, 
    getProductsInPriceRange,
    signup,
    editProfile,
    getReceipts,
    purchase,
    chargeCredit};