const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Receipt = require('../../models/Receipts');


function getAllReceiptsForAdmin() {
    return Receipt.findAll()
        .then((foundreceipt) => {
            return foundreceipt;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getAllReceipts(userId) {
    return Receipt.findAll({
         where: { user_id: userId },
         order: [["purchase_date", "DESC"]] 
        })
        .then((foundreceipt) => {
            return foundreceipt;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function createReceipt(newReceipt) {
    return Receipt.create(newReceipt)
        .then((receipt) => { return receipt })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function editReceipt(newFields, receiptId) {
    return Receipt.update(newFields, { where: { id: receiptId } })
        .then((editedReceipt) => { return editedReceipt; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function findReceiptByTrackingCode(trackingCode) {
    return Receipt.findAll({ where: { tracking_code: trackingCode } })
        .then((foundreceipt) => {
            return foundreceipt;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}
module.exports = { getAllReceipts, createReceipt, editReceipt, findReceiptByTrackingCode, getAllReceiptsForAdmin };