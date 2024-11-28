document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.getElementById("greeting");
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");

    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        greeting.textContent = `Welcome, ${loggedInUser}!`;
        loginForm.style.display = "none";
        logoutBtn.style.display = "block";
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const storedUser = localStorage.getItem(username);
        if (storedUser && JSON.parse(storedUser).password === password) {
            sessionStorage.setItem("loggedInUser", username);
            greeting.textContent = `Welcome, ${username}!`;
            loginForm.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            alert("Invalid username or password!");
        }
    });

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        window.location.reload();
    });
});
