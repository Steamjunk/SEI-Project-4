const mtg = require('mtgsdk')

const Card = require('../models').Card
const Color = require('../models').Color
const Ruling = require('../models').Ruling
const Supertype = require('../models').Supertype
const Type = require('../models').Type
const Subtype = require('../models').Subtype

const CardColor = require('../moqqdels').CardColor
const CardSupertype = require('../models').CardSupertype
const CardType = require('../models').CardType
const CardSubtype = require('../models').CardSubtype

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



    // todo use try catch block? Start here. error catch everything to debug type exception errors
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
    card.supertypes.forEach(supertype => {
        superTypePromises.push(addCardSupertype(card.id, supertype))
    })
    
    // add types
    let typePromises = []
    card.types.forEach(type => {
        typePromises.push(addCardType(card.id, type))
    })
    
    // add subtypes
    let subtypePromises = []
    card.subtypes.forEach(subtype => {
        subtypePromises.push(addCardSubtype(card.id, subtype))
    })
    
    // add rulings
    let rulingPromises = []
    card.rulings.forEach(ruling => {
        rulingPromises.push(addCardRuling(card.id, ruling))
    })
    
    // add legalities
    let legalitiesPromises = []
    
    // wait for all promises to return
    Promise.all(colorPromises)
    Promise.all(superTypePromises)
    Promise.all(typePromises)
    Promise.all(subtypePromises)
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

const addCardSupertype = async (cardId, supertype) => {
    let supertypePromise = Supertype.upsert({
        supertype: supertype
    })
    let returnedSupertype = await supertypePromise

    return CardSupertype.create({
        cardId: cardId,
        supertypeId: returnedSupertype.dataValues.id
    })
}

const addCardType = async (cardId, type) => {
    let typePromise = Type.upsert({
        type: type
    })
    let returnedType = await typePromise

    return CardType.create({
        cardId: cardId,
        typeId: returnedType.dataValues.id
    })
}

const addCardSubtype = async (cardId, subtype) => {
    let subtypePromise = Subtype.upsert({
        subtype: subtype
    })
    let returnedSubtype = await subtypePromise

    return CardSubtype.create({
        cardId: cardId,
        subtypeId: returnedSubtype.dataValues.id
    })
}

const addCardRuling = async (cardId, ruling) => {
    return Ruling.create({
        cardId: cardId,
        date: ruling.date,
        text: ruling.text
    })
}


module.exports = {
    searchForCard
}