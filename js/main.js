document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menuLinks = document.querySelector('.menu-links');

    menuToggle.addEventListener('click', function() {
        menuLinks.classList.toggle('show'); // Toggle class to show/hide menu
    });
});
