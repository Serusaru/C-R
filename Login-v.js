document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", (event) => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username.length < 3 || username.length > 20) {
            alert("Username must be between 3 and 20 characters.");
            event.preventDefault();
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            event.preventDefault();
            return;
        }
    });
});
