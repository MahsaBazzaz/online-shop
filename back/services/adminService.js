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
    let receipts = await Receipt.getAllReceiptsForAdmin();
    return receipts;
}

async function getAllProducts(page, productsInPage) {

    let products = await Product.getAllProducts(page, productsInPage);
    for (pro of products) {
        pro.category = await Category.mapCategoryIdToCategoryName(pro.category_id);
    }

    let pages = await Product.getAllPages(productsInPage);

    return [products, pages];
}

async function getProduct(product_id) {

    let product = await Product.getProductById(product_id);
    product.categoryName = await Category.mapCategoryIdToCategoryName(pro.category_id);
    return product;
}

async function searchReceiptsByTackingCode(trackingCode) {
    return await Receipt.findReceiptByTrackingCode(trackingCode);
}

async function changeReceiptStatus(receiptId, newStatus) {
    console.log(newStatus);
    statuses = {s1: "لغو شده", s2: "در حال انجام", s3: "انجام شده"};
    if (newStatus == 1 || newStatus == 2 || newStatus == 3) {
        const result = await Receipt.editReceipt({ status: statuses["s" + newStatus] }, receiptId);
        if (result != null) {
            return { stat: true, message: "operation was successfully done" };
        } else {
            return { stat: false, message: "operation failed" };
        }
    } else {
        return { stat: false, message: "invalid status" }
    }
}

async function createCategory(newCategory) {
    const createdCategory = await Category.createCategory(newCategory);
    if (createCategory != null) {
        return { stat: true, message: "successfuly created category" };
    } else {
        return { stat: true, message: "could not create category" };
    }
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

async function createOrUpdateProduct(product_id, newFields) {

    const createdOrUpdated = await Product.createOrUpdateProduct(product_id, newFields);
    if (createdOrUpdated != null) {
        return { stat: true, message: "operation was successfully done" }
    } else
        return { stat: false, message: "operation failed" }
}

module.exports = {
    editProduct,
    getAllReceipts,
    getAllProducts,
    getProduct,
    searchReceiptsByTackingCode,
    changeReceiptStatus,
    createCategory,
    editCategory,
    deleteCategory,
    getAllReceiptsForAdmin,
    createOrUpdateProduct
};