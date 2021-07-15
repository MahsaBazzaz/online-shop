const express = require("express");
const cors = require('cors')
    //const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const btoa = require('btoa');
const port = 3000;
// DB
const db = require("../back/config/database");
// DB Test
const dbTest = require("../back/tests/databaseServices");

//services Test
const userService = require("../back/services/userService");
const adminService = require("../back/services/adminService");
const authService = require("../back/services/authenticationService")

// test database connection
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => res.send("INDEX"));

// get allcategories
app.get('/viewer/getAllCategories', async(req, res) => {
    console.log(req.query);
    const allCategories = await userService.getAllCategories();
    res.send(allCategories);
});


app.use('/login', async(req, res, next) => {
    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        // Admin Access granted...
        // route to admin panel;
        const header = "Basic " + btoa(auth.login + ":" + auth.password);
        cookie = "Authorization=" + header;
        res.send({ result: true, cookie: cookie, url: "admin.html" });
    } else {
        authResult = await authService.userAuth(login, password);

        console.log(authResult);
        if (authResult != null && authResult.length == 1) {
            //User Access granted
            const header = "Basic " + btoa(authResult[0].username + ":" + authResult[0].password);
            cookie = "Authorization=" + header;
            res.send({ result: true, cookie: cookie, url: "profile.html" });

        } else {
            //Access denied
            res.send({ result: false, cookie: null, url: "error.html" });
        }
    }


})


app.use('/admin', (req, res, next) => {
    console.log(req.headers.authorization);

    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next();
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
    res.status(401).send('Authentication required.'); // custom message
});

app.use('/user', async(req, res, next) => {

    console.log(req.headers);
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    console.log(login + "..........." + password);
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...
            res.header('firstname', authResult[0].firstname);
            console.log("hi");
            console.log(authResult[0]);
            res.send(authResult[0].firstname);
            return next();

        }

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }

});

app.post('/viewer/getProducts', async(req, res) => {
    body = req.body;
    console.log(body);
    const response = await userService.getProducts(body);
    res.send(response);

});

app.get('/user/getFirstname', async(req, res) => {
    console.log("dfhvgdfskghkdfshbkhdfbgngfbnukfgnbukgfnbkubgk");
    res.sendStatus(200);
});

app.get('/admin/getAllReceipts', async(req, res) => {
    const receipts = await adminService.getAllReceiptsForAdmin();
    console.log(receipts);
    res.send(receipts);
})


//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});