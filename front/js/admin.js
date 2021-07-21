let currentPage = 1;
let pages = 0;
const productsInPage = 15;
let selected_product_id = -1;
window.onload = function() {

    if (getCookie("Authorization")) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:3000/userType`, true);
        xhttp.setRequestHeader("Authorization", getCookie("Authorization"));
        xhttp.send();

        xhttp.onreadystatechange = async(e) => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (xhttp.responseText) {
                    //console.log(xhttp.responseText);
                    result = JSON.parse(xhttp.responseText);
                    if (result.result == true && result.type == "admin") {
                        //admin access granted

                        //everything has to be implented here

                        getUserFirstName(getCookie("Authorization"));

                        document.getElementById("homepage").addEventListener("click", function() {
                            window.location.replace("index.html");
                        });

                        document.getElementById("products").addEventListener("click", function() {
                            window.location.replace("index.html#products");
                        });

                        document.getElementsByClassName("logout-btn")[0].addEventListener("click", function() {
                            logout();
                        });

                        document.getElementsByClassName("profile-btn")[0].addEventListener("click", function() {
                            goToProfilePage(getCookie("Authorization"));
                            //window.location.replace("profile.html");
                        });

                        document.getElementById("search_code_text").addEventListener("keydown", function() {
                            const term = document.getElementById("search_code_text").value;
                            searchReceiptsByTrackingCode(getCookie("Authorization"), term);
                        });

                        document.getElementById("search_code_text").addEventListener("keyup", function() {
                            const term = document.getElementById("search_code_text").value;
                            searchReceiptsByTrackingCode(getCookie("Authorization"), term);
                        });

                        document.getElementsByClassName("create-category-button")[0].addEventListener("click", function() {
                            document.getElementById("new-category-name").value = "";
                            document.getElementById("create-category-modal").style.display = "flex";
                            document.getElementById("new-category-name").focus();
                        });

                        document.getElementsByClassName("close-category-div")[0].addEventListener("click", function() {
                            document.getElementById("create-category-modal").style.display = "none";

                        });
                        
                        document.getElementById("submit-category").addEventListener("click", function() {
                            var xhttp = new XMLHttpRequest();
                            xhttp.open("POST", `http://localhost:3000/admin/createCategory`, true);
                            xhttp.setRequestHeader("Authorization", getCookie("Authorization"));
                            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                            xhttp.setRequestHeader("Accept", "application/json");
                            const newCategory = JSON.stringify({
                                name: document.getElementById("new-category-name").value
                            });
                            xhttp.send(newCategory);

                            xhttp.onreadystatechange = (e) => {
                                if (xhttp.readyState == 4 && xhttp.status == 200) {
                                    if (xhttp.responseText) {
                                        const result = JSON.parse(xhttp.responseText);
                                        if (result.stat) {
                                            alert(result.message);
                                            document.getElementById("create-category-modal").style.display = "none";
                                            getAllCategories();
                                        } else {
                                            alert("error:: " + result.message);
                                        }
                                    }

                                }
                            }


                        });

                        document.getElementsByClassName("create-product-button")[0].addEventListener("click", function() {
                            loadCategories();
                            selected_product_id = -1;
                            document.getElementById("product-name-field").value = "";
                            document.getElementById("product-category-field").value = 1;
                            document.getElementById("product-price-field").value = 0;
                            document.getElementById("product-remaining-field").value = 0;
                            document.getElementById("product-modal").style.display = "flex";
                        });

                        document.getElementsByClassName("close-product-div")[0].addEventListener("click", function() {
                            document.getElementById("product-modal").style.display = "none";

                        })

                        document.getElementById("save-changes").addEventListener("click", function() {
                            var xhttp = new XMLHttpRequest();
                            xhttp.open("POST", `http://localhost:3000/admin/CreateOrUpdateProduct?product_id=${selected_product_id}`, true);
                            xhttp.setRequestHeader("Authorization", getCookie("Authorization"));
                            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                            xhttp.setRequestHeader("Accept", "application/json");
                            const field = JSON.stringify({
                                name: document.getElementById("product-name-field").value,
                                category_id: document.getElementById("product-category-field").value,
                                price: document.getElementById("product-price-field").value,
                                remaining: document.getElementById("product-remaining-field").value
                            })
                            xhttp.send(field);

                            xhttp.onreadystatechange = (e) => {
                                if (xhttp.readyState == 4 && xhttp.status == 200) {
                                    if (xhttp.responseText) {
                                        const result = JSON.parse(xhttp.responseText);
                                        if (result.stat) {
                                            alert(result.message);
                                            document.getElementById("product-modal").style.display = "none";
                                            getAllProducts(getCookie("Authorization"), currentPage, productsInPage);
                                        } else {
                                            alert("error:: " + result.message);

                                        }
                                    }

                                }
                            }
                        })

                        tabs = ["tab1", "tab2", "tab3"];
                        tabDivs = ["product", "categories", "receipts"]
                        document.getElementById(tabs[0]).addEventListener("click", function() {
                            // products selected
                            // get pages and get products
                            getAllProducts(getCookie("Authorization"), currentPage, productsInPage);
                            selectTab(tabs, tabDivs, 0, 1, 2);

                        });
                        document.getElementById(tabs[1]).addEventListener("click", function() {
                            // categories selected
                            getAllCategories();
                            selectTab(tabs, tabDivs, 1, 0, 2);
                        });
                        document.getElementById(tabs[2]).addEventListener("click", function() {
                            // receipts selected
                            // get receipts info
                            getAllReceipts(getCookie("Authorization"));
                            selectTab(tabs, tabDivs, 2, 0, 1);
                        });

                        getAllProducts(getCookie("Authorization"), currentPage, productsInPage);

                        // let products = fillProducts();
                        // pages = Math.ceil(products.length / productsInPage);
                        // createPagination();
                        // showPage();


                    } else {
                        //access denied
                        console.log("Error");
                        window.location.replace("index.html");
                    }
                }
            }
        }
    } else {
        //no cookie
        console.log("Error");
        window.location.replace("index.html");
    }

    setTimeout(function(){ 
        document.getElementsByTagName("html")[0].style.visibility = "visible";
     }, 350);
}



