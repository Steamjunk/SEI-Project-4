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
    const nameWhereStatement = buildNameWhereStatement(req.params)

    console.log(req.params)
    Card.findAll({
        order: [
            ['name', 'ASC']
        ],
        where: nameWhereStatement,
        include: [
            {
                model: Color,
                required: colorRequired(req.params),
                where: buildColorWhereStatement(req.params),
                attributes: ['color']
            },
            {
                model: Supertype,
                required: typeRequired(req.params.supertype),
                where: buildSupertypeWhereStatement(req.params.supertype),
                attributes: ['supertype']
            },
            {
                model: Type,
                required: typeRequired(req.params.type),
                where: buildTypeWhereStatement(req.params.type),
                attributes: ['type']
            },
            {
                model: Subtype,
                required: typeRequired(req.params.subtype),
                where: buildSubtypeWhereStatement(req.params.subtype),
                attributes: ['subtype']
            }
        ],
        limit: 100
    })
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })


    // search API with name to build DB
    try {
        let searchPromise = mtg.card.where(sdkWhereStatement(req.params));

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
                console.log(results)
                // res.send(results);
            })
            .catch(err => {
                if (err.name !== 'SequelizeUniqueConstraintError') {
                    console.error(err)
                }
            })
    } catch (err) {
        if (err.name !== 'SequelizeUniqueConstraintError') {
            console.error(err)
        }
    }
}

const getCardData = async (req, res) => {
    console.log(req.params)
    Card.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Color,
                required: false,
                attributes: ['color']
            },
            {
                model: Supertype,
                required: false,
                attributes: ['supertype']
            },
            {
                model: Type,
                required: false,
                attributes: ['type']
            },
            {
                model: Subtype,
                required: false,
                attributes: ['subtype']
            }
        ]
    })
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}

// get supertype
const getSupertypes = async (req, res) => {
    Supertype.findAll({
        order: [
            ['supertype', 'ASC']
        ]
    })
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}

// get type
const getTypes = async (req, res) => {
    Type.findAll({
        order: [
            ['type', 'ASC']
        ]
    })
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}

// get subtype
const getSubtypes = async (req, res) => {
    Subtype.findAll({
        order: [
            ['subtype', 'ASC']
        ]
    })
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}
// get setName
// const getSupertypes = async (req, res) => {
//     Supertype.findAll()
//         .then(results => {
//             res.send(results)
//         })
//         .catch(err => {
//             console.error(err)
//         })
// }




// Card add helpers
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
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
    Promise.all(superTypePromises)
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
    Promise.all(typePromises)
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
    Promise.all(subtypePromises)
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
    Promise.all(rulingPromises)
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })


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
        if (err.name !== 'SequelizeUniqueConstraintError') {
            console.error(err)
        }
    }
}

const addCardSupertype = async (card_id, supertype) => {
    try {
        let supertypePromise = Supertype.upsert({
            supertype: supertype
        })
        await supertypePromise
    } catch (err) {
        if (err.name !== 'SequelizeUniqueConstraintError') {
            console.error(err)
        }
    }

    Supertype.findOne({
        where: {
            supertype: supertype
        },
        attributes: ['id', 'supertype']
    })
        .then(supertype => {
            return CardSupertype.create({
                card_id: card_id,
                supertype_id: supertype.id
            })
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}

const addCardType = async (card_id, type) => {
    try {
        let typePromise = Type.upsert({
            type: type
        })
        await typePromise
    } catch (err) {
        if (err.name !== 'SequelizeUniqueConstraintError') {
            console.error(err)
        }
    }

    Type.findOne({
        where: {
            type: type
        },
        attributes: ['id', 'type']
    })
        .then(type => {
            return CardType.create({
                card_id: card_id,
                type_id: type.id
            })
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}

const addCardSubtype = async (card_id, subtype) => {
    try {
        let subtypePromise = Subtype.upsert({
            subtype: subtype
        })
        await subtypePromise
    } catch (err) {
        if (err.name !== 'SequelizeUniqueConstraintError') {
            console.error(err)
        }
    }

    Subtype.findOne({
        where: {
            subtype: subtype
        },
        attributes: ['id', 'subtype']
    })
        .then(subtype => {
            return CardSubtype.create({
                card_id: card_id,
                subtype_id: subtype.id
            })
        })
        .catch(err => {
            if (err.name !== 'SequelizeUniqueConstraintError') {
                console.error(err)
            }
        })
}

const addCardRuling = async (card_id, ruling) => {
    return Ruling.create({
        card_id: card_id,
        date: ruling.date,
        text: ruling.text
    })
}

// Search helpers
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

    let colorWhereStatement = {};
    if (colorWhereList.length > 0) {
        colorWhereStatement = {
            [Op.and]: colorWhereList
        }
    }

    return colorWhereStatement
}

const buildNameWhereStatement = (params) => {
    let nameWhereStatement = {}
    if (params.name !== 'null') {
        nameWhereStatement = {
            name: {
                [Op.iLike]: `%${params.name}%`
            },
            image_url: {
                [Op.not]: null
            }
        }
    } else {
        nameWhereStatement = {
            name: {
                [Op.not]: ''
            },
            image_url: {
                [Op.not]: null
            }
        }
    }
    if (params.set !== 'null') {
        nameWhereStatement.set_name = params.set
    }

    console.log(nameWhereStatement)

    return nameWhereStatement;
}

const buildSupertypeWhereStatement = (supertype) => {
    let supertypeWhereStatement = {}
    if (supertype === 'Any') {
        supertypeWhereStatement = {
            supertype: {
                [Op.not]: null
            }
        }
    } else {
        supertypeWhereStatement = {
            supertype: {
                [Op.iLike]: `${supertype}`
            }
        }
    }
    return supertypeWhereStatement
}

const buildTypeWhereStatement = (type) => {
    let typeWhereStatement = {}
    if (type === 'Any') {
        typeWhereStatement = {
            type: {
                [Op.not]: null
            }
        }
    } else {
        typeWhereStatement = {
            type: {
                [Op.iLike]: `${type}`
            }
        }
    }
    return typeWhereStatement
}

const buildSubtypeWhereStatement = (subtype) => {
    let subtypeWhereStatement = {}
    if (subtype === 'Any') {
        subtypeWhereStatement = {
            subtype: {
                [Op.not]: null
            }
        }
    } else {
        subtypeWhereStatement = {
            subtype: {
                [Op.iLike]: `${subtype}`
            }
        }
    }
    return subtypeWhereStatement
}

const typeRequired = (type) => {
    if (type === 'Any') {
        return false;
    } else {
        return true;
    }
}

const colorRequired = (params) => {
    if (
        params.white !== 'False' ||
        params.blue !== 'False' ||
        params.black !== 'False' ||
        params.red !== 'False' ||
        params.green !== 'False'
    ) {
        return true
    } else {
        return false
    }
}

const sdkWhereStatement = (params) => {
    whereStatement = {}
    if (params.name !== 'null') {
        whereStatement.name = params.name
    }
    if (params.supertype !== 'Any') {
        whereStatement.supertypes = params.supertype
    }
    if (params.type !== 'Any') {
        whereStatement.types = params.type
    }
    if (params.subtype !== 'Any') {
        whereStatement.subtypes = params.subtype
    }


    console.log(whereStatement)
    return whereStatement
}

module.exports = {
    searchForCard,
    getCardData,
    getSupertypes,
    getTypes,
    getSubtypes
}