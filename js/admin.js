window.onload = function() {
    tabs = ["tab1", "tab2", "tab3"];
    document.getElementById(tabs[0]).addEventListener("click", function() {
        selectTab(tabs, 0, 1, 2);
    });
    document.getElementById(tabs[1]).addEventListener("click", function() {
        selectTab(tabs, 1, 0, 2);
    });
    document.getElementById(tabs[2]).addEventListener("click", function() {
        selectTab(tabs, 2, 0, 1);
    });
}

function selectTab(tabs, select, unselect1, unselect2) {
    document.getElementById(tabs[select]).classList.remove('un-selected-tab');
    document.getElementById(tabs[select]).classList.add('selected-tab');

    document.getElementById(tabs[unselect1]).classList.remove('selected-tab');
    document.getElementById(tabs[unselect1]).classList.add('un-selected-tab');

    document.getElementById(tabs[unselect2]).classList.remove('selected-tab');
    document.getElementById(tabs[unselect2]).classList.add('un-selected-tab');
}