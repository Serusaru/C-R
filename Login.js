document.addEventListener("DOMContentLoaded", () => {
    const username = sessionStorage.getItem("loggedInUser");
    if (username) {
        showWelcome(username);
    }
});

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        sessionStorage.setItem("loggedInUser", username);
        showWelcome(username);
    } else {
        alert("Invalid username or password.");
    }
}

function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (localStorage.getItem(username)) {
        alert("Username already exists. Choose a different one.");
    } else {
        localStorage.setItem(username, password);
        alert("Signup successful! You can now log in.");
        showLogin();
    }
}

function logout() {
    sessionStorage.removeItem("loggedInUser");
    showLogin();
}

function showLogin() {
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("welcome").classList.add("hidden");
}

function showSignup() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("signup-form").classList.remove("hidden");
}

function showWelcome(username) {
    document.getElementById("username-display").textContent = username;
    document.getElementById("welcome").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("signup-form").classList.add("hidden");
}
