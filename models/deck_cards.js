'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deck_cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  deck_cards.init({
    deck_id: DataTypes.INTEGER,
    card_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deck_cards',
  });
  return deck_cards;
};