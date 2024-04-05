document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var menuLinks = document.querySelector(".menu-links");

  menuToggle.addEventListener("click", function () {
    menuLinks.classList.toggle("show"); // Toggle class to show/hide menu
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const menuItems = document.querySelectorAll(".recipe");

  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();
    menuItems.forEach(function (menuItem) {
      const title = menuItem.querySelector("h3").textContent.toLowerCase();
      if (title.includes(searchText)) {
        menuItem.style.display = "flex";
      } else {
        menuItem.style.display = "none";
      }
    });
  });
});
