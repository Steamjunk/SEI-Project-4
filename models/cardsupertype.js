'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card_supertype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  card_supertype.init({
    card_id: DataTypes.STRING,
    supertype_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'card_supertype',
  });
  return card_supertype;
};