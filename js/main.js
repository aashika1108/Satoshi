document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var menuLinks = document.querySelector(".menu-links");

  if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", function () {
      menuLinks.classList.toggle("show"); // Toggle class to show/hide menu
    });
  }
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
  const signUpForm = document.querySelector("#sign-up form");
  // Check if the sign-up form exists before adding the event listener
  if (signUpForm) {
    signUpForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const fullName = document.getElementById("fullname").value.trim();

      const username = document.getElementById("username").value.trim();

      const email = document.getElementById("email").value.trim();

      const password = document.getElementById("password").value.trim();

      const confirmPassword = document
        .getElementById("confirmpassword")
        .value.trim();

      // Validate full name
      if (fullName === "") {
        alert("Please enter your full name");
        return;
      }

      // Validate username
      if (username === "") {
        alert("Please enter a username");
        return;
      }

      // Username must contain only alphanumeric characters and underscores
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        alert("Username can only contain letters, numbers, and underscores");
        return;
      }

      // Validate email
      if (email === "") {
        alert("Please enter an email");
        return;
      }
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Retrieve existing users from localStorage or initialize an empty array
      let users = JSON.parse(localStorage.getItem("users")) || [];
      // Check if the email already exists
      if (
        users.some((user) => user.email.toLowerCase() === email.toLowerCase())
      ) {
        alert("Email already exists");
        return;
      }

      // Check if the username already exists
      if (users.some((user) => user.username === username)) {
        alert("Username already exists");
        return;
      }

      // Validate password
      if (password === "") {
        alert("Please enter a password");
        return;
      }

      // Password must be at least 8 characters long
      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      // Password must contain at least one uppercase letter, one lowercase letter, and one number
      const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/;
      if (passwordRegex.test(password)) {
        alert(
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        );
        return;
      }

      // Validate password confirmation
      if (confirmPassword === "") {
        alert("Please confirm your password");
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Create user object
      const user = {
        fullName: fullName,
        username: username,
        email: email,
        password: password,
      };

      // Add the new user to the array of users
      users.push(user);

      // Store updated user data in localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Optionally, you can redirect the user to another page after successful sign-up
      window.location.href = "sign_in.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const signInForm = document.querySelector("#sign-in form");

  // Check if the sign-in form exists before adding the event listener
  if (signInForm) {
    const signedIn = JSON.parse(localStorage.getItem("signedIn"));
    if (signedIn) {
      window.location.href = "index.html";  
    }
    signInForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const username = signInForm.elements.username.value;
      const password = signInForm.elements.password.value;

      // Retrieve users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Find the user with the matching username
      const user = users.find((user) => user.username === username);

      // Check if a user with the provided username exists
      if (!user) {
        showMessage("User not found. Please check your username.");
        return;
      }

      // Check if the provided password matches the user's password
      if (user.password !== password) {
        showMessage("Incorrect password. Please try again.");
        return;
      }

      // If both username and password are correct, log in the user
      showMessage("Login successful! Welcome, " + user.fullName);
      const signedIn = true;

      // Store the signedIn flag in local storage
      localStorage.setItem("signedIn", signedIn);
      // Delay the redirection slightly (e.g., 3 seconds)
      setTimeout(function () {
        // Redirect the user to another page after successful login
        window.location.href = "index.html";
      }, 1500); // 3000 milliseconds = 3 seconds
    });
  }

  // Function to display message on the page
  function showMessage(msg) {
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
      // Check if the element exists
      messageDiv.textContent = msg;
      messageDiv.style.display = "block";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userStatus = document.getElementById("user-status");

  // Retrieve the signed-in status from local storage
  const signedIn = JSON.parse(localStorage.getItem("signedIn"));

  if (signedIn) {
    // If signed in, display avatar with logout dropdown
    userStatus.innerHTML = `
          <div class="dropdown">
              <img src="./images/profile_11748243.png" alt="User Avatar" class="avatar" id="avatar-dropdown-toggle">
              <!-- Dropdown content -->
              <div class="dropdown-content" id="avatar-dropdown">
                  <a href="#" id="logout-link">Logout</a>
              </div>
          </div>
      `;

    // Add event listener for logout link
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        // Handle logout logic here
        // Clear user session or remove authentication data
        // Redirect user to sign-in page after logout

        // Clear the signed-in status from local storage
        localStorage.removeItem("signedIn");

        window.location.href = "index.html";
      });
    }

    // Add event listener for avatar dropdown toggle
    const avatarDropdownToggle = document.getElementById(
      "avatar-dropdown-toggle"
    );
    if (avatarDropdownToggle) {
      avatarDropdownToggle.addEventListener("click", function (event) {
        const avatarDropdown = document.getElementById("avatar-dropdown");
        if (avatarDropdown) {
          avatarDropdown.classList.toggle("show");
        }
      });
    }

    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener("click", function (event) {
      const avatarDropdown = document.getElementById("avatar-dropdown");
      if (avatarDropdown && !event.target.matches(".avatar")) {
        avatarDropdown.classList.remove("show");
      }
    });
  } else {
    // If not signed in, display sign-in link
    userStatus.innerHTML = `
          <a href="sign_in.html">Sign In</a>
      `;
  }
});
