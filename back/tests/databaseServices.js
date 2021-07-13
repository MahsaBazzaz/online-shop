const product = require("../services/db/products");
const category = require("../services/db/categories");

//truncate database 
async function TestTruncate() {
    await product.truncateProductTable();
    await category.truncateTable();
}
// create category
async function testCreateCategory() {
    await category.createCategory({ "name": "books" });
}

// create product
async function testCreateProduct() {
    let createdCategory = await category.createCategory({ "name": "bags" });
    console.log(createdCategory);
    product.createProduct({
        "name": "keyboard",
        "category_id": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0
    });
}

// edit category
async function testEditCategory() {
    let createdCategory = await category.createCategory({ "name": "health" });
    category.editCategory({ "name": "cosmetic" }, createdCategory.dataValues.id);
}

// edit product
async function testEditProduct() {
    let createdCategory = await category.createCategory({ "name": "clothes" });
    let createdProduct = await product.createProduct({
        "name": "scarf",
        "category_id": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0,
    });
    product.editProduct({ "price": 2000 }, createdProduct.dataValues.id);
}

// find product with name
async function testFindProductWithName() {
    let createdCategory = await category.createCategory({ "name": "clothes" });

    let createdProduct = await product.createProduct({
        "name": "scarf",
        "category_id": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0,
    });
    product.findProductWithName(createdProduct.dataValues.name);
}

// order product by price
async function testSortProductWithPrice() {
    let createdCategory = await category.createCategory({ "name": "clothes" });
    console.log(createdCategory);
    await product.createProduct({
        "name": "scarf",
        "category_id": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0,
    });
    await product.createProduct({
        "name": "jacket",
        "category_id": createdCategory.dataValues.id,
        "price": 2000,
        "remaining": 10,
        "sold": 0,
    });
    let sortedProducts = await product.getProductsSortedByPrice('DESC');
    console.log(sortedProducts.length);
}
module.exports = {
    TestTruncate,
    testCreateCategory,
    testCreateProduct,
    testEditCategory,
    testEditProduct,
    testFindProductWithName,
    testSortProductWithPrice
};