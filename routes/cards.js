var express = require('express');
var router = express.Router();
const ctrl = require('../controllers');

router.get('/show/:id', ctrl.cards.getCardData)
router.get('/:name/:set/:white/:blue/:black/:green/:red/:colorless/:supertype/:type/:subtype', ctrl.cards.searchForCard);
router.get('/supertypes', ctrl.cards.getSupertypes)
router.get('/types', ctrl.cards.getTypes)
router.get('/subtypes', ctrl.cards.getSubtypes)

module.exports = router;
