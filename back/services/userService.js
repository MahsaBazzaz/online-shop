const user = require("../../back/services/db/users");
const category = require("../../back/services/db/categories");
const product = require("../../back/services/db/products");
const receipt = require("../../back/services/db/receipts");
const { response } = require("express");
var randomstring = require("randomstring");
const Sequelize = require("sequelize");

// async function getAllProducts(page, productsInPage) {
//     let products = await product.getAllProducts(page, productsInPage);
//     for (pro of products) {
//         pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//     }
//     console.log(products);
//     return products;
// }

async function getAllCategories() {
    let categories = await category.getAllCategory();
    // console.log(categories);
    return categories;
}

// async function getProductsByCategory(categoryStates, page, productsInPage) {
//     let trueCategories = [];
//     for (let cat in categoryStates) {
//         if (categoryStates[cat]) {
//             trueCategories.push(cat);
//         }
//     }

//     if (trueCategories.length == 0) {
//         return await getAllProducts(page, productsInPage);
//     } else {
//         let products = await product.findProductsByCategory(trueCategories, page, productsInPage);
//         for (pro of products) {
//             pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//         }

//         console.log(products);
//         return products;
//     }

// }


// async function getProductsSortedByPrice(order, page, productsInPage) {
//     let products = await product.getProductsSortedByPrice(order, page, productsInPage);
//     for (pro of products) {
//         pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//     }
//     console.log(products);
//     return products;
// }

// async function getProductsSortedBySold(order, page, productsInPage) {
//     let products = await product.getProductsSortedBySold(order, page, productsInPage);
//     for (pro of products) {
//         pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//     }
//     console.log(products);
//     return products;
// }

// async function getProductsSortedByCreationDate(order, page, productsInPage) {
//     let products = await product.getProductsSortedByCreationDate(order, page, productsInPage);
//     for (pro of products) {
//         pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//     }
//     console.log(products);
//     return products;
// }

// async function getProductsInPriceRange(order, page, productsInPage, range) {
//     let products = await product.getProductsInPriceRange(order, page, productsInPage, range);
//     for (pro of products) {
//         pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//     }
//     console.log(products);
//     return products;
// }

// async function searchProductByName(productName, page, productsInPage) {
//     let products = await product.findProductWithName(productName, page, productsInPage);
//     for (pro of products) {
//         pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
//     }
//     console.log(products);
//     return products;
// }

async function signup(userInfo) {
    userInfo.credit = 0;
    let createdUser = await user.createUser(userInfo);
    if (createdUser == null) {
    } else {
        userInfo = {
            id: createdUser.id,
            username: createdUser.username,
            password: createdUser.password
        }
        return userInfo;
    }
    
    return null;
}

function login(userInfo) {

}

async function editProfile(userId, newFields) {
    let editedUser = await user.editUser(newFields, userId);
    if (editedUser) {
        return await user.getUserById(userId);
    } else {
        return null;
    }
}

async function getReceipts(userId) {
    let receipts = await receipt.getAllReceipts(userId);
    // console.log(receipts);
    return receipts;
}

async function purchase(userId, productId, count) {
    //check if count > 0
    if (count <= 0) {
        return { stat: false, message: "Count must be positive" }
    }
    //check if count is integer
    if (count != Math.floor(count)) {
        console.log(count, Math.floor(count))
        return { stat: false, message: "Count must be integer" }
    }
    //check if number of remaining products in stock is enough
    let purchasedProduct = await product.getProductById(productId);
    if (count > purchasedProduct.remaining) {
        return { stat: false, message: "Not enough in stock" }
    }   
    //check if credit is enough
    let buyerUser = await user.getUserById(userId);
    totalCost = count * purchasedProduct.price;
    if (totalCost > buyerUser.credit) {
        return { stat: false, message: "Not enough credit" }

    }

    //create new receipt
    newReceipt = {};
    newReceipt.product_name = purchasedProduct.name;
    newReceipt.product_count = count;
    newReceipt.user_id = userId;
    newReceipt.user_firstname = buyerUser.firstname;
    newReceipt.user_lastname = buyerUser.lastname;
    newReceipt.user_address = buyerUser.address;
    newReceipt.total_cost = totalCost;
    newReceipt.tracking_code = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    }); //must be generated uniqely for each receipt

    newReceipt.status = "در حال انجام";


    //add new receipt to receipts table
    purchaseReceipt = await receipt.createReceipt(newReceipt);


    //update user credit
    newCredit = buyerUser.credit - totalCost;
    let buyerUserAfterPurchase = await user.editUser({ credit: newCredit }, userId);

    //update remaining products
    newRemaining = purchasedProduct.remaining - count;
    newSold = purchasedProduct.sold + count;
    let purchasedProductAfterPurchase = await product.editProduct({ remaining: newRemaining, sold: newSold }, productId);


    console.log(buyerUserAfterPurchase);
    return { stat: true, message: "parchused succesfully done" }
}

async function chargeCredit(userId, chargeAmount) {
    if (chargeAmount <= 0) {
        return console.error("Error: Charge amount must be positive");
    }
    let userToBeCharged = await user.getUserById(userId);
    newCredit = userToBeCharged.credit + chargeAmount;
    let editedUser = await user.editUser({ credit: newCredit }, userId);
    if (editedUser) {
        return await user.getUserById(userId);
    } else {
        return null;
    }
}


async function getProducts(state) {
    state.where = {};
    let trueCategories = [];
    for (let cat in state.category_states) {
        if (state.category_states[cat]) {
            trueCategories.push(cat);
        }
    }
    if (trueCategories.length > 0) {
        state.where.category_id = trueCategories;
    }
    if (state.searched_term != "") {
        like = {
            [Sequelize.Op.iLike]: "%" + state.searched_term + "%"
        };
        state.where.name = like;
    }

    let products = await product.getProducts(state);

    for (pro of products) {
        pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
    }

    let pages = await product.getPages(state);

    return [products, pages];
}

async function getProduct(product_id) {
    let pro = await product.getProductById(product_id);
    pro.category = await category.mapCategoryIdToCategoryName(pro.category_id);
    return pro;
}
module.exports = {
    // getAllProducts,
    getAllCategories,
    // getProductsByCategory,
    // getProductsSortedByPrice,
    // getProductsSortedBySold,
    // getProductsSortedByCreationDate,
    // getProductsInPriceRange,
    // searchProductByName,
    signup,
    editProfile,
    getReceipts,
    purchase,
    chargeCredit,
    getProducts,
    getProduct
};