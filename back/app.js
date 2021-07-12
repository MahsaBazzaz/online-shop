const express = require("express");
//const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

//DB
const db = require("../back/config/database");


//User
const user = require("../back/services/users");

//Test DB
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));

const app = express();

app.get('/', (req, res) => res.send("INDEX"));

user.createUser({"firstname": "david", "lastname": "david zade", "credit": 100, "username": "davidd", "password": "123", "address": "LA"});


app.use("/admin", require("./services/admin"));

app.use("/categories", require("./services/categories"));

app.use("/products", require("./services/products"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});