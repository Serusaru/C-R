document.getElementById("signup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;

    if (localStorage.getItem(username)) {
        alert("Username already exists!");
    } else {
        const userData = { username, password };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("Signup successful! You can now log in.");
        window.location.href = "login.html";
    }
});
