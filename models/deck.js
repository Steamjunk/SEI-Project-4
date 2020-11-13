'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deck.belongsTo(models.User, {foreignKey: 'userId'});
    }
  };
  Deck.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    commanderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Deck',
  });
  return Deck;
};