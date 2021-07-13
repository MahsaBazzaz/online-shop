const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const User = require('../../models/Users');

router.get('/', (req, res) => {
    User.findAll()
        .then((users) => { console.log(users) })
        .catch(err => console.log(err));
    res.sendStatus(200);
});


function createUser(newUser) {
    return User.create(newUser)
        .then((user) => { return user; })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function getUserById(userId) {
    return User.findByPk(userId)
        .then((foundUser) => {
            return foundUser;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}

function editUser(newFields, userId) {
    return User.update(newFields, { where: { id: userId } })
        .then((user) => { return user; })
        .catch(err => {
            console.log(err);
            return null;
        });
}


module.exports = { router, createUser, editUser, getUserById };