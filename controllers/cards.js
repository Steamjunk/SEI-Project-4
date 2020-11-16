const mtg = require('mtgsdk')
const { Op } = require("sequelize");


const Card = require('../models').card
const Color = require('../models').color
const Ruling = require('../models').ruling
const Supertype = require('../models').supertype
const Type = require('../models').type
const Subtype = require('../models').subtype

const CardColor = require('../models').card_color
const CardSupertype = require('../models').card_supertype
const CardType = require('../models').card_type
const CardSubtype = require('../models').card_subtype


const searchForCard = async (req, res) => {
    const colorWhereStatement = buildColorWhereStatement(req.params);
    const nameWhereStatement = buildNameWhereStatement(req.params.name);

    console.log(req.params)

    Card.findAll({
        order: [
            ['name', 'ASC']
        ],
        where: nameWhereStatement,
        include: [
            {
                model: Color,
                where: colorWhereStatement,
                attributes: ['color']
            },
            {
                model: Supertype,
                attributes: ['supertype']
            },
            {
                model: Type,
                attributes: ['type']
            },
            {
                model: Subtype,
                attributes: ['subtype']
            }
            // will fail if no card rulings
        ],
        limit: 50
    })
    .then(results => {
        res.send(results)
    })
    .catch(err => {
        console.error(err.name)
    })

    // if found
    // display



    // // else search api
    try {
        let searchPromise = mtg.card.where({ name: req.params.name });

        let cards = await searchPromise;

        // add cards to db
        console.log(cards.length);

        let cardPromises = [];
        cards.forEach(card => {
            card.mana_cost = card.manaCost;
            card.multiverse_id = card.multiverseId;
            card.set_name = card.setName;
            card.image_url = card.imageUrl;
            cardPromises.push(addCardToDatabase(card));
        })

        Promise.all(cardPromises)
            .then(results => {
                console.log('---cards added---')
                res.send(results);
            })
            .catch(err => console.error(err.name))

        // display from db
        // send complete set of cards

    } catch (err) {
        console.error(err.name)
    }
}

const getCardData = async (req, res) => {
    Card.findByPk(req.params.id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.error(err.name)
        })
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
        .catch(err => console.error(err.name))


    return Card.upsert(card)
}

const addCardColor = async (card_id, color) => {
    try {
        let colorPromise = Color.findOne({
            where: {
                color: color
            }
        })
        let foundColor = await colorPromise

        return CardColor.create({
            card_id: card_id,
            color_id: foundColor.dataValues.id
        })
    } catch (err) {
        console.error(err.name)
    }
}

const addCardSupertype = async (card_id, supertype) => {
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
        },
        attributes: ['supertype']
    })
        .then(supertype => {
            return CardSupertype.create({
                card_id: card_id,
                supertype_id: supertype.dataValues.id
            })
        })
        .catch(err => console.error(err.name))
}

const addCardType = async (card_id, type) => {
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
        },
        attributes: ['type']
    })
        .then(type => {
            return CardType.create({
                card_id: card_id,
                typeId: type.dataValues.id
            })
        })
        .catch(err => console.error(err.name))
}

const addCardSubtype = async (card_id, subtype) => {
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
        },
        attributes: ['subtype']
    })
        .then(subtype => {
            return CardSubtype.create({
                card_id: card_id,
                subtype_id: subtype.dataValues.id
            })
        })
        .catch(err => console.error(err.name))
}

const addCardRuling = async (card_id, ruling) => {
    return Ruling.create({
        card_id: card_id,
        date: ruling.date,
        text: ruling.text
    })
}

const buildColorWhereStatement = (params) => {
    colorWhereList = []
    if (params.white !== 'False') {
        colorWhereList.push({ color: 'White' })
    }
    if (params.black !== 'False') {
        colorWhereList.push({ color: 'Black' })
    }
    if (params.blue !== 'False') {
        colorWhereList.push({ color: 'Blue' })
    }
    if (params.green !== 'False') {
        colorWhereList.push({ color: 'Green' })
    }
    if (params.red !== 'False') {
        colorWhereList.push({ color: 'Red' })
    }

    console.log(colorWhereList)
    let colorWhereStatement = {};
    if (colorWhereList.length > 0) {
        colorWhereStatement = {
            [Op.or]: colorWhereList
        }
    }

    return colorWhereStatement
}

const buildNameWhereStatement = (name) => {
    let nameWhereStatement = {}
    if (name !== 'null') {
        nameWhereStatement = {
            name: {
                [Op.iLike]: `%${name}%` // doesnt search with name, make colors conditional?
            }
        }
    } else {
        nameWhereStatement = {
            name: {
                [Op.not]: null
            }
        }
    }

    console.log(nameWhereStatement);
    return nameWhereStatement;
}

module.exports = {
    searchForCard,
    getCardData
}