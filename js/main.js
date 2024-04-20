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
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
      const menuItems = document.querySelectorAll(".recipe");

      searchInput.addEventListener("input", function () {
          const searchText = searchInput.value.toLowerCase();
          menuItems.forEach(function (menuItem) {
              const titleElement = menuItem.querySelector("h3");
              if (titleElement) {
                  const title = titleElement.textContent.toLowerCase();
                  if (title.includes(searchText)) {
                      menuItem.style.display = "flex";
                  } else {
                      menuItem.style.display = "none";
                  }
              }
          });
      });
  } else {
      console.error("Search input element not found.");
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
      }, 1200); // 3000 milliseconds = 3 seconds
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
          <a href="sign_in.html">Sign In</a>`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("box-menu");
  if (menu) {
    showAddItemButton();
    // Add event listener for adding menu items button
    document
      .getElementById("addItemButton")
      .addEventListener("click", function () {
        openModal("addItemModal");
      });

    // Add event listener for adding dessert items button
    document
      .getElementById("addDessertButton")
      .addEventListener("click", function () {
        openModal("addDessertModal");
      });

    // Event listener for closing the modal when the close button is clicked
    document.querySelectorAll(".close").forEach(function (element) {
      element.addEventListener("click", function () {
        closeModal(this.getAttribute("data-modal"));
      });
    });

    // Event listener for closing the modal when clicking outside the modal
    window.addEventListener("click", function (event) {
      if (event.target.classList.contains("modal")) {
        closeModal(event.target.getAttribute("data-modal"));
      }
    });

    // Function to open the modal
    function openModal(modalId) {
      document.getElementById(modalId).style.display = "block";
    }

    // Function to close the modal
    function closeModal(modalId) {
      document.getElementById(modalId).style.display = "none";
    }

    function handleAddItemForm(event) {
      event.preventDefault();

      const itemName = document.getElementById("itemName").value;
      const itemDescription = document.getElementById("itemDescription").value;
      const itemImageURL = document.getElementById("itemImageURL").value;

      // Create HTML elements for the new item
      const newItemHTML = `
        <div class="recipe">
            <img src="${itemImageURL}" alt="${itemName}">
            <h3>${itemName}</h3>
            <p>${itemDescription}</p>
        </div>
    `;

      // Append the new item to the menu section
      const menuItemsContainer = document.getElementById("menuItems");
      menuItemsContainer.appendChild(document.createElement("div")).innerHTML =
        newItemHTML; // Add the new item using appendChild()

      // Save menu items to local storage
      const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
      menuItems.unshift(newItemHTML); // Add the new item at the beginning of the array
      localStorage.setItem("menuItems", JSON.stringify(menuItems));

      // Clear form fields
      document.getElementById("itemName").value = "";
      document.getElementById("itemDescription").value = "";
      document.getElementById("itemImageURL").value = "";

      // Close the modal
      closeModal("addItemModal");
    }

    // Function to handle form submission and add dessert item
    function handleDessertItemForm(event) {
      event.preventDefault();

      const itemName = document.getElementById("itemDessertName").value;
      const itemDescription = document.getElementById(
        "itemDessertDescription"
      ).value;
      const itemImageURL = document.getElementById("itemDessertImageURL").value;

      // Create HTML elements for the new item
      const newItemHTML = `
        <div class="recipe">
            <img src="${itemImageURL}" alt="${itemName}">
            <h3>${itemName}</h3>
            <p>${itemDescription}</p>
        </div>
    `;

      // Append the new item to the dessert section
      const dessertItemsContainer = document.getElementById("dessert-item");
      dessertItemsContainer.appendChild(
        document.createElement("div")
      ).innerHTML = newItemHTML; // Add the new item using appendChild()

      // Save dessert items to local storage
      const dessertItems =
        JSON.parse(localStorage.getItem("dessertItems")) || [];
      dessertItems.unshift(newItemHTML); // Add the new item at the beginning of the array
      localStorage.setItem("dessertItems", JSON.stringify(dessertItems));

      // Clear form fields
      document.getElementById("itemDessertName").value = "";
      document.getElementById("itemDessertDescription").value = "";
      document.getElementById("itemDessertImageURL").value = "";

      // Close the modal
      closeModal("addDessertModal");
    }
    // Event listener for adding item form submission
    document
      .getElementById("addItemForm")
      .addEventListener("submit", handleAddItemForm);

    // Event listener for adding dessert item form submission
    document
      .getElementById("addDessertForm")
      .addEventListener("submit", handleDessertItemForm);
  }
});

// Load menu items from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("box-menu");
  if (menu) {
    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
    const menuItemsContainer = document.getElementById("menuItems");

    menuItems.forEach(function (itemHTML) {
      // Check if the item already exists before appending
      if (!isItemAlreadyAdded(menuItemsContainer, itemHTML)) {
        const newItemElement = document.createElement("div");
        newItemElement.innerHTML = itemHTML;
        menuItemsContainer.appendChild(newItemElement);
      }
    });

    const dessertItems = JSON.parse(localStorage.getItem("dessertItems")) || [];
    const dessertItemsContainer = document.getElementById("dessert-item");

    dessertItems.forEach(function (itemHTML) {
      // Check if the item already exists before appending
      if (!isItemAlreadyAdded(dessertItemsContainer, itemHTML)) {
        const newItemElement = document.createElement("div");
        newItemElement.innerHTML = itemHTML;
        dessertItemsContainer.appendChild(newItemElement);
      }
    });
  }
});

// Function to check if an item already exists in a container
function isItemAlreadyAdded(container, itemHTML) {
  // Convert HTML string to DOM element
  const newItemElement = document.createElement("div");
  newItemElement.innerHTML = itemHTML;

  // Check if any child element matches the new item's HTML
  return Array.from(container.children).some(
    (child) => child.innerHTML === newItemElement.innerHTML
  );
}
// Function to close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Function to open modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

// Event listener for close buttons
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("box-menu");
  if (menu) {
    document
      .getElementById("closeAddItemModal")
      .addEventListener("click", function () {
        closeModal("addItemModal");
      });

    document
      .getElementById("closeAddDessertModal")
      .addEventListener("click", function () {
        closeModal("addDessertModal");
      });
  }
});

// Event listeners for add item and dessert buttons
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("box-menu");
  if (menu) {
    document
      .getElementById("addItemButton")
      .addEventListener("click", function () {
        openModal("addItemModal");
      });

    document
      .getElementById("addDessertButton")
      .addEventListener("click", function () {
        openModal("addDessertModal");
      });
  }
});

function showAddItemButton() {
  const addItemButton = document.getElementById("addItemButton");
  const addDessertButton = document.getElementById("addDessertButton");
  if (JSON.parse(localStorage.getItem("signedIn"))) {
    addItemButton.style.display = "block";
    addDessertButton.style.display = "block";
  } else {
    addItemButton.style.display = "none";
    addDessertButton.style.display = "none";
  }
}
