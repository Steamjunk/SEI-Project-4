const mtg = require('mtgsdk')

const Card = require('../models').Card


async function searchForCard (req, res)  {
    // search in db with criteria

    // if found
        // display
    // else search api
        // add results to db
            // display from db



    let searchPromise = mtg.card.where({ supertypes: 'legendary', subtypes: 'goblin' })
    
    let cards = await searchPromise;

    console.log(cards.length);
    
    res.send(cards);

}

module.exports = {
    searchForCard
}