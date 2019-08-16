$(function () {
    $(".hamburger-menu-container").on('click', function() {
        $(".header").toggleClass('active');
    });

    $(".dropdown-profile").on('click',function () {
        $(this).toggleClass('is-active');
        $(".dropdown-cart").removeClass('is-active');
    });

    $(".dropdown-cart").on('click',function () {
        $(this).toggleClass('is-active');
        $(".dropdown-profile").removeClass('is-active');
    })
});




