const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Product = require('../../models/Product');

function getAllProducts() {
    return Product.findAll()
        .then((products) => { return products; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function createProduct(newProduct) {
    return Product.create(newProduct)
        .then((createdProduct) => {
            console.log(createdProduct);
            return createdProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function editProduct(editedFields, productId) {
    return Product.update(editedFields, { where: { id: productId } })
        .then((editedProduct) => {
            console.log(editedProduct);
            return editedProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function findProductWithName(productname) {
    return Product.findAll({ where: { name: productname } })
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function findProductsByCategory(categoryId) {
    return Product.findAll({ where: { category_id: categoryId } })
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getProductsSortedByPrice(descOrAsc) {
    return Product.findAll({
            order: [
                ['price', descOrAsc]
            ]
        })
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

// Truncate the table
function truncateProductTable() {
    return Product.destroy({ truncate: true, cascade: true })
        .then(() => {
            console.log("successfully truncated");
            return 1;
        })
        .catch(err => {
            console.log(err);
            return 0;
        });
}

module.exports = { getAllProducts, createProduct, editProduct, findProductWithName, findProductsByCategory, getProductsSortedByPrice, truncateProductTable };