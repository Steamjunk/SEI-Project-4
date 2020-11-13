'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supertype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supertype.belongsToMany(models.Card, {
        through: "card_supertype",
        foreignKey: "supertype_id",
        otherKey: "card_id"
      })
    }
  };
  Supertype.init({
    supertype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Supertype',
  });
  return Supertype;
};