const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

// MongoDB connection
mongoose.connect('mongodb+srv://sayedmustafamunib:5RYm3fFpBcWWYOIb@login-project.wrwnvzq.mongodb.net/?retryWrites=true&w=majority&appName=login-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Allow both admin and user roles
    res.json({ message: 'Login successful', username: user.username, role: user.role });
});

// Endpoint to create a user (for testing, should be removed in production)
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const userRole = role === 'admin' ? 'admin' : 'user';
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ username, password: hashedPassword, role: userRole });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err.message });
    }
});

// Catch-all route to serve index.html for any GET request not handled above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 