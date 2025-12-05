import express from 'express';
import axios from 'axios';

const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'randomvariable';
// Note: In a real scenario, we might fetch this from functionality or env.
// The user request mentions "GitHub contribution + profile fetch".
// We will use the GitHub API.

// @route   GET /api/github/profile
// @desc    Get GitHub profile
// @access  Public
router.get('/profile', async (req, res) => {
    try {
        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const response = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}`, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching GitHub profile:', error.message);
        res.status(500).json({ message: 'Error fetching GitHub profile' });
    }
});

// @route   GET /api/github/repos
// @desc    Get GitHub repos
// @access  Public
router.get('/repos', async (req, res) => {
    try {
        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const response = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos?sort=updated&per_page=6`, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error.message);
        res.status(500).json({ message: 'Error fetching GitHub repos' });
    }
});

export default router;
