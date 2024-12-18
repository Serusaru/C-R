<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $conn = new mysqli("localhost", "root", "", "user_auth");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo "<script>alert('Signup successful!'); window.location.href='login.php';</script>";
    } else {
        echo "<script>alert('Username already exists!');</script>";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel ="stylesheet" href="styles.css">
    </head>
    <body>
        <header>
        
                <div id="Title">
                    <h2> Capoeira & Roda </h2>
                </div>
                
                <nav>
                        <a href="index.html">Home</a>
                        <a href="Events.html">Events</a>
                        <a href="Store.html">Store</a>
                        <a href="Aboutus.html">About Us</a>
                        <a href="Login.html">Login</a>
                </nav>
        </header>
         <form id="signupForm">
        <h2>Signup</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Signup</button>
          <div class="form-footer">
                <p>Already have an account? <a href="Login.html">Login</a></p>
    </form>

    <script>
        document.getElementById('signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) window.location.href = 'Login.html';
        });
    </script>
        </body>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <footer>
            <p>&copy; 2024 Capoeira & Roda. All rights reserved.</p>
            <p>
                <a href="TS.html">Terms and Services</a>
                <a href="Privacy.html">Privacy Policy</a>
                <a href="Support.html">Support</a>

            </p>
            
        </footer>
</html>
