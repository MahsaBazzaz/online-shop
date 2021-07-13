const product = require("../services/products");
const category = require("../services/categories");

// create category
function testCreateCategory() {
    category.createCategory({ "name": "books" })
        .then((createdCategory) => {
            console.log("testCreateCategory() " + createdCategory);
        })
        .catch(err => console.log("testCreateCategory() " + err));
}
// create product

function testCreateProduct() {
    category.createCategory({ "name": "technology" })
        .then((createdCategory) => {
            product.createProduct({
                "name": "keyboard",
                "category": createdCategory.id,
                "price": 1000,
                "remaining": 20,
                "sold": 0,
            });
        }).catch(err => console.log("testCreateProduct() " + err));
}
// edit category
function testEditCategory() {
    category.createCategory({
        "name": "health"
    }).then((createdCategory) => {
        category.editCategory({
            "name": "cosmetic"
        }, createdCategory.id);
    });
}
// edit product
function testEditProduct() {
    category.createCategory({
        "name": "clothes"
    }).then((createdCategory) => {
        product.createProduct({
            "name": "scarf",
            "category": createdCategory.id,
            "price": 1000,
            "remaining": 20,
            "sold": 0,
        }).then((createdProduct) => {
            product.editProduct({
                "price": 2000
            }, createdProduct.id);
        }).catch(err => console.log("testEditProduct() " + err));
    }).catch(err => console.log("testEditProduct() " + err));
}

// find product with name
function testFindProductWithName() {
    category.truncateTable()
        .then(() => {
            category.createCategory({
                "name": "clothes"
            }).then((createdCategory) => {
                product.createProduct({
                    "name": "scarf",
                    "category": createdCategory.id,
                    "price": 1000,
                    "remaining": 20,
                    "sold": 0,
                }).then((createdProduct) => {
                    product.findProductWithName(createdProduct.name)
                        .then((foundProduct) => {
                            console.log(foundProduct);
                        })
                        .catch(err => console.log("testFindProductWithName() " + err));
                }).catch(err => console.log("testFindProductWithName() " + err));
            }).catch(err => console.log("testFindProductWithName() " + err));
        })
        .catch(err => console.log("testFindProductWithName() " + err))
}

module.exports = { testCreateCategory, testCreateProduct, testEditCategory, testEditProduct, testFindProductWithName };