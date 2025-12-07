import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for: ${username}`); // DEBUG LOG

    const user = await User.findOne({ username });
    console.log('User found in DB:', !!user); // DEBUG LOG

    if (user && (await user.matchPassword(password))) {
        console.log('Password match: SUCCESS'); // DEBUG LOG
        res.json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

export default router;
