
const Deck = require('../models').deck;
const constants = require('../constants');



const newDeck = (req, res) => {
    console.log(req.body)
    Deck.upsert({
        name: req.body.deckName,
        description: req.body.deckDescription,
        user_id: req.body.user_id
    })
    .then(deck => {
        console.log(deck);
        res.send(deck)
    })
    .catch(err => console.error(err))
}

const getUserDecks = (req, res) => {
    console.log('getuserdecks')
    Deck.findAll({
        where: {
            user_id: req.user.id
        }
    })
    .then(decks => {
        console.log(decks);
        res.status(constants.SUCCESS).json(decks);

    })
    .catch(err => console.error(err))
}


module.exports = {
    newDeck,
    getUserDecks
}