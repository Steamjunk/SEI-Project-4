'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CardColor.init({
    card_id: DataTypes.STRING,
    color_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CardColor',
  });
  return CardColor;
};