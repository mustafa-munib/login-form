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
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
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
    const { username, password } = req.body;
    
    try {
        // Check if this is the first user - if so, make them admin
        const userCount = await User.countDocuments();
        const userRole = userCount === 0 ? 'admin' : 'user';
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role: userRole });
        await user.save();
        
        const roleMessage = userRole === 'admin' ? 'Admin user created' : 'User created';
        res.status(201).json({ message: roleMessage, role: userRole });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(400).json({ message: 'Error creating user', error: err.message });
        }
    }
});

// Check if admin exists endpoint
app.get('/admin/exists', async (req, res) => {
    try {
        const adminCount = await User.countDocuments({ role: 'admin' });
        res.json({ adminExists: adminCount > 0 });
    } catch (err) {
        res.status(500).json({ message: 'Error checking admin status', error: err.message });
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