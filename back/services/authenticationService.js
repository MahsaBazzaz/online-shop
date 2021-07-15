const user = require("../services/db/users");


async function userAuth(username, password) {
    return await user.auth(username, password);
}


module.exports = {userAuth}