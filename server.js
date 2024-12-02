const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User already exists or invalid data' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
