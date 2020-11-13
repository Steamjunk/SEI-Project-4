'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardSubtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CardSubtype.init({
    cardId: DataTypes.STRING,
    subtypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CardSubtype',
  });
  return CardSubtype;
};