'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ruling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ruling.belongsTo(models.Card, {foreignKey: 'card_id'});
    }
  };
  Ruling.init({
    card_id: DataTypes.STRING,
    date: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Ruling',
  });
  return Ruling;
};