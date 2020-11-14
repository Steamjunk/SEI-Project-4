const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.post('/new', ctrl.decks.newDeck);
router.get('/', ctrl.decks.getUserDecks);

module.exports = router;