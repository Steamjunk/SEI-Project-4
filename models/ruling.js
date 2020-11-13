'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ruling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ruling.belongsTo(models.card, {foreignKey: 'card_id'});
    }
  };
  ruling.init({
    card_id: DataTypes.STRING,
    date: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ruling',
  });
  return ruling;
};