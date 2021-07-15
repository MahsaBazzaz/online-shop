const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Product = require('../../models/Product');

function getAllProducts(page, productsInPage) {
    const offset = productsInPage * (page - 1);
    const limit = productsInPage;
    return Product.findAll({ offset: offset, limit: limit })
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

function findProductWithName(productname, page, productsInPage) {
    const offset = productsInPage * (page - 1);
    const limit = productsInPage;
    return Product.findAll({
            offset: offset,
            limit: limit,
            where: { name: productname }
        })
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function findProductsByCategory(categoryIds, page, productsInPage) {
    const offset = productsInPage*(page-1);
    const limit = productsInPage;
    return Product.findAll({offset: offset, limit: limit, where: { category_id: categoryIds } })
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}


function getProducts(state) {
    const page = state.page_number;
    const productsInPage = state.products_in_page;

    const offset = productsInPage*(page-1);
    const limit = productsInPage;

    

    console.log(state.order);
    return Product.findAll({
            offset: offset,
            limit: limit,
            where: state.where,
            order: [[state.order.by, state.order.order]]
    })
        .then((foundProducts) => {
            return foundProducts;
    })
        .catch (err => {
            console.log(err);
            return null;
    });
}

function getProductById(productId) {
    return Product.findByPk(productId)
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getProductsInPriceRange(order, page, productsInPage, range) {
    const { Op } = require('sequelize');
    const offset = productsInPage * (page - 1);
    const limit = productsInPage;
    return Product.findAll({
            offset: offset,
            limit: limit,
            where: {
                price: {
                    [Op.between]: [range.min, range.max]
                }
            }
        })
        .then((foundProduct) => {
            return foundProduct;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getProductsSortedByPrice(descOrAsc, page, productsInPage) {
    const offset = productsInPage * (page - 1);
    const limit = productsInPage;
    return Product.findAll({
            offset: offset,
            limit: limit,
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

function getProductsSortedBySold(descOrAsc, page, productsInPage) {
    const offset = productsInPage * (page - 1);
    const limit = productsInPage;
    return Product.findAll({
            offset: offset,
            limit: limit,
            order: [
                ['sold', descOrAsc]
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

function getProductsSortedByCreationDate(descOrAsc, page, productsInPage) {
    const offset = productsInPage * (page - 1);
    const limit = productsInPage;
    return Product.findAll({
            offset: offset,
            limit: limit,
            order: [
                ['createdat', descOrAsc]
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

module.exports = {
    getAllProducts,
    createProduct,
    editProduct,
    findProductWithName,
    findProductsByCategory,
    getProductsSortedByPrice,
    getProductsInPriceRange,
    getProductsSortedBySold,
    getProductsSortedByCreationDate,
    truncateProductTable,
    getProductById,
    getProducts
};