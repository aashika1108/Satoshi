document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var menuLinks = document.querySelector(".menu-links");

  menuToggle.addEventListener("click", function () {
    menuLinks.classList.toggle("show"); // Toggle class to show/hide menu
  });
});


document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("menu.html")) {
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
          const menuItems = document.querySelectorAll(".recipe");
          const boxMenus = document.querySelectorAll(".box-menu");

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
              boxMenus.forEach(function (boxMenu) {
                boxMenu.style.display = "none";
            });
          });
      } else {
          console.error("Search input element not found.");
      }
  }
});


