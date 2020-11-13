'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsToMany(models.Color, {
        through: "card_color",
        foreignKey: "card_id",
        otherKey: "color_id"
      }),
      Card.belongsToMany(models.Supertype, {
        through: "card_supertype",
        foreignKey: "card_id",
        otherKey: "supertypeId"
      }),
      Card.belongsToMany(models.Type, {
        through: "card_type",
        foreignKey: "card_id",
        otherKey: "type_id"
      }),
      Card.belongsToMany(models.Subtype, {
        through: "card_subtype",
        foreignKey: "card_id",
        otherKey: "subtype_id"
      })
    }
  };
  Card.init({
    multiverse_id: DataTypes.STRING,
    name: DataTypes.STRING,
    mana_cost: DataTypes.STRING,
    cmc: DataTypes.INTEGER,
    rarity: DataTypes.STRING,
    set_name: DataTypes.STRING,
    text: DataTypes.TEXT,
    flavor: DataTypes.TEXT,
    artist: DataTypes.STRING,
    power: DataTypes.STRING,
    toughness: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    foil: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};