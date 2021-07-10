let currentPage = 1;
let pages = 0;
const productsInPage = 15;
window.onload = function() {
    tabs = ["tab1", "tab2", "tab3"];
    tabDivs = ["products", "categories", "reciepts"]
    document.getElementById(tabs[0]).addEventListener("click", function() {
        selectTab(tabs, tabDivs, 0, 1, 2);
    });
    document.getElementById(tabs[1]).addEventListener("click", function() {
        selectTab(tabs, tabDivs, 1, 0, 2);
    });
    document.getElementById(tabs[2]).addEventListener("click", function() {
        selectTab(tabs, tabDivs, 2, 0, 1);
    });

    let products = fillProducts();
    pages = Math.ceil(products.length / productsInPage);
    createPagination();
    showPage();

    var edit_category_button_ids = "edit-gategory-";

    var row = document.getElementById('categories-table').rows;
    for (var i = 0; i < row.length; i++) {
        var butid = edit_category_button_ids + i.toString();
        var but = document.getElementById(butid);
        if (but != null)
            but.addEventListener('click', function() {
                EditCategoryEvent(this.id);
            })
    }
    var edit_product_ids = "edit-product-with-id-";
    var product_total_num = document.getElementsByClassName("main-product-box").length;
    for (var i = 0; i < product_total_num; i++) {
        var buttid = edit_product_ids + i.toString();
        var butt = document.getElementById(buttid);
        if (butt != null)
            butt.addEventListener('click', function() {
                EditProductEvent(this.id);
            })
    }

    document.getElementsByClassName('create-product-button')[0].addEventListener("click", function() {
        var product_total_num = document.getElementsByClassName("main-product-box").length;
        var container = document.getElementsByClassName('products-box')[0];
        container.innerHTML +=
            '<div id="product-with-id-' + product_total_num + '" class="main-product-box">' +
            '<div class="product-image-box">' +
            '<img src="../assets/img/product.jpg">' +
            '</div>' +
            '<div class="product-desc-box">' +
            '<p contenteditable = true class="product-title">نام محصول</p>' +
            '<p contenteditable = true class="product-category">دسته بندی</p>' +
            '</div >' +
            '<hr>' +
            '<div class="product-price-box">' +
            '<p contenteditable = true class="product-price">قیمت</p>' +
            '<button id="save-product-with-id-' + product_total_num + '"class="buy-product-button">ذخیره</button>' +
            '</div>' +
            '<span contenteditable = true class="badge">?</span>' +
            '</div>';
        document.getElementById('save-product-with-id-' + product_total_num).addEventListener('click', function() {
            var id = this.id.split('save-product-with-id-');
            product_details = document.getElementById("product-with-id-" + id[1]).getElementsByTagName('p');
            document.getElementById("product-with-id-" + id[1]).innerHTML =
                '<div class="product-image-box">' +
                '<img src="../assets/img/product.jpg">' +
                '</div>' +
                '<div class="product-desc-box">' +
                '<p contenteditable = false class="product-title">' + product_details[0].innerHTML + '</p>' +
                '<p contenteditable = false class="product-category">' + product_details[1].innerHTML + '</p>' +
                '</div >' +
                '<hr>' +
                '<div class="product-price-box">' +
                '<p contenteditable = false class="product-price">' + product_details[2].innerHTML + '</p>' +
                '<button id="edit-product-with-id' + id[1] + '"class="buy-product-button">ویرایش محصول</button>' +
                '<span contenteditable = false class="badge">' + document.getElementById("product-with-id-" + id[1]).getElementsByTagName('span')[0].innerHTML + '</span>' +
                '</div>';
        });
    });
}

function selectTab(tabs, tabDivs, select, unselect1, unselect2) {
    document.getElementById(tabs[select]).classList.remove('un-selected-tab');
    document.getElementById(tabs[select]).classList.add('selected-tab');

    document.getElementById(tabs[unselect1]).classList.remove('selected-tab');
    document.getElementById(tabs[unselect1]).classList.add('un-selected-tab');

    document.getElementById(tabs[unselect2]).classList.remove('selected-tab');
    document.getElementById(tabs[unselect2]).classList.add('un-selected-tab');

    document.getElementById(tabDivs[select]).style.display = "flex";
    document.getElementById(tabDivs[unselect1]).style.display = "none";
    document.getElementById(tabDivs[unselect2]).style.display = "none";
}

function EditCategoryEvent(butt_id) {
    const row_number = butt_id.split("edit-gategory-");
    var previous_value = document.getElementById('categories-table').rows[row_number[1]].cells[0].getAttribute("contenteditable");
    if (previous_value == "true") {
        document.getElementById('categories-table').rows[row_number[1]].cells[0].setAttribute('contenteditable', false);
        document.getElementById(butt_id).innerHTML = "ویرایش دسته بندی";
    } else {
        document.getElementById('categories-table').rows[row_number[1]].cells[0].setAttribute('contenteditable', true);
        document.getElementById('categories-table').rows[row_number[1]].cells[0].focus();
        document.getElementById(butt_id).innerHTML = "ذخیره تغییرات";
    }
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
    for (let i=1; i<=productsNumber; i++) {
        b = {"name": "محصول " + i, "category": "دسته بندی " + i, "price": i*1000};
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
    }
}

function createProductBox(product) {
    const newDiv = document.createElement("div");
    newDiv.className = "main-product-box";
    newDiv.innerHTML = '<div class="product-image-box">'+
                            '<img src="../assets/img/product.jpg">'+
                        '</div>'+
                        '<div class="product-desc-box">'+
                            '<p class="product-title">' + product.name +'</p>'+
                            '<p class="product-category">' + product.category + '</p>'+
                        '</div>'+
                        '<hr>'+
                        '<div class="product-price-box">'+
                            '<p class="product-price">' + product.price + ' تومان</p>'+
                            '<button id="edit-product-with-id-0" class="buy-product-button">ویرایش محصول</button>'+
                        '</div>'+
                        '<span class="badge">12</span>';

    return newDiv;

}

function createPagination() {
    const pagination = document.getElementsByClassName("pagination")[0];

    const prev = document.createElement("a");
    prev.id = "prev-btn";
    prev.innerHTML = '<i class="fa fa-angle-left" aria-hidden="true"></i>'
    prev.disabled = true;
    prev.addEventListener("click", function() {
        goToPage(Math.max(1, currentPage - 1), pages);
    });

    const next = document.createElement("a");
    next.id = "next-btn";
    next.innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    next.addEventListener("click", function() {
        goToPage(Math.min(currentPage + 1, pages), pages);
    });

    pagination.appendChild(prev);
    for(let i=1; i<=pages; i++){
        const page = document.createElement("a");
        page.id = "page" + i;
        page.innerHTML = i;
        if (i == currentPage) {
            page.className = "active";
        }
        page.addEventListener("click", function() {
            goToPage(i, pages);
        });
        pagination.appendChild(page);
    }
    pagination.appendChild(next);

}


function goToPage(pageNumber) {
    if (pageNumber != currentPage) {
        document.getElementById("page" + currentPage).classList.remove("active");
        document.getElementById("page" + pageNumber).classList.add("active");
        currentPage = pageNumber;
        showPage();
    }
    
}

function showPage() {
    let partition = products.slice((currentPage-1)*productsInPage, Math.min(currentPage*productsInPage, products.length));
    showProducts(partition);
}