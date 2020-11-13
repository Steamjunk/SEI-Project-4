
const Deck = require('../models').deck;




const newDeck = async (req, res) => {
    console.log(req.body)
    Deck.create({
        name: req.body.deckName,
        description: req.body.deckDescription
    })
    .then(deck => {
        console.log(deck);
        res.send(deck)
    })
    .catch(err => console.error(err))
}


module.exports = {
    newDeck,
    // getUserDecks
}