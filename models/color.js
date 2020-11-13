'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      color.belongsToMany(models.card, {
        through: "card_color",
        foreignKey: "color_id",
        otherKey: "card_id"
      })
    }
  };
  color.init({
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'color',
  });
  return color;
};