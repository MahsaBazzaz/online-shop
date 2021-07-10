var slideIndex = 0;
var slides = document.getElementsByClassName("slider-image");
showSlide(0);

// hero header
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

// modal
var modal = document.getElementsByClassName("modal")[0];
var btn = document.getElementsByClassName("dropdownbtn")[0];
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "flex";
}
span.onclick = function() {
    modal.style.display = "none";
}