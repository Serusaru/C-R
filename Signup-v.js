document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    signupForm.addEventListener("submit", (event) => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Username validation
        if (username.length < 3 || username.length > 20) {
            alert("Username must be between 3 and 20 characters.");
            event.preventDefault();
            return;
        }

        // Password validation
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long and include both letters and numbers.");
            event.preventDefault();
            return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            event.preventDefault();
            return;
        }
    });
});
