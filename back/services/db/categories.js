const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Category = require('../../models/Category');
const Product = require('../../models/Product');

function getAllCategory() {
    return Category.findAll()
        .then((categories) => { return categories; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function createCategory(newcategory) {
    return Category.create(newcategory)
        .then((createdCategory) => {
            return createdCategory;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function editCategory(editedFields, categoryId) {
    return Category.update(editedFields, { where: { id: categoryId } })
        .then((editedCategory) => {
            return editedCategory;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

// Truncate the table
function truncateTable() {
    return Category.destroy({ truncate: true, cascade: true })
        .then(() => {
            return 1;
        })
        .catch(err => {
            console.log(err);
            return 0;
        });

}
module.exports = { getAllCategory, createCategory, editCategory, truncateTable };