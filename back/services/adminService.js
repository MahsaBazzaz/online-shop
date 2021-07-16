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
    if (categoryId != 1) {
        const edited_category = await Category.editCategory(newFields, categoryId);
        if (edited_category != null) {
            return { stat: true, message: "successfuly edited category" }
        } else
            return { stat: false, message: "could not edit category" }
    } else
        return { stat: false, message: "cannot edit category" }

}

async function deleteCategory(categoryId) {
    if (categoryId != 1) {
        const products_affected = await Product.findProductsByCategory(categoryId);
        // console.log(products_affected)
        const deleted_category = await Category.deleteCategory(categoryId);
        if (deleted_category != null) {

            for (pro of products_affected) {
                Product.editProduct({ category_id: 1 }, pro.id);
            }
            return { stat: true, message: "successfuly deleted category" }
        } else
            return { stat: false, message: "could not delete category" }
    } else
        return { stat: false, message: "cannot delete category" }

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