'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      type.belongsToMany(models.card, {
        through: "card_type",
        foreignKey: "type_id",
        otherKey: "card_id"
      })
    }
  };
  type.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'type',
  });
  return type;
};