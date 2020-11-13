'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class supertype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      supertype.belongsToMany(models.card, {
        through: "card_supertype",
        foreignKey: "supertype_id",
        otherKey: "card_id"
      })
    }
  };
  supertype.init({
    supertype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'supertype',
  });
  return supertype;
};