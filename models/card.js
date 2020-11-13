'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      card.belongsToMany(models.color, {
        through: "card_color",
        foreignKey: "card_id",
        otherKey: "color_id"
      }),
      card.belongsToMany(models.supertype, {
        through: "card_supertype",
        foreignKey: "card_id",
        otherKey: "supertypeId"
      }),
      card.belongsToMany(models.type, {
        through: "card_type",
        foreignKey: "card_id",
        otherKey: "type_id"
      }),
      card.belongsToMany(models.subtype, {
        through: "card_subtype",
        foreignKey: "card_id",
        otherKey: "subtype_id"
      })
    }
  };
  card.init({
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
    modelName: 'card',
  });
  return card;
};