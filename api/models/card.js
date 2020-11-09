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
        through: "CardColor",
        foreignKey: "cardId",
        otherKey: "colorId"
      })
    }
  };
  Card.init({
    multiverseId: DataTypes.STRING,
    name: DataTypes.STRING,
    manaCost: DataTypes.STRING,
    cmc: DataTypes.INTEGER,
    rarity: DataTypes.STRING,
    setName: DataTypes.STRING,
    text: DataTypes.TEXT,
    flavor: DataTypes.TEXT,
    artist: DataTypes.STRING,
    power: DataTypes.STRING,
    toughness: DataTypes.STRING,
    imageUrl: DataTypes.TEXT,
    foil: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};