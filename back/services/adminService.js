const Category = require('./db/categories');
const Product = require('./db/products');
const Receipt = require('./db/receipts');


async function editProduct(productId, newFields) {
    await Product.editProduct(newFields, productId);
}

async function getAllReceipts() {
    await Receipt.getAllReceipts();
}

async function searchReceiptByTackingCode(trackingCode) {
    await Receipt.findReceiptByTrackingCode(trackingCode);
}

async function changeReceiptStatus(receiptId, newStatus) {}

function createCategory(newCategory) {

}

function editCategory(categoryId, newFields) {

}

function deleteCategory(categoryId) {

}