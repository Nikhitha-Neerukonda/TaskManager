const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('User routes are working!');
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Create new user without hashing the password
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ user, message: "User Created Successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            throw new Error('Unable to login, invalid credentials');
        }

        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET_KEY);

        res.send({ user, token, message: "Logged in successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
