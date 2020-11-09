const mtg = require('mtgsdk')

const Card = require('../models').Card
const Color = require('../models').Color
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
    console.log('********************************')

    let colorPromises = []
    card.colors.forEach(color => {
        colorPromises.push(addCardColor(card.id, color))
    })

    Promise.all(colorPromises)
    .then(results => {
        console.log('---card colors added---')
    })


    return Card.upsert(card)
}

const addCardColor = async (cardId, color) => {
    console.log(color)

    let colorPromise = Color.findOne({
        where: {
            color: color
        }
    })
    
    let foundColor = await colorPromise
    console.log(foundColor.dataValues.id)

    return CardColor.create({
        cardId: cardId,
        colorId: foundColor.dataValues.id
    })

}



module.exports = {
    searchForCard
}