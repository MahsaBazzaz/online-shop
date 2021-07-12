const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Product = require('../models/Product');

router.get('/', (req, res) => {
    Product.findAll()
        .then((products) => { console.log(products) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});

module.exports = router;