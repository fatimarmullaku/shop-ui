var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

$(document).ready(function(){
    $(".slideshow-container").mouseenter(function(){
        $(".game-information-container").fadeIn("slow");
        $(".image-slider").animate({
            opacity : 0.3
        }, "slow")
    });
    $(".slideshow-container").mouseleave(function(){
        $(".image-slider").animate({
            opacity : 1
        },"slow");
        $(".game-information-container").fadeOut("slow");
    });
});