function getAllReceipts(cookie) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/admin/getAllReceipts`, true);
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

function searchReceiptsByTrackingCode(cookie, term) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/admin/searchReceiptsByTrackingCode?term=${term}`, true);
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
    receiptsTable.innerHTML = "<tr>" +
        "<th>کد پیگیری</th>" +
        "<th>کالا</th>" +
        "<th>قیمت پرداخت شده</th>" +
        "<th>نام خریدار</th>" +
        "<th>آدرس ارسال شده</th>" +
        "<th>وضعیت رسید</th>" +
        "<th>تغییر وضعیت رسید</th>" +
        "</tr>";

    for (let receipt of receipts) {
        receiptsTable.appendChild(createReceipt(receipt));
    }

    for (let receipt of receipts) {

        document.getElementById("op1-" + receipt.id).addEventListener("click", function() {
            operationTabs = [`op1-${receipt.id}`, `op2-${receipt.id}`, `op3-${receipt.id}`];
            selectOperationTab(operationTabs, 0, 1, 2);
            editReceiptStatus(receipt.id, {status: 1})
        });
    
        document.getElementById("op2-" + receipt.id).addEventListener("click", function() {
            operationTabs = [`op1-${receipt.id}`, `op2-${receipt.id}`, `op3-${receipt.id}`];
            selectOperationTab(operationTabs, 1, 0, 2);
            editReceiptStatus(receipt.id, {status: 2})
        });
    
        document.getElementById("op3-" + receipt.id).addEventListener("click", function() {
            operationTabs = [`op1-${receipt.id}`, `op2-${receipt.id}`, `op3-${receipt.id}`];
            selectOperationTab(operationTabs, 2, 0, 1);
            editReceiptStatus(receipt.id, {status: 3})
        });
    }
}

function editReceiptStatus(receiptId, field) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://localhost:3000/admin/editReceiptStatus?receipt_id=${receiptId}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Authorization", getCookie("Authorization"));
    const obj = JSON.stringify(field);
    xhttp.send(obj);

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                res = JSON.parse(xhttp.responseText);
                const term = document.getElementById("search_code_text").value;
                searchReceiptsByTrackingCode(getCookie("Authorization"), term);
                //getAllReceipts(getCookie("Authorization"));
            }
        }
    }
}

