$(function () {
    $(".hamburger-menu-container").on('click', function() {
        $(".header").toggleClass('active');
    });
});

$(function () {
    $(".dropdown-profile").on('click',function () {
        $(".dropdown-profile").addClass('is-active');

    });
    $(".dropdown-profile").on('mouseleave',function () {
        $(".dropdown-profile").removeClass('is-active');

    });
});


$(function () {
    $(".dropdown-cart").on('click',function () {
        $(".dropdown-cart").addClass('is-active');

    });
    $(".dropdown-cart").on('mouseleave',function () {
        $(".dropdown-cart").removeClass('is-active');

    });
});




