//
// hero header
//
var slideIndex = 0;
var slides = document.getElementsByClassName("slider-image");
const productsInPage = 15;

showSlide(0);

window.setInterval(function() {
    slideIndex++;
    if (slideIndex > slides.length)
        slideIndex = 1;
    showSlide(slideIndex - 1);

}, 5000);

document.getElementsByClassName("prev-button")[0].addEventListener("click", function() {
    slideIndex--;
    if (slideIndex < 0)
        slideIndex = slides.length - 1;
    showSlide(slideIndex);
});
document.getElementsByClassName("next-button")[0].addEventListener("click", function() {
    slideIndex++;
    if (slideIndex > slides.length - 1) { slideIndex = 0 }
    showSlide(slideIndex);
});

function showSlide(index) {
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[index].style.display = "inline-block";
}
//
// sorting box
//
var pricefilter_inputLeft;
var pricefilter_inputRight;
var pricefilter_thumbLeft;
var pricefilter_thumbRight;
var pricefilter_range;
window.onload = function() {
    document.getElementById("best-seller").addEventListener("click", changeSortMethod);
    document.getElementById("best-seller").addEventListener("click", function() {
        //ajax rquest for getting products list sorted by sold
        console.log("sort by sells");
        getSortedProductsBySells(1);
    });
    document.getElementById("price").addEventListener("click", changeSortMethod);
    document.getElementById("price").addEventListener("click", function() {
        //ajax request for getting products list sorted by price
        console.log("sort by price");
        getSortedProductsByPrice(1);
    });
    //ajax request for getting products list
    getAllProducts(1);


    //ajax request for getting categories list
    getAllCategories();

    //ajax request for getting products list sorted by creation date -> DONE


    //ajax request for getting products by category


    //ajax request for getting products in price range -> DONE but //FIXME: the ui does not work


    document.getElementsByClassName('search-button')[0].addEventListener("click", function() {
        //ajax request for getting products by name
        console.log("search product by name");
        searchProductByName(document.getElementsByClassName('search-box')[0].value, 1);
    });

    //ajax request for purchasing products


    //ajax request for login


    //ajax request for signup


    // price filter scripts
    pricefilter_inputLeft = document.getElementById("input-left");
    pricefilter_inputRight = document.getElementById("input-right");

    pricefilter_thumbLeft = document.querySelector(".slider > .thumb.left");
    pricefilter_thumbRight = document.querySelector(".slider > .thumb.right");
    pricefilter_range = document.querySelector(".slider > .range");
    pricefilter_inputLeft.addEventListener("input", setLeftValue);
    pricefilter_inputRight.addEventListener("input", setRightValue);

    pricefilter_inputLeft.addEventListener("mouseover", function() {
        pricefilter_thumbLeft.classList.add("hover");
    });
    pricefilter_inputLeft.addEventListener("mouseout", function() {
        pricefilter_thumbLeft.classList.remove("hover");
    });
    pricefilter_inputLeft.addEventListener("mousedown", function() {
        pricefilter_thumbLeft.classList.add("active");
    });
    pricefilter_inputLeft.addEventListener("mouseup", function() {
        pricefilter_thumbLeft.classList.remove("active");
    });

    pricefilter_inputRight.addEventListener("mouseover", function() {
        pricefilter_thumbRight.classList.add("hover");
    });
    pricefilter_inputRight.addEventListener("mouseout", function() {
        pricefilter_thumbRight.classList.remove("hover");
    });
    pricefilter_inputRight.addEventListener("mousedown", function() {
        pricefilter_thumbRight.classList.add("active");
    });
    pricefilter_inputRight.addEventListener("mouseup", function() {
        pricefilter_thumbRight.classList.remove("active");
    });
    setLeftValue();
    setRightValue();
}




function getAllProducts(pageNumber) {
    //products in page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getAllProducts?page=${pageNumber}&productsInPage=${productsInPage}`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                products = JSON.parse(xhttp.responseText);
                showProducts(products);
            }
        }
    }

}

