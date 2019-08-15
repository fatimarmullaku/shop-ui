$(function () {
    $(".hamburger-menu-container").on('click', function() {
        $(".header").toggleClass('active');
    });

    $(".dropdown-profile, .dropdown-cart").on('click',function () {
        $(this).toggleClass('is-active');
    });
});




