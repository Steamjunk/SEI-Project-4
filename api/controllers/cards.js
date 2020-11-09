const mtg = require('mtgsdk')

const Card = require('../models').Card


async function searchForCard (req, res) {
    // search in db with criteria
    // get all from cards using search criteria

    // if found
        // display



    // todo use try catch block?
    // else search api
    let searchPromise = mtg.card.where({ supertypes: 'legendary', subtypes: 'goblin' });
    
    let cards = await searchPromise;

    // add cards to db
    console.log(cards.length);
    let cardPromises = [];
    cards.forEach(card => {
        cardPromises.push(addCardToDatabase(card));
    })
    
    Promise.all(cardPromises)
    .then(results => {
        console.log('---cards added---')
        res.send(results);
    })
    
    // display from db
    // send complete set of cards
    
}

async function addCardToDatabase(card) {
    console.log('********************************')
    console.log(card)
    return Card.upsert(card)
}

module.exports = {
    searchForCard
}