var slideIndex = 1;

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
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

$(document).ready(function () {
    showSlides(slideIndex);

    if ($(".slideshow-container").length) {

        $(".slideshow-container").mouseenter(function () {
            $(".game-information-container").fadeIn("slow");
            $(".image-slider").animate({
                opacity: 0.3
            }, "slow")
        });

        $(".slideshow-container").mouseleave(function () {
            $(".image-slider").animate({
                opacity: 1
            }, "slow");
            $(".game-information-container").fadeOut("slow");
        });
    }



    $(".slideshow-container").pressure({
        change:function (force, event){
            console.log(force);
            $(".image-slider,.image-slider-mobile").css('opacity', 1 - force + 0.25);
            $(".game-information-container").fadeIn("slow");

        },
        end: function(){
            console.log('end');
            $(".image-slider,.image-slider-mobile").css('opacity',1);
            $(".game-information-container").fadeOut("slow");
        }
    });
});
