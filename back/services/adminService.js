const Category = require('./db/categories');
const Product = require('./db/products');
const Receipt = require('./db/receipts');


async function editProduct(productId, newFields) {
    return await Product.editProduct(newFields, productId);
}

async function getAllReceipts(userId) {
    return await Receipt.getAllReceipts(userId);
}

async function getAllReceiptsForAdmin() {
    return await Receipt.getAllReceiptsForAdmin();
}

async function searchReceiptByTackingCode(trackingCode) {
    return await Receipt.findReceiptByTrackingCode(trackingCode);
}

async function changeReceiptStatus(receiptId, newStatus) {
    return await Receipt.editReceipt({ "status": newStatus }, receiptId);
}

async function createCategory(newCategory) {
    return await Category.createCategory(newCategory);
}

async function editCategory(categoryId, newFields) {
    return await Category.editCategory(newFields, categoryId);
}

async function deleteCategory(categoryId) {
    return await Category.deleteCategory(categoryId);
}

module.exports = {
    editProduct,
    getAllReceipts,
    searchReceiptByTackingCode,
    changeReceiptStatus,
    createCategory,
    editCategory,
    deleteCategory,
    getAllReceiptsForAdmin
};