function createReceipt(receipt) {
    const newRow = document.createElement("tr");

    const trackingCodeColumn = document.createElement("td");
    const nameColumn = document.createElement("td");
    const costColumn = document.createElement("td");
    const firstnameColumn = document.createElement("td");
    const addressColumn = document.createElement("td");
    const statusColumn = document.createElement("td");
    const operationsColumn = document.createElement("td");

    const operationsTab = document.createElement("div");

    operationsTab.className = "tripple-operations-container";
    const op1 = document.createElement("div");
    const op2 = document.createElement("div");
    const op3 = document.createElement("div");

    statusMapping = {"لغو شده": 1, "در حال انجام": 2, "انجام شده": 3}
    active = statusMapping[receipt.status];
    op1.className = "right-operation-tab operation-tab un-selected-operation-tab";
    op2.className = "center-operation-tab operation-tab un-selected-operation-tab";
    op3.className = "left-operation-tab operation-tab un-selected-operation-tab";
    if (active == 1) {
        op1.classList.remove("un-selected-operation-tab");
        op1.classList.add("selected-operation-tab");
    }
    if (active == 2) {
        op2.classList.remove("un-selected-operation-tab");
        op2.classList.add("selected-operation-tab");
    }
    if (active == 3) {
        op3.classList.remove("un-selected-operation-tab");
        op3.classList.add("selected-operation-tab");
    }

    op1.id = "op1-" + receipt.id;
    op2.id = "op2-" + receipt.id;
    op3.id = "op3-" + receipt.id;

    op1.innerHTML = `<a><i class="fa fa-times" aria-hidden="true"></i></a>`;
    op2.innerHTML = `<a><i class="fa fa-hourglass" aria-hidden="true"></i></a>`;
    op3.innerHTML = `<a><i class="fas fa-check"></i></a>`;

    
    


    operationsTab.appendChild(op1);
    operationsTab.appendChild(op2);
    operationsTab.appendChild(op3);

    operationsColumn.appendChild(operationsTab);

    trackingCodeColumn.innerText = receipt.tracking_code;
    nameColumn.innerText = receipt.product_name;
    costColumn.innerText = receipt.total_cost;
    firstnameColumn.innerText = receipt.user_firstname;
    addressColumn.innerText = receipt.user_address;
    statusColumn.innerText = receipt.status;

    newRow.appendChild(trackingCodeColumn);
    newRow.appendChild(nameColumn);
    newRow.appendChild(costColumn);
    newRow.appendChild(firstnameColumn);
    newRow.appendChild(addressColumn);
    newRow.appendChild(statusColumn);
    newRow.appendChild(operationsColumn);

    return newRow;
}

function selectTab(tabs, tabDivs, select, unselect1, unselect2) {
    document.getElementById(tabs[select]).classList.remove('un-selected-tab');
    document.getElementById(tabs[select]).classList.add('selected-tab');

    document.getElementById(tabs[unselect1]).classList.remove('selected-tab');
    document.getElementById(tabs[unselect1]).classList.add('un-selected-tab');

    document.getElementById(tabs[unselect2]).classList.remove('selected-tab');
    document.getElementById(tabs[unselect2]).classList.add('un-selected-tab');

    //console.log(tabDivs[select], tabDivs[unselect1], tabDivs[unselect2]);
    document.getElementById(tabDivs[select]).style.display = "flex";
    document.getElementById(tabDivs[unselect1]).style.display = "none";
    document.getElementById(tabDivs[unselect2]).style.display = "none";
}

function selectOperationTab(tabs, select, unselect1, unselect2) {
    document.getElementById(tabs[select]).classList.remove('un-selected-operation-tab');
    document.getElementById(tabs[select]).classList.add('selected-operation-tab');

    document.getElementById(tabs[unselect1]).classList.remove('selected-operation-tab');
    document.getElementById(tabs[unselect1]).classList.add('un-selected-operation-tab');

    document.getElementById(tabs[unselect2]).classList.remove('selected-operation-tab');
    document.getElementById(tabs[unselect2]).classList.add('un-selected-operation-tab');

}


function EditProductEvent(buttenID) {
    const pId = buttenID.split("edit-product-with-id-");
    var product_details = document.getElementById("product-with-id-" + pId[1]).getElementsByTagName('p');
    if (document.getElementById(buttenID).innerHTML == "ویرایش محصول") {
        for (var i = 0; i < product_details.length; i++)
            product_details[i].setAttribute('contenteditable', true);
        document.getElementById(buttenID).innerHTML = "ذخیره تغییرات";

    } else {
        for (var i = 0; i < product_details.length; i++)
            product_details[i].setAttribute('contenteditable', false);
        document.getElementById(buttenID).innerHTML = "ویرایش محصول";
    }
}

function fillProducts() {
    const productsNumber = 40;
    products = [];
    for (let i = 1; i <= productsNumber; i++) {
        b = { "name": "محصول " + i, "category": "دسته بندی " + i, "price": i * 1000 };
        products.push(b);
    }

    return products;
}

