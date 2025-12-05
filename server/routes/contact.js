import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
