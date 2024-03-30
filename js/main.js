document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu-box ul');

    // Function to toggle menu visibility
    function toggleMenu() {
        menu.classList.toggle('open');
    }

    // Initial check for screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menu.classList.remove('open'); // Hide menu initially on smaller screens
        } else {
            menu.classList.add('open'); // Show menu initially on larger screens
        }
    }

    // Event listener for menu toggle button
    menuToggle.addEventListener('click', toggleMenu);

    // Event listener for window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            menu.classList.add('open'); // Show menu on resize if screen is larger than 768px
        } else {
            menu.classList.remove('open'); // Hide menu on resize if screen is smaller than or equal to 768px
        }
    });

    // Call checkScreenSize function on page load
    checkScreenSize();
});