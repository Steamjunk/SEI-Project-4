'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subtype extends Model {
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
  subtype.init({
    subtype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subtype',
  });
  return subtype;
};