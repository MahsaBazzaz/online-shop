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