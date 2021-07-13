const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Product = require('../models/Product');

router.get('/', (req, res) => {
    Product.findAll()
        .then((products) => { console.log(products) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});

async function createProduct(newProduct) {
    return Product.create(newProduct);
}
async function editProduct(editedFields, productId) {
    return Product.update(editedFields, { where: { id: productId } });
}
async function findProductWithName(productname) {
    return Product.findAll({
        where: {
            name: productname
        }
    });
}

// Truncate the table
async function truncateProductTable() {
    return Product.destroy({
        truncate: true
    });
}

module.exports = { router, createProduct, editProduct, findProductWithName, truncateProductTable };