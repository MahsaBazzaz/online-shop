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

// test database connection
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));
// test database services
// truncate table before running
//dbTest.TestTruncate();
// dbTest.testCreateCategory();
// dbTest.testCreateProduct();
<<<<<<< HEAD
//dbTest.testEditCategory();
=======
// dbTest.testEditCategory();
>>>>>>> 5f9eed4116f31e2c40d0c331db7fa42e1c78e046
// dbTest.testEditProduct();
// dbTest.testFindProductWithName();
dbTest.testSortProductWithPrice();

userService.getAllProducts();

const app = express();

app.get('/', (req, res) => res.send("INDEX"));

app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});