const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Admin = require('../models/Admin');

router.get('/', (req, res) => {
    Admin.findAll()
        .then((admin) => { console.log(admin) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});

module.exports = router;