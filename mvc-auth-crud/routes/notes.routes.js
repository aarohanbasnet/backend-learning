const express = require('express');
const {createNotes, readNotes, editNotes, deleteNotes} = require('../controllers/note.controller');
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/create', isLoggedIn, createNotes);
router.get('/read', readNotes);
router.put('/edit/:noteId', isLoggedIn, editNotes);
router.delete('/delete/:noteId', isLoggedIn, deleteNotes);

module.exports = router;