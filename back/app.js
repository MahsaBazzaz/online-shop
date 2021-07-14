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


//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});