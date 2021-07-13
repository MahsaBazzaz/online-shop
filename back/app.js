const express = require("express");
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


// userService.getAllProducts();
// userService.getAllCategories();
// userService.getProductsByCategory(1);
// userService.getProductsByCategory(2);
// userService.getProductsSortedByPrice("ASC");


const app = express();

//app.get('/', (req, res) => res.send("INDEX"));
//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});