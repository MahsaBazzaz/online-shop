const express = require("express");
//const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
// DB
const db = require("../back/config/database");
// DB Test
const dbTest = require("../back/tests/databaseServices");
// test database connection
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));
// test database services
// truncate table before running
// dbTest.testCreateCategory();
dbTest.testCreateProduct();
// dbTest.testEditCategory();
// dbTest.testEditProduct();
// dbTest.testFindProductWithName();

const app = express();

app.get('/', (req, res) => res.send("INDEX"));

//user.createUser({"firstname": "david", "lastname": "david zade", "credit": 100, "username": "davidd", "password": "123", "address": "LA"});

// user.editUser({"firstname": "amghezi"}, 3);

app.use("/admin", require("./services/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});