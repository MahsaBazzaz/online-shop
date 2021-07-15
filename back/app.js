const express = require("express");
const cors = require('cors')
    //const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
// DB
const db = require("../back/config/database");
// DB Test
const dbTest = require("../back/tests/databaseServices");

//services Test
const userService = require("../back/services/userService");
const AdminService = require("../back/tests/adminService");
// test database connection
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send("INDEX"));
// get all products
app.get('/getAllProducts', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getAllProducts(req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// get sorted products by price
app.get('/getSortedProductsByPrice', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getProductsSortedByPrice(req.query.order, req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// get sorted products by sells
app.get('/getSortedProductsBySells', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getProductsSortedBySold(req.query.order, req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// get sorted products by creation date
app.get('/getSortedProductsByCreationDate', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getProductsSortedBySold(req.query.order, req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// search product by name
app.get('/searchProductByName', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.searchProductByName(req.query.productName, req.query.page, req.query.productsInPage);
    res.send(allProducts);
});

// get products in price range
app.get('/getProductsInPriceRange', async(req, res) => {
    console.log(req.query);
    var rangeObject = Object.create({});
    rangeObject.min = req.query.minPrice;
    rangeObject.max = req.query.maxPrice;
    const allProducts = await userService.getProductsInPriceRange(req.query.order, req.query.page, req.query.productsInPage, rangeObject);
    res.send(allProducts);
});

// get allcategories
app.get('/getAllCategories', async(req, res) => {
    console.log(req.query);
    const allCategories = await userService.getAllCategories();
    res.send(allCategories);
});

//get products by category
app.post('/getProductsByCategory', async(req, res) => {
    body = req.body;
    const products = await userService.getProductsByCategory(body, req.query.page, req.query.productsInPage);
    res.send(products);
});


app.post('/getProducts', async(req, res) => {
    body = req.body;
    console.log(body);
    const response = await userService.getProducts(body);
    res.send(response);

});


//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});