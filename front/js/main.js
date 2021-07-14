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
window.onload = function() {
    document.getElementById("best-seller").addEventListener("click", changeSortMethod);
    document.getElementById("price").addEventListener("click", changeSortMethod);
    document.getElementById("price").addEventListener("click", function() {
        console.log("sort by price");
        getSortedProducts(1);
    });
    //ajax request for getting products list
    getAllProducts(1);


    //ajax request for getting categories list

    getAllCategories();
    //ajax request for getting products list sorted by price

    //ajax rquest for getting products list sorted by sold


    //ajax request for getting products list sorted by creation date


    //ajax request for getting products by category


    //ajax request for getting products in price range


    //ajax request for getting products by name


    //ajax request for purchasing products


    //ajax request for login


    //ajax request for signup



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

function getSortedProducts(pageNumber) {
    //products in page
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/getSortedProducts?order=ASC&page=${pageNumber}&productsInPage=${productsInPage}`, true);
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