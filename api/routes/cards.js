var express = require('express');
var router = express.Router();
const ctrl = require('../controllers');


router.get('/', ctrl.cards.searchForCard);


module.exports = router;
