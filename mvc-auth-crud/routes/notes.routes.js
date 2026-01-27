const express = require('express');
const {createNotes, readNotes, editNotes} = require('../controllers/note.controller');
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/create', isLoggedIn, createNotes);
router.get('/read', isLoggedIn, readNotes);
router.put('/edit/:noteId', isLoggedIn, editNotes);

module.exports = router;