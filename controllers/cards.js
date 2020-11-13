const mtg = require('mtgsdk')
const { Op } = require("sequelize");


const card = require('../models').card
const color = require('../models').color
const ruling = require('../models').ruling
const supertype = require('../models').supertype
const type = require('../models').type
const subtype = require('../models').subtype

const card_color = require('../models').card_color
const card_supertype = require('../models').card_supertype
const card_type = require('../models').card_type
const card_subtype = require('../models').card_subtype


const searchForCard = async (req, res) => {
    const colorWhereStatement = buildColorWhereStatement(req.params);
    const nameWhereStatement = buildNameWhereStatement(req.params.name);

    console.log(req.params)
    
    // search in db with criteria
    // get all from cards using search criteria
    card.findAll({
        order: [
            ['name', 'ASC']
        ],
        where: nameWhereStatement,
        include: [
            {
                model: color,
                where: colorWhereStatement,
                attributes: ['color']
            },
            {
                model: supertype,
                attributes: ['supertype']
            },
            {
                model: type,
                attributes: ['type']
            },
            {
                model: subtype,
                attributes: ['subtype']
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
    try {
        let searchPromise = mtg.card.where({ supertypes: 'legendary', subtypes: 'goblin' });

        let cards = await searchPromise;

        // add cards to db
        console.log(cards.length);

        let cardPromises = [];
        cards.forEach(card => {
            console.log('****************');
            console.log(card);
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
        .catch(err => console.error('err'))

        // display from db
        // send complete set of cards

    } catch (err) {
        console.error('err')
    }
}

const getCardData = async (req, res) => {
    card.findByPk(req.params.id)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.error('err')
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
        superTypePromises.push(addcard_supertype(card.id, supertype))
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
    card.rulings.forEach(rulingObject => {
        rulingPromises.push(addCardRuling(card.id, rulingObject))
    })

    // add legalities
    // let legalitiesPromises = []

    // wait for all promises to return
    Promise.all(colorPromises)
        .catch(err => console.error('err'))
    Promise.all(superTypePromises)
        .catch(err => console.error('err'))
    Promise.all(typePromises)
        .catch(err => console.error('err'))
    Promise.all(subtypePromises)
        .catch(err => console.error('err'))
    Promise.all(rulingPromises)
        .catch(err => console.error('err'))


    return card.upsert(card)
}

const addCardColor = async (card_id, color) => {
    try {
        let colorPromise = color.findOne({
            where: {
                color: color
            }
        })
        let foundColor = await colorPromise

        return card_color.create({
            card_id: card_id,
            color_id: foundColor.dataValues.id
        })
    } catch (err) {
        console.error(err)
    }
}

const addcard_supertype = async (card_id, supertype) => {
    try {
        let supertypePromise = supertype.upsert({
            supertype: supertype
        })
        await supertypePromise
    } catch (err) {
        console.error('err')
    }

    supertype.findOne({
        where: {
            supertype: supertype
        },
        attributes: ['supertype']
    })
        .then(supertype => {
            console.log(supertype)
            return card_supertype.create({
                card_id: card_id,
                supertypeId: supertype.dataValues.id
            })
        })
        .catch(err => console.error('err'))
}

const addCardType = async (card_id, type) => {
    try {
        let typePromise = type.upsert({
            type: type
        })
        await typePromise
    } catch (err) {
        console.error('err')
    }

    type.findOne({
        where: {
            type: type
        },
        attributes: ['type']
    })
        .then(type => {
            return card_type.create({
                card_id: card_id,
                typeId: type.dataValues.id
            })
        })
        .catch(err => console.error('err'))
}

const addCardSubtype = async (card_id, subtype) => {
    try {
        let subtypePromise = subtype.upsert({
            subtype: subtype
        })
        await subtypePromise
    } catch (err) {
        console.error(err)
    }

    subtype.findOne({
        where: {
            subtype: subtype
        },
        attributes: ['subtype']
    })
        .then(subtype => {
            return card_subtype.create({
                card_id: card_id,
                subtype_id: subtype.dataValues.id
            })
        })
        .catch(err => console.error(err))
}

const addCardRuling = async (card_id, rulingObject) => {
    return ruling.upsert({
        card_id: card_id,
        date: rulingObject.date,
        text: rulingObject.text
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
    if(colorWhereList.length > 0) {
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