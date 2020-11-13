'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  card_type.init({
    card_id: DataTypes.STRING,
    type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'card_type',
  });
  return card_type;
};