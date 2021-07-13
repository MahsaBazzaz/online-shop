const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', (req, res) => {
    Category.findAll()
        .then((categories) => { console.log(categories) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});

async function createCategory(newcategory) {
    return Category.create(newcategory);
}

async function editCategory(editedFields, categoryId) {
    return Category.update(editedFields, { where: { id: categoryId } });
}
// Truncate the table
async function truncateTable() {
    await Product.destroy({
        truncate: true,
        cascade: true
    });
    return Category.destroy({ truncate: true, cascade: true });
}
module.exports = { router, createCategory, editCategory, truncateTable };