function showProducts(products) {
    productsBox = document.getElementsByClassName("products-box")[0];
    productsBox.innerHTML = "";
    //productsBox.scrollTop = 0; we should use animation for this
    for (product of products) {
        productsBox.appendChild(createProductBox(product));
        document.getElementById("edit-product-with-id-" + product.id).addEventListener("click", function() {
            loadCategories();

            const id = this.id.split("edit-product-with-id-")[1];
            selected_product_id = id;
            // ajax call to get product information
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://localhost:3000/admin/getProductWithId?product_id=${id}`, true);
            xhttp.setRequestHeader("Authorization", getCookie("Authorization"));
            xhttp.send();

            xhttp.onreadystatechange = (e) => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText) {
                        const response = JSON.parse(xhttp.responseText);
                        document.getElementById("product-name-field").value = response.name;
                        document.getElementById("product-category-field").value = response.category_id;
                        document.getElementById("product-price-field").value = response.price;
                        document.getElementById("product-remaining-field").value = response.remaining;
                    }
                }
            }
            document.getElementById("product-modal").style.display = "flex";

        })
    }
}

function createProductBox(product) {
    const newDiv = document.createElement("div");
    newDiv.className = "main-product-box";
    newDiv.innerHTML = '<div class="product-image-box">' +
        '<img src="../assets/img/product.jpg">' +
        '</div>' +
        '<div class="product-desc-box">' +
        '<p class="product-title">' + product.name + '</p>' +
        '<p class="product-category">' + product.category + '</p>' +
        '</div>' +
        '<hr>' +
        '<div class="product-price-box">' +
        '<p class="product-price">' + product.price + ' تومان</p>' +
        '<button id="edit-product-with-id-' + product.id + '" class="buy-product-button">ویرایش محصول</button>' +
        '</div>' +
        '<span class="badge">' + product.sold + '</span>';

    return newDiv;

}

function createPagination(cookie) {
    const pagination = document.getElementsByClassName("pagination")[0];
    pagination.innerHTML = ""
    if (pages > 0) {
        const prev = document.createElement("a");
        prev.id = "prev-btn";
        prev.innerHTML = 'صفحه قبل'
        if (currentPage == 1) {
            prev.classList.add("deactive");
        } else {
            prev.classList.remove("deactive");
        }
        prev.addEventListener("click", function() {
            goToPage(cookie, Math.max(1, currentPage - 1));
        });

        const next = document.createElement("a");
        next.id = "next-btn";
        next.innerHTML = 'صفحه بعد'
        if (currentPage == pages) {
            next.classList.add("deactive");
        } else {
            next.classList.remove("deactive");
        }
        next.addEventListener("click", function() {
            goToPage(cookie, Math.min(currentPage + 1, pages));
        });

        pagination.appendChild(prev);
        for (let i = 1; i <= pages; i++) {
            const page = document.createElement("a");
            page.id = "page" + i;
            page.innerHTML = i;
            if (i == currentPage) {
                page.className = "active";
            }
            page.addEventListener("click", function() {
                goToPage(cookie, i);
            });
            pagination.appendChild(page);
        }
        pagination.appendChild(next);
    }

}


function goToPage(cookie, pageNumber) {
    if (pageNumber != currentPage) {
        document.getElementById("page" + currentPage).classList.remove("active");
        document.getElementById("page" + pageNumber).classList.add("active");
        currentPage = pageNumber;
        
        const prev = document.getElementById("prev-btn");
        const next = document.getElementById("next-btn");
        if (currentPage == 1) {
            prev.classList.add("deactive");
        } else {
            prev.classList.remove("deactive");
        }
        if (currentPage == pages) {
            next.classList.add("deactive");
        } else {
            next.classList.remove("deactive");
        }
        
        getAllProducts(cookie, currentPage, productsInPage);
    }

}

function showPage() {
    let partition = products.slice((currentPage - 1) * productsInPage, Math.min(currentPage * productsInPage, products.length));
    showProducts(partition);
}

function getUserFirstName(cookie) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getFirstname`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.send();


    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            if (xhttp.responseText) {
                firstname = xhttp.responseText;
                dropdownbtn = document.getElementsByClassName("dropdownbtn")[0];
                dropdownbtn.innerHTML = firstname + " " + `<i class="fa fa-chevron-down" style="font-size: 7px" aria-hidden="true"></i>`;
                //dropdownbtn.innerText = firstname;
                //dropdownbtn.removeEventListener("click", showModal);
                //document.getElementsByClassName("dropdown-content")[0].style.display = "block";

            }
        }
    }
}

function logout() {
    document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.replace("index.html");

}

function goToProfilePage(cookie) {
    //ajax request for redirecting to profile page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getProfilePageUrl`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //console.log(xhttp.responseText);
                var objectResult = JSON.parse(xhttp.responseText);
                if (objectResult.result == true) {
                    window.location.replace(objectResult.url);
                } else {
                    alert("error:: could not go to profile page");
                }
            }
        }
    }
}

