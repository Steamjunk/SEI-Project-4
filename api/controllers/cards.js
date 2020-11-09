const mtg = require('mtgsdk')

const Card = require('../models').Card
const Color = require('../models').Color
const Ruling = require('../models').Ruling
const CardColor = require('../models').CardColor

const searchForCard = async (req, res) => {
    // search in db with criteria
    // get all from cards using search criteria
    // Card.findAll({
    //     where: {
    //         cmc: 3
    //     }
    // })
    // .then(results => {
    //     res.send(results)
    // })

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

const addCardToDatabase = async (card) => {
    // add colors
    let colorPromises = []
    card.colors.forEach(color => {
        colorPromises.push(addCardColor(card.id, color))
    })
    
    // add supertypes
    let superTypePromises = []
    
    // add types
    let typePromises = []
    
    // add subtypes
    let subTypePromises = []
    
    // add rulings
    let rulingPromises = []
    card.rulings.forEach(ruling => {
        ruling.cardId = card.id
        rulingPromises.push(addCardRuling(ruling))
    })
    
    // add legalities
    let legalitiesPromises = []
    
    // wait for all promises to return
    Promise.all(colorPromises)
    Promise.all(rulingPromises)

    
    return Card.upsert(card)
}

const addCardColor = async (cardId, color) => {
    let colorPromise = Color.findOne({
        where: {
            color: color
        }
    })
    let foundColor = await colorPromise

    return CardColor.create({
        cardId: cardId,
        colorId: foundColor.dataValues.id
    })
}

const addCardRuling = async (ruling) => {
    return Ruling.create({
        cardId: ruling.cardId,
        date: ruling.date,
        text: ruling.text
    })
}



module.exports = {
    searchForCard
}