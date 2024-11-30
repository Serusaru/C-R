const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);


const users = [];
const events = [];
let userIdCounter = 1;

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and Password are required!");
  }
  if (users.find((u) => u.username === username)) {
    return res.status(400).send("User already exists!");
  }
  users.push({ id: userIdCounter++, username, password });
  res.redirect("/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).send("Invalid credentials!");
  req.session.user = user;
  res.redirect("/events.html");
});

app.get("/events", (req, res) => {
  if (!req.session.user) return res.status(401).send("Unauthorized!");
  res.json(events.filter((e) => e.userId === req.session.user.id));
});

app.post("/events", (req, res) => {
  if (!req.session.user) return res.status(401).send("Unauthorized!");
  const { title, description } = req.body;
  const event = { id: events.length + 1, userId: req.session.user.id, title, description };
  events.push(event);
  res.redirect("/events.html");
});

app.delete("/events/:id", (req, res) => {
  if (!req.session.user) return res.status(401).send("Unauthorized!");
  const eventIndex = events.findIndex((e) => e.id === parseInt(req.params.id) && e.userId === req.session.user.id);
  if (eventIndex === -1) return res.status(404).send("Event not found!");
  events.splice(eventIndex, 1);
  res.sendStatus(200);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});

const fs = require('fs');
const filePath = './file.txt';

const stream = fs.createReadStream(filePath);
stream.on('error', (err) => {
  console.error(`Stream error: ${err.message}`);
});