function getSortedProductsByPrice(pageNumber) {
    //products in page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getSortedProductsByPrice?order=ASC&page=${pageNumber}&productsInPage=${productsInPage}`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                products = JSON.parse(xhttp.responseText);
                showProducts(products);
            }
        }
    }
}

function getSortedProductsBySells(pageNumber) {
    //products in page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getSortedProductsBySells?order=ASC&page=${pageNumber}&productsInPage=${productsInPage}`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                products = JSON.parse(xhttp.responseText);
                showProducts(products);
            }
        }
    }
}

function getSortedProductsByCreationDate(pageNumber) {
    //products in page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getSortedProductsByCreationDate?order=ASC&page=${pageNumber}&productsInPage=${productsInPage}`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                products = JSON.parse(xhttp.responseText);
                showProducts(products);
            }
        }
    }
}

function getProductsInPriceRange(pageNumber, minPrice, maxPrice) {
    //products in page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getProductsInPriceRange?order=ASC&page=${pageNumber}&productsInPage=${productsInPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                products = JSON.parse(xhttp.responseText);
                showProducts(products);
            }
        }
    }
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
    newDiv.id = "product" + product.id;
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
        '<button id="buy-product-with-id-' + product.id + '"class="buy-product-button">خرید محصول</button>' +
        '</div>';

    return newDiv;

}

function getAllCategories() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getAllCategories`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                categories = JSON.parse(xhttp.responseText);
                showCategories(categories);
            }
        }
    }
}

function showCategories(categories) {
    let checkboxContainer = document.getElementsByClassName('checkbox-container')[0];
    checkboxContainer.innerHTML = "";
    for (category of categories) {
        checkboxContainer.append(createCategoryBox(category));
    }
}

function createCategoryBox(category) {
    const newDiv = document.createElement("div");
    newDiv.className = "custom-checkbox";
    newDiv.innerHTML =
        '<input type="checkbox" id=checkbox' + category.id + '" />' +
        '<label for=checkbox' + category.id + '"></label>' +
        '<span class="filtering-text">' + category.name + '</span>';
    return newDiv;
}

function changeSortMethod() {
    document.getElementById("best-seller").classList.toggle('sorting-box-btn-active');
    document.getElementById("best-seller").classList.toggle('sorting-box-btn-deactive');
    document.getElementById("price").classList.toggle('sorting-box-btn-active');
    document.getElementById("price").classList.toggle('sorting-box-btn-deactive');
}

function searchProductByName(productName, pageNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/searchProductByName?page=${pageNumber}&productsInPage=${productsInPage}&productName=${productName}`, true);
    xhttp.send();

    xhttp.onreadystatechange = (e) => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText) {
                //put your code here 
                console.log(xhttp.responseText);
                products = JSON.parse(xhttp.responseText);
                showProducts(products);
            }
        }
    }
}
//
// modal
//
var modal = document.getElementById("modal");
var btn = document.getElementsByClassName("dropdownbtn")[0];
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "flex";
}
span.onclick = function() {
        modal.style.display = "none";
    }
    //FIXME: the exit modal by clicking on anything rather than itself doesn't work
    // window.onclick = function(event) {
    //     if (event.target.id != modal.id && event.target.id != btn.id) {
    //         modal.style.display = "none";
    //     }
    // }

// price filter scripts
function setLeftValue() {
    var _this = pricefilter_inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(pricefilter_inputRight.value) - 1);

    var percent = ((_this.value - min) / (max - min)) * 100;

    pricefilter_thumbLeft.style.left = percent + "%";
    pricefilter_range.style.left = percent + "%";
}

function setRightValue() {
    var _this = pricefilter_inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.max(parseInt(_this.value), parseInt(pricefilter_inputLeft.value) + 1);

    var percent = ((_this.value - min) / (max - min)) * 100;

    pricefilter_thumbRight.style.right = (100 - percent) + "%";
    pricefilter_range.style.right = (100 - percent) + "%";
}