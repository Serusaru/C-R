const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to SQLite database.');
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

// Routes
app.get('/', (req, res) => {
    const loggedIn = req.cookies.username || null;
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
            console.error(err.message);
            return res.redirect('/signup.html?error=User already exists');
        }
        res.redirect('/login.html');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.redirect('/login.html?error=Invalid credentials');
        }
        if (row) {
            res.cookie('username', username);
            return res.redirect('/');
        }
        res.redirect('/login.html?error=Invalid credentials');
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
