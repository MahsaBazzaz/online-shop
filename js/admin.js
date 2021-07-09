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
    var buttonIds = "edit-gategory-";

    var row = document.getElementById('categories-table').rows;
    for (var i = 0; i < row.length; i++) {
        var butid = buttonIds + i.toString();
        var but = document.getElementById(butid);
        if (but != null)
            but.addEventListener('click', function() {
                addEventToButton(this.id);
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

function addEventToButton(butt_id) {
    const row_number = butt_id.split("edit-gategory-");
    var previous_value = document.getElementById('categories-table').rows[row_number[1]].cells[0].getAttribute("contenteditable");
    if (previous_value == "true") {
        document.getElementById('categories-table').rows[row_number[1]].cells[0].setAttribute('contenteditable', false);
        document.getElementById(butt_id).innerHTML = "ویرایش دسته بندی";
    } else {
        document.getElementById('categories-table').rows[row_number[1]].cells[0].setAttribute('contenteditable', true);
        document.getElementById(butt_id).innerHTML = "ذخیره تغییرات";
    }
}