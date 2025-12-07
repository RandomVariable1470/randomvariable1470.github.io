import express from 'express';
import Note from '../models/Note.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new note (Admin only)
router.post('/', auth, isAdmin, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE note (Admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
