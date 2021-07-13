window.onload = function() {
    tabs = ["tab1", "tab2"];
    classes = ["profile-section", "reciepts-section"]
    document.getElementById(tabs[0]).addEventListener("click", function() {
        makeProfileVisible();
    });
    document.getElementById(tabs[1]).addEventListener("click", function() {
        makeRecieptVisible();
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