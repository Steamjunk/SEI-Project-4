'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subtype.belongsToMany(models.Card, {
        through: "CardSubtype",
        foreignKey: "subtypeId",
        otherKey: "cardId"
      })
    }
  };
  Subtype.init({
    subtype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subtype',
  });
  return Subtype;
};