const mtg = require('mtgsdk')
const { Op } = require("sequelize");


const Card = require('../models').Card
const Color = require('../models').Color
const Ruling = require('../models').Ruling
const Supertype = require('../models').Supertype
const Type = require('../models').Type
const Subtype = require('../models').Subtype

const CardColor = require('../models').CardColor
const CardSupertype = require('../models').CardSupertype
const CardType = require('../models').CardType
const CardSubtype = require('../models').CardSubtype


const searchForCard = async (req, res) => {

    let cardWhereStatement = {};
    if(req.params.name !== 'null') {
        cardWhereStatement.name = {
            [Op.iLike]: `%${req.params.name}%`
        }

        cardWhereStatement.name = req.params.name
    }
    // switch statement, each color
    colorWhereStatement = []
    if(req.params.white !== 'False') {
        colorWhereStatement.push({ color: 'White' })
    }
    if(req.params.black !== 'False') {
        colorWhereStatement.push({ color: 'Black' })
    }
    if(req.params.blue !== 'False') {
        colorWhereStatement.push({ color: 'Blue' })
    }
    if(req.params.green !== 'False') {
        colorWhereStatement.push({ color: 'Green' })
    }
    if(req.params.red !== 'False') {
        colorWhereStatement.push({ color: 'Red' })
    }

    console.log(colorWhereStatement)

    console.log(req.params)
    // search in db with criteria
    // get all from cards using search criteria
    Card.findAll({
        order: [
            ['name', 'ASC']
        ],
        where: {
            name: {
                [Op.iLike]: `%${req.params.name}%` // doesnt search with name, make colors conditional?
            }  
        },
        include: [
            {
                model: Color,
                where: {
                    [Op.or]: colorWhereStatement
                }
            },
            {
                model: Supertype
            },
            {
                model: Type
            },
            {
                model: Subtype,
                // where: {
                //     subtype: 'Warrior'
                // }
            }
            // will fail if no card rulings
        ]

    })
        .then(results => {
            console.log(results.length)
            res.send(results)
        })
        .catch(err => {
            console.error(err)
        })

    // if found
    // display



    // // else search api
    // try {
    //     let searchPromise = mtg.card.where({ supertypes: 'legendary', subtypes: 'goblin' });

    //     let cards = await searchPromise;

    //     // add cards to db
    //     console.log(cards.length);

    //     let cardPromises = [];
    //     cards.forEach(card => {
    //         cardPromises.push(addCardToDatabase(card));
    //     })

    //     Promise.all(cardPromises)
    //     .then(results => {
    //         console.log('---cards added---')
    //         res.send(results);
    //     })
    //     .catch(err => console.error(err))

    //     // display from db
    //     // send complete set of cards

    // } catch (err) {
    //     console.error(err.name)
    // }
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
    // let legalitiesPromises = []

    // wait for all promises to return
    Promise.all(colorPromises)
        .catch(err => console.error(err.name))
    Promise.all(superTypePromises)
        .catch(err => console.error(err.name))
    Promise.all(typePromises)
        .catch(err => console.error(err.name))
    Promise.all(subtypePromises)
        .catch(err => console.error(err.name))
    Promise.all(rulingPromises)
        .catch(err => console.error(err))


    return Card.upsert(card)
}

const addCardColor = async (cardId, color) => {
    try {
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
    } catch (err) {
        console.error(err.name)
    }
}

const addCardSupertype = async (cardId, supertype) => {
    try {
        let supertypePromise = Supertype.upsert({
            supertype: supertype
        })
        await supertypePromise
    } catch (err) {
        console.error(err.name)
    }

    Supertype.findOne({
        where: {
            supertype: supertype
        }
    })
        .then(supertype => {
            return CardSupertype.create({
                cardId: cardId,
                supertypeId: supertype.dataValues.id
            })
        })
        .catch(err => console.error(err.name))
}

const addCardType = async (cardId, type) => {
    try {
        let typePromise = Type.upsert({
            type: type
        })
        await typePromise
    } catch (err) {
        console.error(err.name)
    }

    Type.findOne({
        where: {
            type: type
        }
    })
        .then(type => {
            return CardType.create({
                cardId: cardId,
                typeId: type.dataValues.id
            })
        })
        .catch(err => console.error(err.name))
}

const addCardSubtype = async (cardId, subtype) => {
    try {
        let subtypePromise = Subtype.upsert({
            subtype: subtype
        })
        await subtypePromise
    } catch (err) {
        console.error(err.name)
    }

    Subtype.findOne({
        where: {
            subtype: subtype
        }
    })
        .then(subtype => {
            return CardSubtype.create({
                cardId: cardId,
                subtypeId: subtype.dataValues.id
            })
        })
        .catch(err => console.error(err.name))
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