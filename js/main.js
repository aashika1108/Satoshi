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


document.addEventListener("DOMContentLoaded", function () {
  const signInForm = document.querySelector("#sign-in form");

  // Check if the sign-in form exists before adding the event listener
  if (signInForm) {
      signInForm.addEventListener("submit", function (event) {
          event.preventDefault();

          // Get form values
          const username = signInForm.elements.username.value;
          const password = signInForm.elements.password.value;

          // Retrieve users from localStorage
          const users = JSON.parse(localStorage.getItem("users")) || [];

          // Find the user with the matching username
          const user = users.find(user => user.username === username);

          // Check if a user with the provided username exists
          if (!user) {
              alert("User not found. Please check your username.");
              return;
          }

          // Check if the provided password matches the user's password
          if (user.password !== password) {
              alert("Incorrect password. Please try again.");
              return;
          }

          // If both username and password are correct, log in the user
          // Display success message
          alert("Login successful! Welcome, " + user.fullName);

          // Delay the redirection slightly (e.g., 1 second)
          setTimeout(function () {
              // Redirect the user to another page after successful login
              window.location.href = "dashboard.html";
          }, 1000); // 1000 milliseconds = 1 second
      });
  }
});
