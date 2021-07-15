let creditRaise = 1000;

window.onload = function() {
    
    // check if cookie is set or not
    if (getCookie("Authorization") != null) {

        document.getElementById("homepage").addEventListener("click", function(){
            window.location.replace("index.html");
        });

        document.getElementById("products").addEventListener("click", function(){
            window.location.replace("index.html#products");
        });
        
        document.getElementsByClassName("logout-btn")[0].addEventListener("click", function() {
            logout();
        });

        document.getElementsByClassName("profile-btn")[0].addEventListener("click", function() {
            window.location.replace("profile.html");
        });

        document.getElementById("increase-credit").addEventListener("click", function() {
            increaseCredit(getCookie("Authorization"), creditRaise);
        });

        document.getElementById("edit-profile").addEventListener("click", function() {
            const firstname = document.getElementById("firstname-input").value;
            const lastname = document.getElementById("lastname-input").value;
            const password = document.getElementById("password-input").value;
            const address = document.getElementById("address-input").value;
            const newFields = { firstname: firstname,
                                lastname: lastname,
                                address: address};

            if (password.length >= 6) {
                newFields.password = password;
            }
            editUserInfo(getCookie("Authorization"), newFields);
        });
        
        getUserInfo(getCookie("Authorization"));

    } else {
        document.getElementsByClassName("dropdown-content")[0].style.display = "none";
        window.location.replace("index.html");
    }
    
    
    tabs = ["tab1", "tab2"];
    classes = ["profile-section", "reciepts-section"]
    document.getElementById(tabs[0]).addEventListener("click", function() {
        makeProfileVisible();
        // get profile info
        getUserInfo(getCookie("Authorization"));

    });
    document.getElementById(tabs[1]).addEventListener("click", function() {
        makeRecieptVisible();
        getUserInfo(getCookie("Authorization"));
        // get receipts info
        getAllReceipts(getCookie("Authorization"));
    });

}


function makeProfileVisible() {
    document.getElementById("tab2").classList.remove('selected-tab');
    document.getElementById("tab2").classList.add('un-selected-tab');

    document.getElementById("tab1").classList.remove('un-selected-tab');
    document.getElementById("tab1").classList.add('selected-tab');

    document.getElementsByClassName("reciepts-section")[0].style.display = "none";
    document.getElementsByClassName("profile-section")[0].style.display = "flex";
    document.getElementsByClassName("credit-section")[0].style.display = "flex";



}

function makeRecieptVisible() {
    document.getElementById("tab1").classList.remove('selected-tab');
    document.getElementById("tab1").classList.add('un-selected-tab');

    document.getElementById("tab2").classList.remove('un-selected-tab');
    document.getElementById("tab2").classList.add('selected-tab');

    document.getElementsByClassName("profile-section")[0].style.display = "none";
    document.getElementsByClassName("credit-section")[0].style.display = "none";
    document.getElementsByClassName("reciepts-section")[0].style.display = "flex";


}


function logout() {
    document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.replace("index.html");

}


function getUserInfo(cookie) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/user/getUserInfo`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.send();
    
    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            if (xhttp.responseText) {
                res = JSON.parse(xhttp.responseText);
                document.getElementsByClassName("welcome-name")[0].innerText = res.firstname;
                document.getElementsByClassName("dropdownbtn")[0].innerText = res.firstname;
                document.getElementById("firstname-input").value = res.firstname;
                document.getElementById("lastname-input").value = res.lastname;
                document.getElementById("address-input").value = res.address;
                document.getElementById("password-input").value = "";
                document.getElementsByClassName("credit")[0].innerText = res.credit;

            }
        }
    }
}


function increaseCredit(cookie, amount) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://localhost:3000/user/increaseCredit`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Accept", "application/json");
    jsonObject = JSON.stringify({amount: amount});
    xhttp.send(jsonObject);
    
    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            if (xhttp.responseText) {
                res = JSON.parse(xhttp.responseText);
                newCredit = res.credit;
                document.getElementsByClassName("credit")[0].innerHTML = newCredit;   
            }
        }
    }
}

function editUserInfo(cookie, newFields) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://localhost:3000/user/editUserInfo`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Accept", "application/json");
    jsonObject = JSON.stringify({fields: newFields});
    xhttp.send(jsonObject);
    
    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            if (xhttp.responseText) {
                res = JSON.parse(xhttp.responseText);
                
                // edit cookie if password is changed
                if ("password" in newFields) {
                    document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                    document.cookie = res.password + "; Secure";
                    getUserInfo(res.password);
                } else {
                    getUserInfo(cookie);
                }

            }
        }
    }
}

function getAllReceipts(cookie) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/user/getAllReceipts`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            if (xhttp.responseText) {
                res = JSON.parse(xhttp.responseText);
                //console.log(res);
                showReceipts(res)
            }
        }
    }
}


function showReceipts(receipts) {
    receiptsTable = document.getElementsByClassName("receipts-table")[0];
    receiptsTable.innerHTML =   "<tr>" +
                                    "<th>کد پیگیری</th>" +
                                    "<th>کالا</th>" +
                                    "<th>قیمت پرداخت شده</th>" +
                                    "<th>آدرس ارسال شده</th>" +
                                "</tr>";

    for (let receipt of receipts) {
        receiptsTable.appendChild(createReceipt(receipt));
    }
}

function createReceipt(receipt) {
    const newRow = document.createElement("tr");

    const trackingCodeColumn = document.createElement("td");
    const nameColumn = document.createElement("td");
    const costColumn = document.createElement("td");
    const addressColumn = document.createElement("td");

    trackingCodeColumn.innerText = receipt.tracking_code;
    nameColumn.innerText = receipt.product_name;
    costColumn.innerText = receipt.total_cost;
    addressColumn.innerText = receipt.user_address;

    newRow.appendChild(trackingCodeColumn);
    newRow.appendChild(nameColumn);
    newRow.appendChild(costColumn);
    newRow.appendChild(addressColumn);

    return newRow;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}