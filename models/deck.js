'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      deck.belongsTo(models.user, {foreignKey: 'user_id'}),
      deck.belongsToMany(models.card, {
        through: "deck_card",
        foreignKey: "deck_id",
        otherKey: "card_id"
      })
    }
  };
  deck.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    commander_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deck',
  });
  return deck;
};