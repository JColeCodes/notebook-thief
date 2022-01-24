const router = require('express').Router();
const { 
    createNote,
    deleteNote,
    editNote,
    validateNote,
    getDateId
} = require('../../lib/notes');
const { notes } = require('../../db/db');

// GET NOTES
router.get('/notes', (req, res) => {
    res.json(notes);
});

// POST NEW NOTE
router.post('/notes', (req, res) => {
    // Set id based on date-time
    req.body.id = getDateId();

    // If any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

// POST NOTE FOR ITEM THAT ALREADY EXISTS (EDIT)
router.post('/notes/:id', (req, res) => {
    // Set new id based on date-time
    req.body.id = getDateId();

    // If any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = editNote(req.body, req.params.id, notes);
        res.json(note);
    }
});

// DELETE NOTE
router.delete('/notes/:id', (req, res) => {
    const note = deleteNote(req.params.id, notes);
    res.json(note);
});

module.exports = router;