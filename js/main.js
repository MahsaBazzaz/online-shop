var slideIndex = 0;

window.onload = function() {
    showSlides();
    // document.getElementsByClassName("prev")[0].addEventListener("click", plusSlides(-1));
    // document.getElementsByClassName("next")[0].addEventListener("click", plusSlides(1));

    // window.setInterval(showSlides, 3000);

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("slider-image");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "inline-block";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
}