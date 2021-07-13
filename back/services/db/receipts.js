const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Receipt = require('../../models/Receipts');

router.get('/', (req, res) => {
    Receipt.findAll()
        .then((receipt) => { console.log(receipt) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});


function createReceipt(newReceipt) {
    return Receipt.create(newReceipt)
        .then((receipt) => { return receipt })
        .catch(err => {
            console.log(err);
            return null;
        });
}

module.exports = { router, createReceipt };