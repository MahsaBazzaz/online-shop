window.onload = function() {
    document.getElementsByClassName("right-tab")[0].addEventListener("click", Toggle);
    document.getElementsByClassName("right-tab")[1].addEventListener("click", Toggle);
    document.getElementsByClassName("left-tab")[0].addEventListener("click", Toggle);
    document.getElementsByClassName("left-tab")[0].addEventListener("click", Toggle);
}

function Toggle() {
    document.getElementById("profile-section").classList.toggle('visible');
    document.getElementById("profile-section").classList.toggle('invisible');
    document.getElementById("reciepts-section").classList.toggle('visible');
    document.getElementById("reciepts-section").classList.toggle('invisible');

    document.getElementsByClassName("right-tab")[0].classList.toggle('selected-tab');
    document.getElementsByClassName("right-tab")[0].classList.toggle('un-selected-tab');
    document.getElementsByClassName("right-tab")[1].classList.toggle('selected-tab');
    document.getElementsByClassName("right-tab")[1].classList.toggle('un-selected-tab');

    document.getElementsByClassName("left-tab")[0].classList.toggle('selected-tab');
    document.getElementsByClassName("left-tab")[0].classList.toggle('un-selected-tab');
    document.getElementsByClassName("left-tab")[1].classList.toggle('selected-tab');
    document.getElementsByClassName("left-tab")[1].classList.toggle('un-selected-tab');
}