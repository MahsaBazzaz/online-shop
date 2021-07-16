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


app.use('/getProfilePageUrl', async(req, res) => {
    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        // Admin Access granted...
        // route to admin panel;
        res.send({ result: true, url: "admin.html" });
    } else {
        authResult = await authService.userAuth(login, password);

        console.log(authResult);
        if (authResult != null && authResult.length == 1) {
            //User Access granted
            res.send({ result: true, url: "profile.html" });

        } else {
            //Access denied
            res.send({ result: false, url: "error.html" });
        }
    }

})



app.use('/signup', async(req, res) => {
    const createdUser = await userService.signup(req.body.fields);
    console.log(createdUser);
    if (createdUser) {
        //User Created Successfully
        const header = "Basic " + btoa(createdUser.username + ":" + createdUser.password);
        cookie = "Authorization=" + header;
        res.send({ result: true, cookie: cookie, url: "profile.html" });

    } else {
        //Error
        res.send({ result: false, cookie: null, url: "error.html" });
    }
})




app.use('/userType', async (req, res) => {
    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        // Admin Access granted...
        // route to admin panel;
        res.send({ result: true, type: "admin" });
    } else {
        authResult = await authService.userAuth(login, password);

        console.log(authResult);
        if (authResult != null && authResult.length == 1) {
            //User Access granted
            res.send({ result: true, type: "user" });

        } else {
            //Access denied
            res.send({ result: false, type: "viewer" });
        }
    }


});

app.use('/getFirstname', async(req, res) => {
    adminName = "ادمین"
    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        //Admin access granted
        res.send(adminName);
    } else {
        const authResult = await authService.userAuth(login, password);
        // Verify login and password are set and correct
        if (authResult != null && authResult.length == 1) {
            if (login && password && login === authResult[0].username && password === authResult[0].password) {
                // User access granted...
                res.send(authResult[0].firstname);
            }

        } else {
            // Access denied...
            res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
            res.status(401).send('Authentication required.'); // custom message
        }

    }

});



app.use('/user/getUserInfo', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...
            res.send({
                firstname: authResult[0].firstname,
                lastname: authResult[0].lastname,
                address: authResult[0].address,
                credit: authResult[0].credit
            });
        }

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});


app.use('/user/getAllReceipts', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...
            const receipts = await userService.getReceipts(authResult[0].id);

            res.send(receipts);
        }

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});

app.use('/user/increaseCredit', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...
            const updatedUser = await userService.chargeCredit(authResult[0].id, req.body.amount);
            res.send(updatedUser);
        }

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});

app.use('/user/editUserInfo', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...

            let updatedUser = await userService.editProfile(authResult[0].id, req.body.fields);
            const header = "Basic " + btoa(updatedUser.username + ":" + updatedUser.password);
            cookie = "Authorization=" + header;
            updatedUser.password = cookie;
            res.send(updatedUser);
        }

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});

app.use('/user/getProductInfo', async(req, res) => {
    const info = await userService.getProduct(req.query.productId);
    res.send(info);
});

app.use('/user/purchase', async(req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const authResult = await authService.userAuth(login, password);
    // Verify login and password are set and correct
    if (authResult != null && authResult.length == 1) {
        if (login && password && login === authResult[0].username && password === authResult[0].password) {
            // Access granted...
            const result = await userService.purchase(authResult[0].id, req.query.productId, req.query.count);
            res.send(result);
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

// app.get('/user/getFirstname', async(req, res) => {
//     console.log("dfhvgdfskghkdfshbkhdfbgngfbnukfgnbukgfnbkubgk");
//     res.sendStatus(200);
// });

app.use('/admin/getAllReceipts', async(req, res) => {
    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        //Admin access granted
        const receipts = await adminService.getAllReceiptsForAdmin();
        res.send(receipts);

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});



app.use('/admin/searchReceiptsByTrackingCode', async(req, res) => {
    const auth = { login: 'admin', password: 'password' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        //Admin access granted
        term = req.query.term;
        const receipts = await adminService.searchReceiptsByTackingCode(term);
        res.send(receipts);

    } else {
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
        res.status(401).send('Authentication required.'); // custom message
    }
});

//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});