function getAllCategories() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/viewer/getAllCategories`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                categories = JSON.parse(xhttp.responseText);
                showCategories(categories);
            }
        }
    }
}

function showCategories(categories) {
    let category_table = document.getElementById('categories-table');
    category_table.innerHTML =
        '<colgroup>' +
        '<col style="width: 20%;" />' +
        '<col style="width: 15%;" />' +
        ' </colgroup>' +
        '<tr>' +
        ' <th>نام دسته بندی</th>' +
        '<th>عملیات</th>' +
        '</tr>';

    for (category of categories) {
        category_table.append(createCategoryBox(category));
        document.getElementById("category-edit-" + category.id).addEventListener("click", function() {
            document.getElementById("category-name-" + this.id.split("category-edit-")[1]).setAttribute('contenteditable', true);
            document.getElementById("category-name-" + this.id.split("category-edit-")[1]).focus();
            this.style.display = "none";
            document.getElementById("category-save-" + this.id.split("category-edit-")[1]).style.display = "inline-block";
        })
        document.getElementById("category-save-" + category.id).addEventListener("click", function() {
            const id = this.id.split("category-save-")[1];
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", `http://localhost:3000/admin/editCategory?category_id=${id}`, true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.setRequestHeader("Accept", "application/json");
            const newName = document.getElementById("category-name-" + this.id.split("category-save-")[1]).innerText;
            const obj = JSON.stringify({ name: newName });
            xhttp.send(obj);

            xhttp.onreadystatechange = (e) => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText) {
                        //put your code here 
                        result = JSON.parse(xhttp.responseText);
                        if (result.stat) {
                            alert(result.message);
                            getAllCategories();

                        } else {
                            alert(result.message);

                        }
                    }
                }
            }
            document.getElementById("category-name-" + this.id.split("category-save-")[1]).setAttribute('contenteditable', false);
            this.style.display = "none";
            document.getElementById("category-edit-" + this.id.split("category-save-")[1]).style.display = "inline-block";
        })
        document.getElementById("category-delete-" + category.id).addEventListener("click", function() {
            const id = this.id.split("category-delete-")[1];
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://localhost:3000/admin/deleteCategory?category_id=${id}`, true);
            xhttp.send();

            xhttp.onreadystatechange = (e) => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText) {
                        //put your code here 
                        result = JSON.parse(xhttp.responseText);
                        if (result.stat) {
                            alert(result.message);
                            getAllCategories();

                        } else {
                            alert(result.message);

                        }
                    }
                }
            }
        })
    }
}

function createCategoryBox(category) {
    const newTr = document.createElement("tr");
    const name = document.createElement("td");
    name.id = "category-name-" + category.id;
    name.setAttribute("contenteditable", false);
    name.innerText = category.name;
    const operation = document.createElement("td");
    const dV = document.createElement("div");
    dV.innerHTML =
        '<button id="category-edit-' + category.id + '" class="operation-button">ویرایش دسته بندی</button>' +
        '<button id="category-save-' + category.id + '" class="operation-button" style="display:none">ذخیره</button>' +
        '<button id="category-delete-' + category.id + '" class="operation-button">X حذف دسته بندی</button>';
    operation.appendChild(dV);
    newTr.appendChild(name);
    newTr.appendChild(operation);
    return newTr;
}


function getAllProducts(cookie, page, products_in_page) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/admin/getAllProducts?page=${page}&products_in_page=${products_in_page}`, true);
    xhttp.setRequestHeader("Authorization", cookie);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                const response = JSON.parse(xhttp.responseText);
                const products = response[0];
                pages = response[1];
                createPagination(getCookie("Authorization"));
                showProducts(products);
                document.getElementsByClassName("admin-div")[0].scrollIntoView();

            }
        }
    }
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

function loadCategories() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/viewer/getAllCategories`, true);
    xhttp.send();
    document.getElementById("product-category-field").innerHTML = "";
    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                categories = JSON.parse(xhttp.responseText);
                for (cat of categories) {
                    let op = document.createElement("option");
                    op.innerText = cat.name;
                    op.value = cat.id;
                    document.getElementById("product-category-field").appendChild(op);
                }
            }
        }
    }
}